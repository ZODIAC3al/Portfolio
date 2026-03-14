import { useState, useEffect } from 'react';

export function useScrollSpy(ids, offset = 100) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const listener = () => {
      const scrollPos = window.scrollY + offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', listener, { passive: true });
    listener();
    return () => window.removeEventListener('scroll', listener);
  }, [ids, offset]);

  return activeId;
}
