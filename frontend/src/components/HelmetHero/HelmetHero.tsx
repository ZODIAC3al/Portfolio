"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLB_BASE64, PORTRAIT_BASE64 } from './assets/helmetData';
import { SIGNATURE_BASE64 } from './assets/signatureData';
import { PERSONAL, STATS } from '../../data/portfolio';
import './HelmetHero.css';

export interface CalibrationValues {
  centerXFrac: number;
  centerYFrac: number;
  heightFrac: number;
  vFovDeg: number;
  yawOffsetDeg: number;
  splitYFrac: number;
}

export interface HelmetHeroProps {
  portraitImageSrc?: string;
  onMenuClick?: () => void;
  title?: string;
  subtitle?: string;
}

const DEFAULT_CAL: CalibrationValues = {
  centerXFrac: 0.468,
  centerYFrac: 0.434,
  heightFrac: 0.324,
  vFovDeg: 34.5,
  yawOffsetDeg: 180,
  splitYFrac: 0.45
};

const CAL_KEY = 'ali-helmet-calibration-v10';

function loadCal(): CalibrationValues {
  if (typeof window === 'undefined') return { ...DEFAULT_CAL };
  try {
    const saved = localStorage.getItem(CAL_KEY);
    if (saved) return { ...DEFAULT_CAL, ...JSON.parse(saved) };
  } catch (e) {}
  return { ...DEFAULT_CAL };
}

function saveCal(cal: CalibrationValues) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CAL_KEY, JSON.stringify(cal));
  } catch (e) {}
}

const HELMET_HEIGHT = 0.568282;
const MODEL_CENTER_X = 0.002225;
const MODEL_CENTER_Z = -0.049966;
const OPEN_TOP_LIFT = 0.085;
const OPEN_TOP_BACK = 0.16;
const OPEN_TOP_TILT = 0.62;
const OPEN_BOTTOM_DROP = 0.075;
const OPEN_BOTTOM_FWD = 0.05;
const OPEN_BOTTOM_TILT = 0.9;
const MAX_TRACK_YAW = THREE.MathUtils.degToRad(10);
const MAX_TRACK_PITCH = THREE.MathUtils.degToRad(6);

const COMPONENT_TYPES: Record<number, { size: number; getter: string }> = {
  5120: { size: 1, getter: 'getInt8' },
  5121: { size: 1, getter: 'getUint8' },
  5122: { size: 2, getter: 'getInt16' },
  5123: { size: 2, getter: 'getUint16' },
  5125: { size: 4, getter: 'getUint32' },
  5126: { size: 4, getter: 'getFloat32' }
};

const TYPE_NUM_COMPONENTS: Record<string, number> = {
  SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16
};

function readChunkTypeStr(dv: DataView, offset: number) {
  return String.fromCharCode(
    dv.getUint8(offset),
    dv.getUint8(offset + 1),
    dv.getUint8(offset + 2),
    dv.getUint8(offset + 3)
  );
}

function parseGLB(buffer: ArrayBuffer) {
  const dv = new DataView(buffer);
  if (readChunkTypeStr(dv, 0) !== 'glTF') throw new Error('Not a GLB file');
  const length = dv.getUint32(8, true);
  let offset = 12;
  let json: any = null;
  let bin: ArrayBuffer | null = null;
  while (offset < length) {
    const chunkLength = dv.getUint32(offset, true);
    const chunkType = readChunkTypeStr(dv, offset + 4);
    const chunkStart = offset + 8;
    if (chunkType === 'JSON') {
      const jsonBytes = new Uint8Array(buffer, chunkStart, chunkLength);
      json = JSON.parse(new TextDecoder('utf-8').decode(jsonBytes));
    } else if (chunkType.indexOf('BIN') === 0) {
      bin = buffer.slice(chunkStart, chunkStart + chunkLength);
    }
    offset = chunkStart + chunkLength;
  }
  return { json, bin };
}

