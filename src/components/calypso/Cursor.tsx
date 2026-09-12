import { useEffect, useRef } from "react";

export function Cursor() {
  const followerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -999, y: -999 });
  const current = useRef({ x: -999, y: -999 });
  const rotation = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = followerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.1;
      current.current.y += (pos.current.y - current.current.y) * 0.1;
      rotation.current += 1.2;

      el.style.left = `${current.current.x}px`;
      el.style.top = `${current.current.y}px`;
      el.style.transform = `translate(-50%, -50%) rotate(${rotation.current + 45}deg)`;

      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = () => el.classList.add("hovered");
    const onLeave = () => el.classList.remove("hovered");

    document.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a, button, [role='button']").forEach((node) => {
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
    });

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={followerRef} id="cursor-follower" />;
}
