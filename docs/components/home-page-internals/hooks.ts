import { useRef } from 'react';
import { useScroll, useTransform, useSpring, useVelocity } from 'motion/react';

export function useHomePageMotion() {
  const heroRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLElement>(null);
  const workflowRef = useRef<HTMLElement>(null);
  const agentsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const orbAmberY = useTransform(scrollYProgress, [0, 1], ['0%', '-36%']);
  const orbTealY = useTransform(scrollYProgress, [0, 1], ['0%', '-58%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  const gridSkewY = useTransform(scrollYProgress, [0, 1], [0, 4]);
  const orbAmberScale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1.55, 0.75]);
  const orbAmberRotate = useTransform(scrollYProgress, [0, 1], [0, 52]);
  const orbTealX = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const orbTealScale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.65, 0.18]);
  const heroFilter = useTransform(
    scrollYProgress,
    [0, 0.26, 0.6],
    ['blur(0px)', 'blur(0px)', 'blur(16px)']
  );

  const { scrollYProgress: pageProgress } = useScroll();
  const progressBarScaleX = useSpring(pageProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  const scrollVelocity = useVelocity(pageProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 60,
    damping: 16,
  });
  const velocitySkewX = useTransform(smoothVelocity, [-1.2, 0, 1.2], [-9, 0, 9]);

  const { scrollYProgress: panelsSP } = useScroll({
    target: panelsRef,
    offset: ['start end', 'end start'],
  });
  const panelsOrbAY = useTransform(panelsSP, [0, 1], ['0%', '-65%']);
  const panelsOrbAScale = useTransform(panelsSP, [0, 0.45, 1], [0.7, 1.9, 0.85]);
  const panelsOrbBY = useTransform(panelsSP, [0, 1], ['0%', '-85%']);
  const panelsOrbBX = useTransform(panelsSP, [0, 1], [0, -180]);
  const panelsOrbBScale = useTransform(panelsSP, [0, 0.5, 1], [0.75, 1.5, 0.55]);
  const panelsOrbCY = useTransform(panelsSP, [0, 1], ['0%', '-48%']);
  const panelsKitY = useTransform(panelsSP, [0, 1], ['0%', '-55%']);
  const kitX = useTransform(panelsSP, [0, 1], [0, -80]);
  const kitRotate = useTransform(panelsSP, [0, 1], [-1, 5]);

  const { scrollYProgress: workflowSP } = useScroll({
    target: workflowRef,
    offset: ['start end', 'end start'],
  });
  const workflowGlow1Y = useTransform(workflowSP, [0, 1], ['0%', '-75%']);
  const workflowGlow1X = useTransform(workflowSP, [0, 1], [0, -260]);
  const workflowGlow2Y = useTransform(workflowSP, [0, 1], ['0%', '-48%']);
  const workflowGlow2X = useTransform(workflowSP, [0, 1], [0, 260]);

  const { scrollYProgress: agentsSP } = useScroll({
    target: agentsRef,
    offset: ['start end', 'end start'],
  });
  const agentsOrbY = useTransform(agentsSP, [0, 1], ['0%', '-72%']);
  const agentsOrbScale = useTransform(agentsSP, [0, 0.5, 1], [0.35, 1.7, 0.9]);
  const agentsOrbRotate = useTransform(agentsSP, [0, 1], [0, 130]);

  const { scrollYProgress: ctaSP } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });
  const ctaGridY = useTransform(ctaSP, [0, 1], ['0%', '-38%']);
  const ctaOrbY = useTransform(ctaSP, [0, 1], ['0%', '-90%']);
  const ctaOrbScale = useTransform(ctaSP, [0, 0.4, 1], [0.2, 2.4, 1.05]);
  const ctaOrbRotate = useTransform(ctaSP, [0, 1], [0, 175]);

  return {
    heroRef,
    panelsRef,
    workflowRef,
    agentsRef,
    ctaRef,
    scrollYProgress,
    orbAmberY,
    orbTealY,
    gridY,
    heroY,
    heroOpacity,
    hintOpacity,
    gridSkewY,
    orbAmberScale,
    orbAmberRotate,
    orbTealX,
    orbTealScale,
    heroFilter,
    progressBarScaleX,
    velocitySkewX,
    panelsOrbAY,
    panelsOrbAScale,
    panelsOrbBY,
    panelsOrbBX,
    panelsOrbBScale,
    panelsOrbCY,
    panelsKitY,
    kitX,
    kitRotate,
    workflowGlow1Y,
    workflowGlow1X,
    workflowGlow2Y,
    workflowGlow2X,
    agentsOrbY,
    agentsOrbScale,
    agentsOrbRotate,
    ctaGridY,
    ctaOrbY,
    ctaOrbScale,
    ctaOrbRotate,
  };
}

export type HomePageMotion = ReturnType<typeof useHomePageMotion>;