function readAccessorFloat(json: any, bin: ArrayBuffer, accessorIndex: number) {
  const acc = json.accessors[accessorIndex];
  const numComp = TYPE_NUM_COMPONENTS[acc.type];
  const compInfo = COMPONENT_TYPES[acc.componentType];
  const count = acc.count;
  const out = new Float32Array(count * numComp);
  const bv = json.bufferViews[acc.bufferView];
  const baseOffset = (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const stride = bv.byteStride || (numComp * compInfo.size);
  const dv = new DataView(bin);
  for (let i = 0; i < count; i++) {
    const elOffset = baseOffset + i * stride;
    for (let c = 0; c < numComp; c++) {
      out[i * numComp + c] = (dv as any)[compInfo.getter](elOffset + c * compInfo.size, true);
    }
  }
  return out;
}

function readAccessorIndices(json: any, bin: ArrayBuffer, accessorIndex: number) {
  const acc = json.accessors[accessorIndex];
  const compInfo = COMPONENT_TYPES[acc.componentType];
  const count = acc.count;
  const out = new Uint32Array(count);
  const bv = json.bufferViews[acc.bufferView];
  const baseOffset = (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const stride = bv.byteStride || compInfo.size;
  const dv = new DataView(bin);
  for (let i = 0; i < count; i++) {
    out[i] = (dv as any)[compInfo.getter](baseOffset + i * stride, true);
  }
  return out;
}

function mat4Identity() { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }

function mat4FromTRS(t?: number[], r?: number[], s?: number[]) {
  const rr = r || [0, 0, 0, 1], ss = s || [1, 1, 1], tt = t || [0, 0, 0];
  const x = rr[0], y = rr[1], z = rr[2], w = rr[3];
  const sx = ss[0], sy = ss[1], sz = ss[2];
  const x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
  return [
    (1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,
    (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0,
    (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0,
    tt[0], tt[1], tt[2], 1
  ];
}

function mat4Multiply(a: number[], b: number[]) {
  const out = new Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) sum += a[k * 4 + r] * b[c * 4 + k];
      out[c * 4 + r] = sum;
    }
  }
  return out;
}

function mat4TransformPoint(m: number[], p: number[]) {
  const x = p[0], y = p[1], z = p[2];
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12],
    m[1] * x + m[5] * y + m[9] * z + m[13],
    m[2] * x + m[6] * y + m[10] * z + m[14]
  ];
}

function nodeLocalMatrix(node: any) {
  if (node.matrix) return node.matrix;
  return mat4FromTRS(node.translation, node.rotation, node.scale);
}

function decodeImageFromBufferView(json: any, bin: ArrayBuffer, imageIndex: number) {
  const img = json.images[imageIndex];
  const bv = json.bufferViews[img.bufferView];
  const bytes = new Uint8Array(bin, bv.byteOffset || 0, bv.byteLength);
  const blob = new Blob([bytes], { type: img.mimeType || 'image/png' });
  return createImageBitmap(blob);
}

function buildMaterial(matDef: any, texture?: THREE.CanvasTexture) {
  const pbr = matDef.pbrMetallicRoughness || {};
  const baseColor = pbr.baseColorFactor || [1, 1, 1, 1];
  const isGlass = /glass/i.test(matDef.name || '');
  const opts: any = {
    color: new THREE.Color(baseColor[0], baseColor[1], baseColor[2]),
    metalness: pbr.metallicFactor !== undefined ? pbr.metallicFactor : 1,
    roughness: pbr.roughnessFactor !== undefined ? pbr.roughnessFactor : 1,
    side: matDef.doubleSided ? THREE.DoubleSide : THREE.FrontSide
  };
  if (texture) { opts.map = texture; opts.color = new THREE.Color(1, 1, 1); }

  if (isGlass) {
    return new THREE.MeshPhysicalMaterial(Object.assign(opts, {
      color: new THREE.Color(0.10, 0.16, 0.13),
      metalness: 0.55,
      roughness: 0.12,
      transparent: true,
      opacity: 0.62,
      transmission: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.05
    }));
  }
  return new THREE.MeshStandardMaterial(opts);
}

function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes.buffer;
}

