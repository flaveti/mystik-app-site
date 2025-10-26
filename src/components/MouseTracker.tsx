import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface MousePosition {
  x: number;
  y: number;
}

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Use RAF to sync with browser paint
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsMoving(true);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsMoving(false);
        }, 100);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          willChange: 'transform, opacity'
        }}
        animate={{
          scale: isMoving ? 1.2 : 0.8,
          opacity: isMoving ? 0.6 : 0.3,
        }}
        transition={{
          duration: 0.15,
          ease: "easeOut"
        }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-md" />
      </motion.div>

      {/* Secondary trailing effect */}
      <motion.div
        className="fixed pointer-events-none z-49 mix-blend-screen"
        style={{
          left: mousePosition.x - 30,
          top: mousePosition.y - 30,
          willChange: 'transform, opacity'
        }}
        animate={{
          scale: isMoving ? 1 : 0.5,
          opacity: isMoving ? 0.3 : 0.1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-lg" />
      </motion.div>
    </>
  );
}

interface MouseFollowerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function MouseFollower({ children, className = '', intensity = 0.1 }: MouseFollowerProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (mousePosition.x - centerX) * intensity;
    const deltaY = (mousePosition.y - centerY) * intensity;
    
    setElementPosition({ x: deltaX, y: deltaY });
  }, [mousePosition, intensity]);

  return (
    <motion.div
      className={className}
      style={{ willChange: 'transform' }}
      animate={{
        x: elementPosition.x,
        y: elementPosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 1
      }}
    >
      {children}
    </motion.div>
  );
}