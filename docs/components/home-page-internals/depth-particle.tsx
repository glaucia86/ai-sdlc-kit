import { motion, useTransform, type MotionValue } from 'motion/react';

type DepthParticleProps = {
  scrollProg: MotionValue<number>;
  left: string;
  top: string;
  size: number;
  ySpeed: number;
  xDrift: number;
  baseOpacity: number;
  color: string;
};

export function DepthParticle({
  scrollProg,
  left,
  top,
  size,
  ySpeed,
  xDrift,
  baseOpacity,
  color,
}: DepthParticleProps) {
  const py = useTransform(scrollProg, [0, 1], [0, ySpeed]);
  const px = useTransform(scrollProg, [0, 1], [0, xDrift]);
  const po = useTransform(scrollProg, [0, 0.5, 1], [baseOpacity, baseOpacity * 0.5, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        left,
        top,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        y: py,
        x: px,
        opacity: po,
      }}
    />
  );
}