export const HelmetHero: React.FC<HelmetHeroProps> = ({
  portraitImageSrc = "/portrait.png",
  title = PERSONAL?.name || "Ali Maher"
}) => {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const loadingOverlayRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  const [cal, setCal] = useState<CalibrationValues>(DEFAULT_CAL);
  const [calHidden, setCalHidden] = useState<boolean>(true);
  const [copyBtnText, setCopyBtnText] = useState<string>('Copy values');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [captionSeen, setCaptionSeen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const calRef = useRef<CalibrationValues>(cal);
  calRef.current = cal;

  const threeStateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    helmetRoot: THREE.Group;
    helmetPivot: THREE.Group;
    modelGroup: THREE.Group;
    topGroup?: THREE.Group;
    topInner?: THREE.Group;
    topOrient?: THREE.Group;
    bottomGroup?: THREE.Group;
    bottomInner?: THREE.Group;
    bottomOrient?: THREE.Group;
    parsedGLB: any;
    animFrameId: number;
    clock: THREE.Clock;
    elapsed: number;
    pointerX: number;
    pointerY: number;
    smoothX: number;
    smoothY: number;
    pointerActive: boolean;
    lastMoveAt: number;
    hoverTarget: number;
    hoverLerp: number;
    isActiveState: boolean;
    autoPlayed: boolean;
    reduceMotion: boolean;
  } | null>(null);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (href === '#contact') {
        setTimeout(() => {
          document.getElementById('contact-name-input')?.focus({ preventScroll: true });
        }, 800);
      }
    }
  };

  useEffect(() => {
    setCal(loadCal());
  }, []);

  useEffect(() => {
    if (portraitImgRef.current) {
      portraitImgRef.current.src = portraitImageSrc || `/portrait.png`;
    }
  }, [portraitImageSrc]);

  useEffect(() => {
    if (!canvasHostRef.current) return;
    const container = canvasHostRef.current;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(calRef.current.vFovDeg, 1, 0.01, 10);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      if ('outputColorSpace' in renderer) { (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace || 'sRGB'; } else if ('encoding' in renderer) { (renderer as any).encoding = 3001; }
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL context initialization skipped:', err);
      setLoading(false);
      return;
    }

    scene.add(new THREE.HemisphereLight(0xF6F2E9, 0x3a3a30, 0.65));
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const key = new THREE.DirectionalLight(0xfff6e6, 1.15);
    key.position.set(-0.6, 1.1, 1.3);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xdfe8ff, 0.4);
    fill.position.set(1.1, 0.2, 0.6);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 0.55);
    rim.position.set(0.2, 0.9, -1.4);
    scene.add(rim);

    const helmetRoot = new THREE.Group();
    const helmetPivot = new THREE.Group();
    const modelGroup = new THREE.Group();

    helmetPivot.add(modelGroup);
    helmetRoot.add(helmetPivot);
    scene.add(helmetRoot);

    const state = {
      scene,
      camera,
      renderer,
      helmetRoot,
      helmetPivot,
      modelGroup,
      topGroup: undefined as THREE.Group | undefined,
      topInner: undefined as THREE.Group | undefined,
      topOrient: undefined as THREE.Group | undefined,
      bottomGroup: undefined as THREE.Group | undefined,
      bottomInner: undefined as THREE.Group | undefined,
      bottomOrient: undefined as THREE.Group | undefined,
      parsedGLB: null as any,
      animFrameId: 0,
      clock: new THREE.Clock(),
      elapsed: 0,
      pointerX: 0,
      pointerY: 0,
      smoothX: 0,
      smoothY: 0,
      pointerActive: false,
      lastMoveAt: 0,
      hoverTarget: 0,
      hoverLerp: 0,
      isActiveState: false,
      autoPlayed: false,
      reduceMotion
    };

    threeStateRef.current = state;

    function disposeGroup(group?: THREE.Group) {
      if (!group) return;
      group.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
      });
    }

    function applyFraming() {
      const currentCal = calRef.current;
      const vFov = THREE.MathUtils.degToRad(currentCal.vFovDeg);
      const visibleHeight = HELMET_HEIGHT / currentCal.heightFrac;
      const distance = visibleHeight / (2 * Math.tan(vFov / 2));
      const visibleWidth = visibleHeight;
      const offsetXFrac = currentCal.centerXFrac - 0.5;
      const offsetYFrac = 0.5 - currentCal.centerYFrac;

      camera.fov = currentCal.vFovDeg;
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      helmetRoot.position.set(offsetXFrac * visibleWidth, offsetYFrac * visibleHeight, 0);
      const yawRad = THREE.MathUtils.degToRad(currentCal.yawOffsetDeg);
      if (state.topOrient) state.topOrient.rotation.y = yawRad;
      if (state.bottomOrient) state.bottomOrient.rotation.y = yawRad;
    }

    function rebuildSplit() {
      if (!state.parsedGLB) return;
      const currentCal = calRef.current;
      const { json, bin, worldMats, materials } = state.parsedGLB;
      const CUT_Y = currentCal.splitYFrac * HELMET_HEIGHT;

      disposeGroup(state.topGroup);
      disposeGroup(state.bottomGroup);
      if (state.topGroup) modelGroup.remove(state.topGroup);
      if (state.bottomGroup) modelGroup.remove(state.bottomGroup);

      state.topGroup = new THREE.Group();
      state.topGroup.position.set(0, CUT_Y, 0);
      state.topInner = new THREE.Group();
      state.topInner.position.set(0, -CUT_Y, 0);
      state.topGroup.add(state.topInner);
      state.topOrient = new THREE.Group();
      state.topOrient.rotation.y = THREE.MathUtils.degToRad(currentCal.yawOffsetDeg);
      state.topInner.add(state.topOrient);

      state.bottomGroup = new THREE.Group();
      state.bottomGroup.position.set(0, CUT_Y, 0);
      state.bottomInner = new THREE.Group();
      state.bottomInner.position.set(0, -CUT_Y, 0);
      state.bottomGroup.add(state.bottomInner);
      state.bottomOrient = new THREE.Group();
      state.bottomOrient.rotation.y = THREE.MathUtils.degToRad(currentCal.yawOffsetDeg);
      state.bottomInner.add(state.bottomOrient);

      modelGroup.add(state.topGroup);
      modelGroup.add(state.bottomGroup);

      json.nodes.forEach((node: any, idx: number) => {
        if (node.mesh === undefined) return;
        const mesh = json.meshes[node.mesh];
        const worldMat = worldMats[idx];

        mesh.primitives.forEach((prim: any) => {
          const posAccIdx = prim.attributes.POSITION;
          if (posAccIdx === undefined) return;
          const positions = readAccessorFloat(json, bin, posAccIdx);
          const count = positions.length / 3;
          const out = new Float32Array(count * 3);
          for (let i = 0; i < count; i++) {
            const p = [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]];
            const wp = mat4TransformPoint(worldMat, p);
            out[i * 3] = wp[0] - MODEL_CENTER_X;
            out[i * 3 + 1] = wp[1];
            out[i * 3 + 2] = wp[2] - MODEL_CENTER_Z;
          }

          let uvAttr: THREE.BufferAttribute | null = null;
          const uvAccIdx = prim.attributes.TEXCOORD_0;
          if (uvAccIdx !== undefined) {
            uvAttr = new THREE.BufferAttribute(readAccessorFloat(json, bin, uvAccIdx), 2);
          }
          const posAttr = new THREE.BufferAttribute(out, 3);
          const mat = materials[prim.material !== undefined ? prim.material : 0];

          const topIdx: number[] = [];
          const bottomIdx: number[] = [];

          if (prim.indices !== undefined) {
            const srcIdx = readAccessorIndices(json, bin, prim.indices);
            for (let ti = 0; ti < srcIdx.length; ti += 3) {
              const i0 = srcIdx[ti], i1 = srcIdx[ti + 1], i2 = srcIdx[ti + 2];
              const cy = (out[i0 * 3 + 1] + out[i1 * 3 + 1] + out[i2 * 3 + 2]) / 3;
              if (cy >= CUT_Y) { topIdx.push(i0, i1, i2); } else { bottomIdx.push(i0, i1, i2); }
            }
          }

          function addPiece(idxArr: number[], targetGroup: THREE.Group) {
            if (!idxArr.length) return;
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', posAttr);
            if (uvAttr) geo.setAttribute('uv', uvAttr);
            geo.setIndex(new THREE.BufferAttribute(new Uint32Array(idxArr), 1));
            geo.computeVertexNormals();
            targetGroup.add(new THREE.Mesh(geo, mat));
          }

          addPiece(topIdx, state.topOrient!);
          addPiece(bottomIdx, state.bottomOrient!);
        });
      });
    }

    (window as any).__helmetApplyFraming = applyFraming;
    (window as any).__helmetRebuildSplit = rebuildSplit;

    function buildHelmet() {
      const buffer = base64ToArrayBuffer(GLB_BASE64);
      const parsed = parseGLB(buffer);
      const { json, bin } = parsed;

      const worldMats: Record<number, number[]> = {};
      (function computeWorld(idx: number, parentMat: number[]) {
        const node = json.nodes[idx];
        const m = mat4Multiply(parentMat, nodeLocalMatrix(node));
        worldMats[idx] = m;
        (node.children || []).forEach((c: number) => computeWorld(c, m));
      })(json.scenes[json.scene || 0].nodes[0], mat4Identity());

      const texPromises: Promise<void>[] = [];
      const textures: Record<number, THREE.CanvasTexture> = {};

      json.materials.forEach((m: any, mi: number) => {
        const bc = m.pbrMetallicRoughness && m.pbrMetallicRoughness.baseColorTexture;
        if (bc && bin) {
          const texInfo = json.textures[bc.index];
          const p = decodeImageFromBufferView(json, bin, texInfo.source).then((bitmap) => {
            const tex = new THREE.CanvasTexture(bitmap);
            if ('colorSpace' in tex) { (tex as any).colorSpace = (THREE as any).SRGBColorSpace || 'sRGB'; } else if ('encoding' in tex) { (tex as any).encoding = 3001; }
            tex.flipY = false;
            tex.needsUpdate = true;
            textures[mi] = tex;
          }).catch(() => {});
          texPromises.push(p);
        }
      });

      return Promise.all(texPromises).then(() => {
        const materials = json.materials.map((m: any, mi: number) => buildMaterial(m, textures[mi]));
        state.parsedGLB = { json, bin, worldMats, materials };
        rebuildSplit();
      });
    }

    function onPointerMove(clientX: number, clientY: number) {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      state.pointerX = Math.max(-1, Math.min(1, (clientX - cx) / cx));
      state.pointerY = Math.max(-1, Math.min(1, (clientY - cy) / cy));
      state.pointerActive = true;
      state.lastMoveAt = performance.now();
      setCaptionSeen(true);
    }

    const handleWindowPointerMove = (e: PointerEvent) => onPointerMove(e.clientX, e.clientY);
    const handleWindowPointerDown = (e: PointerEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseLeave = () => { state.pointerActive = false; };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    window.addEventListener('pointerdown', handleWindowPointerDown, { passive: true });
    document.documentElement.removeEventListener('mouseleave', handleMouseLeave);

    function playIntroSequence() {
      if (state.autoPlayed) return;
      state.autoPlayed = true;
      const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || 'ontouchstart' in window);
      if (!isMobile) {
        setTimeout(() => {
          if (!state.isActiveState) state.hoverTarget = 1;
          setTimeout(() => {
            if (!state.isActiveState) state.hoverTarget = 0;
          }, 2000);
        }, 700);
      }
    }

    function animate() {
      state.animFrameId = requestAnimationFrame(animate);
      const delta = Math.min(state.clock.getDelta(), 0.1);
      state.elapsed += delta;
      const t = state.elapsed;
      const now = performance.now();
      if (state.pointerActive && now - state.lastMoveAt > 4000) state.pointerActive = false;

      const trackEase = state.reduceMotion ? 1 : 1 - Math.exp(-4.2 * delta);
      const openEase = state.reduceMotion ? 1 : 1 - Math.exp(-2.6 * delta);
      const curX = state.pointerActive ? state.pointerX : 0;
      const curY = state.pointerActive ? state.pointerY : 0;
      state.smoothX += (curX - state.smoothX) * trackEase;
      state.smoothY += (curY - state.smoothY) * trackEase;
      state.hoverLerp += (state.hoverTarget - state.hoverLerp) * openEase;

      const idleY = state.reduceMotion ? 0 : Math.sin(t * 0.8) * 0.010;
      const idleRotY = state.reduceMotion ? 0 : Math.sin(t * 0.5) * 0.018;

      const trackRotY = state.smoothX * MAX_TRACK_YAW;
      const trackRotX = -state.smoothY * MAX_TRACK_PITCH;

      helmetPivot.position.set(0, idleY, 0);
      helmetPivot.rotation.set(trackRotX, idleRotY + trackRotY, state.smoothX * 0.015);

      if (state.topGroup && state.bottomGroup) {
        const s = state.hoverLerp;
        const eased = s * s * (3 - 2 * s);
        const cutY = calRef.current.splitYFrac * HELMET_HEIGHT;
        state.topGroup.position.set(0, cutY + eased * OPEN_TOP_LIFT, -eased * OPEN_TOP_BACK);
        state.topGroup.rotation.x = -eased * OPEN_TOP_TILT;

        state.bottomGroup.position.set(0, cutY - eased * OPEN_BOTTOM_DROP, eased * OPEN_BOTTOM_FWD);
        state.bottomGroup.rotation.x = eased * OPEN_BOTTOM_TILT;
      }

      if (bgLayerRef.current && !state.reduceMotion) {
        bgLayerRef.current.style.transform = `translate(${-state.smoothX * 10}px,${-state.smoothY * 8}px)`;
      }

      renderer.render(scene, camera);
    }

    function resize() {
      if (!canvasHostRef.current) return;
      const w = canvasHostRef.current.clientWidth, h = canvasHostRef.current.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if ((window as any).__helmetApplyFraming) {
        (window as any).__helmetApplyFraming();
      }
    }

    window.addEventListener('resize', resize);
    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
    }

    const handleKeyDownWindow = (e: KeyboardEvent) => {
      if ((e.key === 'c' || e.key === 'C') && (document.activeElement as HTMLElement)?.tagName !== 'INPUT') {
        setCalHidden(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDownWindow);

    applyFraming();
    resize();

    buildHelmet().then(() => {
      applyFraming();
      resize();
      animate();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setLoading(false);
          playIntroSequence();
        });
      });
    }).catch((err) => {
      console.error('Helmet build failed:', err);
      setLoading(false);
    });

    return () => {
      cancelAnimationFrame(state.animFrameId);
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerdown', handleWindowPointerDown);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDownWindow);
      if (resizeObserver) resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
      delete (window as any).__helmetApplyFraming;
      delete (window as any).__helmetRebuildSplit;
    };
  }, []);

  const handleSetActive = (v: boolean) => {
    setIsActive(v);
    if (threeStateRef.current) {
      threeStateRef.current.isActiveState = v;
      threeStateRef.current.hoverTarget = v ? 1 : 0;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t && threeStateRef.current) {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      threeStateRef.current.pointerX = Math.max(-1, Math.min(1, (t.clientX - cx) / cx));
      threeStateRef.current.pointerY = Math.max(-1, Math.min(1, (t.clientY - cy) / cy));
      threeStateRef.current.pointerActive = true;
      threeStateRef.current.lastMoveAt = performance.now();
      setCaptionSeen(true);
    }
    handleSetActive(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      handleSetActive(false);
    }, 1200);
  };

  const handleKeyDownStage = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSetActive(!isActive);
    }
    const nudge = 0.12;
    if (threeStateRef.current) {
      const st = threeStateRef.current;
      if (e.key === 'ArrowLeft') { st.pointerX = Math.max(-1, st.pointerX - nudge); st.pointerActive = true; st.lastMoveAt = performance.now(); }
      if (e.key === 'ArrowRight') { st.pointerX = Math.min(1, st.pointerX + nudge); st.pointerActive = true; st.lastMoveAt = performance.now(); }
      if (e.key === 'ArrowUp') { st.pointerY = Math.max(-1, st.pointerY - nudge); st.pointerActive = true; st.lastMoveAt = performance.now(); }
      if (e.key === 'ArrowDown') { st.pointerY = Math.min(1, st.pointerY + nudge); st.pointerActive = true; st.lastMoveAt = performance.now(); }
    }
  };

  const updateCal = (key: keyof CalibrationValues, val: number) => {
    const updated = { ...cal, [key]: val };
    setCal(updated);
    saveCal(updated);
    if (typeof window !== 'undefined') {
      if ((window as any).__helmetApplyFraming) (window as any).__helmetApplyFraming();
      if (key === 'splitYFrac' && (window as any).__helmetRebuildSplit) (window as any).__helmetRebuildSplit();
    }
  };

  const handleResetCal = () => {
    setCal(DEFAULT_CAL);
    saveCal(DEFAULT_CAL);
    if (typeof window !== 'undefined') {
      if ((window as any).__helmetApplyFraming) (window as any).__helmetApplyFraming();
      if ((window as any).__helmetRebuildSplit) (window as any).__helmetRebuildSplit();
    }
  };

  const handleCopyCal = () => {
    const txt = JSON.stringify(cal, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).catch(() => {});
    }
    setCopyBtnText('Copied');
    setTimeout(() => setCopyBtnText('Copy values'), 1200);
  };

  const signatureSrc = SIGNATURE_BASE64.startsWith('data:') 
    ? SIGNATURE_BASE64 
    : `data:image/png;base64,${SIGNATURE_BASE64}`;

  return (
    <>
      {/* SECTION 1: CLEAN HELMET HERO (IMAGE + 3D HELMET + CALIBRATION CHANGER ONLY) */}
      <section className="hero" id="home">
        <div className={`loading-overlay ${loading ? '' : 'hidden'}`} ref={loadingOverlayRef}>
          <div className="loading-mark">Calibrating scene</div>
          <div className="loading-bar"><i></i></div>
        </div>

        <div className="hero-background" id="bgLayer" ref={bgLayerRef}>
          <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="1600" height="1000" fill="#000000" />
            <g className="contours" stroke="#C5BEA8" strokeWidth="0.85" fill="none" opacity="0.6">
              <path d="M -100 180 C 250 80, 550 320, 900 160 S 1450 120, 1800 240" />
              <path d="M -100 360 C 300 260, 600 480, 980 320 S 1520 280, 1800 420" />
              <path d="M -100 540 C 260 620, 720 500, 1050 600 S 1480 540, 1800 600" />
              <path d="M -100 720 C 320 640, 640 860, 1020 700 S 1560 680, 1800 780" />
              <path d="M -100 880 C 220 800, 580 960, 940 840 S 1420 820, 1800 920" />
            </g>
          </svg>
        </div>

        <svg className="grain" aria-hidden="true">
          <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Calibration Value Changer (Top Right) */}
        <div className="cal-control-wrap">
          <button 
            className="cal-toggle" 
            id="calToggle" 
            aria-label="Toggle calibration panel" 
            title="Press C to adjust helmet alignment values" 
            onClick={(e) => {
              e.stopPropagation();
              setCalHidden(prev => !prev);
            }}
          >
            ⚙
          </button>

          <div 
            className={`cal-panel ${calHidden ? 'hidden' : ''}`} 
            id="calPanel"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <div className="cal-row"><label>Center X <span>{cal.centerXFrac.toFixed(3)}</span></label><input type="range" min="0" max="1" step="0.002" value={cal.centerXFrac} onChange={(e) => updateCal('centerXFrac', parseFloat(e.target.value))} /></div>
            <div className="cal-row"><label>Center Y <span>{cal.centerYFrac.toFixed(3)}</span></label><input type="range" min="0" max="1" step="0.002" value={cal.centerYFrac} onChange={(e) => updateCal('centerYFrac', parseFloat(e.target.value))} /></div>
            <div className="cal-row"><label>Height % <span>{cal.heightFrac.toFixed(3)}</span></label><input type="range" min="0.15" max="0.75" step="0.002" value={cal.heightFrac} onChange={(e) => updateCal('heightFrac', parseFloat(e.target.value))} /></div>
            <div className="cal-row"><label>FOV <span>{cal.vFovDeg.toFixed(1)}</span></label><input type="range" min="15" max="55" step="0.5" value={cal.vFovDeg} onChange={(e) => updateCal('vFovDeg', parseFloat(e.target.value))} /></div>
            <div className="cal-row"><label>Yaw offset° <span>{cal.yawOffsetDeg.toFixed(1)}</span></label><input type="range" min="-180" max="180" step="1" value={cal.yawOffsetDeg} onChange={(e) => updateCal('yawOffsetDeg', parseFloat(e.target.value))} /></div>
            <div className="cal-row"><label>Split height <span>{cal.splitYFrac.toFixed(3)}</span></label><input type="range" min="0.15" max="0.75" step="0.01" value={cal.splitYFrac} onChange={(e) => updateCal('splitYFrac', parseFloat(e.target.value))} /></div>
            <div className="cal-actions">
              <button type="button" onClick={handleResetCal}>Reset</button>
              <button type="button" onClick={handleCopyCal}>{copyBtnText}</button>
            </div>
            <div className="cal-hint">Press C to toggle. Center/Height/FOV/Yaw apply live. Split height rebuilds the helmet.</div>
          </div>
        </div>

        {/* 3D Helmet & Image Stage */}
        <div className="stage-wrap">
          <div
            className={`helmet-stage ${isActive ? 'is-active' : ''}`}
            id="helmetStage"
            ref={stageRef}
            tabIndex={0}
            role="button"
            aria-label="Interactive 3D helmet. Hover, focus, or tap to open the visor and chin bar and reveal the portrait beneath."
            onMouseEnter={() => handleSetActive(true)}
            onMouseLeave={() => handleSetActive(false)}
            onFocus={() => handleSetActive(true)}
            onBlur={() => handleSetActive(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDownStage}
          >
            <div className="hero-portrait">
              <img id="portraitImg" ref={portraitImgRef} alt={title} />
            </div>
            <div className="portrait-ground-shadow"></div>
            <div className="hero-canvas" id="canvasHost" ref={canvasHostRef}></div>
          </div>
        </div>

        {/* Scroll Cue to Section 2 */}
        <div 
          className="scroll-cue" 
          onClick={() => scrollTo('#message')} 
          style={{ cursor: 'pointer', position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}
        >
          <span>scroll</span>
          <i></i>
        </div>
      </section>

      {/* SECTION 2: SCROLL-DOWN MESSAGE SECTION WITH MARQUEE & SIGNATURE OVERLAY */}
      <section className="message-section" id="message">
        <div className="message-background">
          <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="1600" height="1000" fill="#000000" />
            <g className="contours" stroke="#C5BEA8" strokeWidth="0.85" fill="none" opacity="0.45">
              <path d="M -100 150 C 300 50, 600 350, 950 180 S 1480 140, 1800 260" />
              <path d="M -100 380 C 280 280, 620 500, 1000 340 S 1540 300, 1800 440" />
              <path d="M -100 580 C 240 660, 740 520, 1080 620 S 1500 560, 1800 620" />
              <path d="M -100 760 C 340 680, 660 880, 1040 720 S 1580 700, 1800 800" />
            </g>
          </svg>
        </div>

        {/* Looping Marquee Background Text */}
        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee-track">
            <div className="marquee-text">
              <span className="accent">ALI MAHER</span> • OPEN-SOURCE SOFTWARE ENGINEER • <span className="accent">FULL-STACK DEVELOPER</span> • BUILDING DIGITAL EXPERIENCES • WELCOME WE DID IT AT HOME •&nbsp;
            </div>
            <div className="marquee-text">
              <span className="accent">ALI MAHER</span> • OPEN-SOURCE SOFTWARE ENGINEER • <span className="accent">FULL-STACK DEVELOPER</span> • BUILDING DIGITAL EXPERIENCES • WELCOME WE DID IT AT HOME •&nbsp;
            </div>
          </div>
        </div>

        {/* Section 2 Responsive Layout Container */}
        <div className="message-container">
          {/* Center Portrait Container with Neon Yellow Signature Overlay */}
          <div className="message-portrait-wrap">
            <div className="message-portrait-card">
              <img src={portraitImageSrc || "/portrait.png"} alt={title} />
              <div className="message-portrait-overlay-gradient"></div>
            </div>
            <img 
              src={signatureSrc} 
              alt="Ali Maher Signature" 
              className="signature-overlay-img" 
            />
          </div>

          {/* Hero Bio Information, Hello Badge, Stats & Actions */}
          <div className="message-info-content">
            <div className="message-hello">
              <span className="hello-dot"></span>
              HELLO! WELCOME TO MY PORTFOLIO
            </div>
            
            <h2 className="message-name">I'm <span style={{ color: '#ccff00' }}>Ali Maher</span></h2>
            <h3 className="message-subtitle">Open-Source Software Engineer</h3>

            {PERSONAL?.location && (
              <div className="message-location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {PERSONAL.location}
              </div>
            )}

            <p className="message-bio">
              {PERSONAL?.bio || "Passionate Open-Source Software Engineer specializing in high-performance web applications, scalable backend systems, and immersive digital experiences."}
            </p>

            {/* Key Engineering Stats */}
            {STATS && STATS.length > 0 && (
              <div className="message-stats-row">
                {STATS.map((st, i) => (
                  <div key={i} className="stat-chip">
                    <div className="stat-chip-val">{st.value}</div>
                    <div className="stat-chip-lbl">{st.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="message-actions">
              <a 
                href="#contact" 
                className="btn-hire-custom"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
              >
                HIRE ME
              </a>
              <a 
                href="#projects" 
                className="btn-ghost-custom"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#projects');
                }}
              >
                MY WORKS
              </a>
            </div>

            {/* Social & Contact Links */}
            <div className="message-socials">
              {PERSONAL?.github && (
                <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon-link" title="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              {PERSONAL?.linkedin && (
                <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-link" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.49 1.49 0 1 0 0 2.98 1.49 1.49 0 0 0 0-2.98z" />
                  </svg>
                </a>
              )}
              {PERSONAL?.email && (
                <a href={`mailto:${PERSONAL.email}`} aria-label="Email" className="social-icon-link" title="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                </a>
              )}
              {PERSONAL?.phone && (
                <a href={`tel:${PERSONAL.phone.replace(/\s+/g, '')}`} aria-label="Phone" className="social-icon-link" title="Phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelmetHero;
