"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Droplets, Leaf, Wheat } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

const badges = [
  { icon: Droplets, label: "100% Cold-Pressed Mustard Oil" },
  { icon: Leaf, label: "Zero Preservatives" },
  { icon: Wheat, label: "Stone Ground Spices" },
];

const motes = [
  { cx: 448, cy: 248, r: 3.2, dx: -36, dy: -92, color: "#D49B35", delay: 1.65 },
  { cx: 478, cy: 242, r: 2.4, dx: -8, dy: -118, color: "#F4EBD9", delay: 1.75 },
  { cx: 508, cy: 250, r: 3.4, dx: 22, dy: -100, color: "#E7B85A", delay: 1.7 },
  { cx: 532, cy: 246, r: 2.2, dx: 40, dy: -78, color: "#B85D36", delay: 1.9 },
  { cx: 462, cy: 254, r: 2, dx: -18, dy: -70, color: "#FCF9F2", delay: 1.85 },
  { cx: 496, cy: 256, r: 2.6, dx: 8, dy: -84, color: "#D49B35", delay: 2 },
];

const ease = "easeOut" as const;

const LEAF = "M0 2C6-6 10-28 8-48 7-62 3-74 0-80-3-70-8-56-10-40-9-22-5-6 0 2z";
const MIDRIB = "M0 0C-0.4-24-0.2-52 0-74";

type Point = { x: number; y: number };
type Sprig = { x: number; y: number; rot: number; s: number; fill: string };

const limbFills = ["#102E24", "#173E2E", "#1E5340", "#2C6B4A", "#4C8A58", "#6AA56A"];

function curve(points: Point[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    d += ` Q ${current.x} ${current.y} ${(current.x + next.x) / 2} ${(current.y + next.y) / 2}`;
  }
  const end = points[points.length - 1];
  d += ` T ${end.x} ${end.y}`;
  return d;
}

function stable(value: number) {
  return Math.round(value * 100) / 100;
}

function foliageAlong(points: Point[], spacing: number, scale: number): Sprig[] {
  const sprigs: Sprig[] = [];
  let index = 0;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const next = points[i];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const length = Math.hypot(dx, dy);
    const tangent = Math.atan2(dy, dx);
    for (let dist = spacing * 0.45; dist < length; dist += spacing) {
      const t = dist / length;
      const x = prev.x + dx * t;
      const y = prev.y + dy * t;
      for (const leafSide of [-1, 1]) {
        const theta = tangent + leafSide * 0.62 + 0.42;
        sprigs.push({
          x: stable(x),
          y: stable(y),
          rot: stable((theta * 180) / Math.PI + 90),
          s: stable(scale * (0.52 + (index % 5) * 0.05)),
          fill: limbFills[(index + i) % limbFills.length],
        });
        index += 1;
      }
    }
  }
  return sprigs;
}

const limbs: { points: Point[]; width: number; spacing: number; scale: number }[] = [
  { points: [{ x: 278, y: 348 }, { x: 262, y: 270 }, { x: 236, y: 190 }, { x: 214, y: 112 }], width: 15, spacing: 16, scale: 1 },
  { points: [{ x: 286, y: 332 }, { x: 348, y: 292 }, { x: 424, y: 252 }, { x: 498, y: 228 }], width: 16, spacing: 15, scale: 1.05 },
  { points: [{ x: 292, y: 368 }, { x: 360, y: 356 }, { x: 438, y: 338 }, { x: 512, y: 318 }], width: 11, spacing: 15, scale: 1 },
  { points: [{ x: 270, y: 340 }, { x: 206, y: 308 }, { x: 142, y: 286 }, { x: 78, y: 252 }], width: 14, spacing: 16, scale: 1 },
  { points: [{ x: 274, y: 392 }, { x: 198, y: 404 }, { x: 124, y: 382 }, { x: 70, y: 348 }], width: 9, spacing: 16, scale: 0.95 },
  { points: [{ x: 348, y: 292 }, { x: 378, y: 236 }, { x: 404, y: 176 }, { x: 392, y: 124 }], width: 7, spacing: 14, scale: 0.9 },
  { points: [{ x: 424, y: 252 }, { x: 456, y: 210 }, { x: 498, y: 176 }], width: 6, spacing: 14, scale: 0.88 },
  { points: [{ x: 300, y: 300 }, { x: 346, y: 236 }, { x: 398, y: 176 }, { x: 436, y: 124 }], width: 8, spacing: 14, scale: 0.92 },
  { points: [{ x: 330, y: 348 }, { x: 400, y: 322 }, { x: 468, y: 300 }, { x: 530, y: 286 }], width: 7, spacing: 14, scale: 0.9 },
  { points: [{ x: 310, y: 270 }, { x: 360, y: 214 }, { x: 414, y: 168 }, { x: 452, y: 128 }], width: 6, spacing: 13, scale: 0.84 },
  { points: [{ x: 286, y: 250 }, { x: 318, y: 180 }, { x: 348, y: 140 }, { x: 370, y: 108 }], width: 7, spacing: 14, scale: 0.86 },
  { points: [{ x: 400, y: 290 }, { x: 470, y: 260 }, { x: 530, y: 230 }], width: 5, spacing: 13, scale: 0.8 },
  { points: [{ x: 448, y: 330 }, { x: 500, y: 360 }, { x: 540, y: 400 }], width: 5, spacing: 14, scale: 0.82 },
];

const fruitTwigs: { points: Point[]; tilt: number; fill: string }[] = [
  { points: [{ x: 424, y: 268 }, { x: 412, y: 314 }, { x: 404, y: 356 }], tilt: -7, fill: "#6E9E3E" },
  { points: [{ x: 470, y: 246 }, { x: 486, y: 292 }, { x: 496, y: 338 }], tilt: 8, fill: "#7EAE48" },
  { points: [{ x: 360, y: 300 }, { x: 346, y: 342 }, { x: 334, y: 382 }], tilt: -4, fill: "#628F38" },
  { points: [{ x: 512, y: 318 }, { x: 524, y: 360 }, { x: 516, y: 404 }], tilt: 11, fill: "#89B650" },
  { points: [{ x: 404, y: 356 }, { x: 422, y: 378 }, { x: 436, y: 408 }], tilt: 5, fill: "#769F42" },
  { points: [{ x: 456, y: 210 }, { x: 446, y: 258 }, { x: 434, y: 304 }], tilt: -6, fill: "#74A444" },
  { points: [{ x: 378, y: 230 }, { x: 366, y: 276 }, { x: 354, y: 320 }], tilt: 7, fill: "#8BB84E" },
  { points: [{ x: 500, y: 168 }, { x: 512, y: 214 }, { x: 504, y: 262 }], tilt: 9, fill: "#5E9236" },
];

const crownLeaves = [
  ...limbs.flatMap((limb) => foliageAlong(limb.points, limb.spacing, limb.scale)),
  ...foliageAlong(
    [
      { x: 286, y: 300 },
      { x: 320, y: 250 },
      { x: 300, y: 190 },
      { x: 270, y: 140 },
    ],
    18,
    0.92,
  ),
];

const fallingLeaves = [
  { x: 392, y: 150, delay: 0.2, duration: 8.2, drift: 34, spin: 78, fill: "#4C8A58" },
  { x: 468, y: 210, delay: 1.7, duration: 9, drift: -26, spin: -64, fill: "#8FB56E" },
  { x: 340, y: 188, delay: 3.1, duration: 8.4, drift: 22, spin: 96, fill: "#1E5340" },
  { x: 510, y: 280, delay: 0.7, duration: 7.8, drift: 18, spin: -80, fill: "#6AA56A" },
  { x: 430, y: 250, delay: 4.4, duration: 8.8, drift: -30, spin: 54, fill: "#2C6B4A" },
  { x: 520, y: 140, delay: 2.2, duration: 8.6, drift: 20, spin: 70, fill: "#7EAE58" },
  { x: 360, y: 110, delay: 5.1, duration: 9.2, drift: -18, spin: -48, fill: "#3E7A4C" },
  { x: 470, y: 320, delay: 1.1, duration: 8, drift: 26, spin: 88, fill: "#A8C97A" },
];

function MangoLeaf({ x, y, rot, s, fill }: Sprig) {
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rot.toFixed(2)}) scale(${s.toFixed(2)})`}>
      <path d={LEAF} fill={fill} />
      <path d={MIDRIB} fill="none" stroke="#0C241C" strokeWidth="0.7" opacity="0.4" />
    </g>
  );
}

function HangingMango({
  x,
  y,
  tilt,
  fill,
  still,
  delay,
}: {
  x: number;
  y: number;
  tilt: number;
  fill: string;
  still: boolean;
  delay: number;
}) {
  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${y}px`, transformBox: "view-box" }}
      initial={false}
      animate={still ? { rotate: tilt } : { rotate: [tilt - 3.5, tilt + 4.5, tilt - 2, tilt + 3.5, tilt - 3.5] }}
      transition={still ? { duration: 0 } : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <g transform={`translate(${x} ${y})`}>
        <path d="M0 0c1 12 .2 22 2 32" stroke="#5C4030" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="2" cy="31" rx="3.4" ry="1.7" fill="#5D7A3C" />
        <path
          d="M2 30c16-2 30 12 28 36-2 22-16 42-32 46-6 2-12-2-14-8-8-20-12-40-6-58 4-12 12-18 24-16z"
          fill={fill}
        />
        <path d="M0 40c-8 16-8 34-2 48 3-16 6-32 8-48-2 0-4 0-6 0z" fill="#2E4A24" opacity="0.2" />
        <path d="M12 42c1 14 0 26-2 34" stroke="#E4F0C2" strokeWidth="2.2" opacity="0.5" fill="none" strokeLinecap="round" />
        <path d="M-8 104c3 5 10 6 14 2" stroke="#3E5C2A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </motion.g>
  );
}

function MangoTree({
  reduce,
  swayDelay = 0,
  className,
}: {
  reduce: boolean | null;
  swayDelay?: number;
  className?: string;
}) {
  const still = Boolean(reduce);

  return (
    <svg viewBox="0 0 560 720" overflow="visible" className={className} aria-hidden="true">
      <ellipse cx="286" cy="708" rx="90" ry="12" fill="#0F382A" opacity="0.08" />
      <motion.g
        style={{ transformOrigin: "286px 710px", transformBox: "view-box" }}
        animate={still ? undefined : { rotate: [-0.7, 0.9, -0.4, 0.7, -0.7] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: swayDelay }}
      >
        <path
          d="M252 714c-2-78-16-150-6-230 6-52 2-96 16-150 10 42 8 92 2 146-8 78 4 164 10 234h-22z"
          fill="#3A291F"
        />
        <path
          d="M268 710c-6-90-18-176-2-268"
          fill="none"
          stroke="#6B4A36"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M286 690c8-70 4-150-6-220"
          fill="none"
          stroke="#2A1C16"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.28"
        />
        <motion.g
          style={{ transformOrigin: "286px 360px", transformBox: "view-box" }}
          animate={still ? undefined : { rotate: [-1.6, 2.2, -1, 1.7, -1.6] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: swayDelay }}
        >
          {limbs.map((limb) => (
            <path
              key={`${limb.points[0].x}-${limb.width}`}
              d={curve(limb.points)}
              fill="none"
              stroke="#3A291F"
              strokeWidth={limb.width}
              strokeLinecap="round"
            />
          ))}
          {fruitTwigs.map((twig) => (
            <path
              key={`twig-${twig.points[2].x}`}
              d={curve(twig.points)}
              fill="none"
              stroke="#4A3428"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          ))}
          {crownLeaves.map((leaf, index) =>
            !still && index % 9 === 0 ? (
              <motion.g
                key={`leaf-${leaf.x}-${leaf.y}-${index}`}
                style={{ transformOrigin: `${leaf.x}px ${leaf.y}px`, transformBox: "view-box" }}
                animate={{ rotate: [-6, 7, -3, 6, -6] }}
                transition={{ duration: 2.6 + (index % 4) * 0.2, repeat: Infinity, ease: "easeInOut", delay: swayDelay }}
              >
                <MangoLeaf {...leaf} />
              </motion.g>
            ) : (
              <MangoLeaf key={`leaf-${leaf.x}-${leaf.y}-${index}`} {...leaf} />
            ),
          )}
          {fruitTwigs.map((twig, index) => {
            const tip = twig.points[twig.points.length - 1];
            return (
              <HangingMango
                key={`fruit-${tip.x}-${tip.y}`}
                x={tip.x}
                y={tip.y}
                tilt={twig.tilt}
                fill={twig.fill}
                still={still}
                delay={swayDelay + index * 0.18}
              />
            );
          })}
        </motion.g>
      </motion.g>
      {still
        ? null
        : fallingLeaves.map((leaf) => (
            <motion.g
              key={`fall-${leaf.x}-${leaf.delay}`}
              style={{ transformOrigin: `${leaf.x}px ${leaf.y}px`, transformBox: "view-box" }}
              animate={{
                x: [0, leaf.drift * 0.45, leaf.drift * -0.2, leaf.drift],
                y: [0, 90, 190, 300],
                rotate: [0, leaf.spin * 0.45, leaf.spin, leaf.spin * 1.15],
                opacity: [0, 0.92, 0.75, 0],
              }}
              transition={{
                duration: leaf.duration,
                delay: leaf.delay + swayDelay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <g transform={`translate(${leaf.x} ${leaf.y}) scale(0.95)`}>
                <path d={LEAF} fill={leaf.fill} />
                <path d={MIDRIB} fill="none" stroke="#0C241C" strokeWidth="0.7" opacity="0.35" />
              </g>
            </motion.g>
          ))}
    </svg>
  );
}

export function HeroAnimation() {
  const reduce = useReducedMotion();

  const motionOf = (delay: number, duration: number) =>
    reduce ? { duration: 0 } : { delay, duration, ease };

  return (
    <section className="relative isolate flex flex-col overflow-hidden lg:min-h-[calc(100svh-4.25rem)]">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-mustard/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-terracotta/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block" aria-hidden="true">
        <MangoTree
          reduce={reduce}
          className="absolute -bottom-8 -left-2 h-[min(66vh,520px)] w-auto max-w-none -translate-x-[44%] sm:h-[min(76vh,600px)] sm:-translate-x-[38%] lg:-bottom-10 lg:h-[min(86vh,660px)] lg:-translate-x-[34%]"
        />
        <MangoTree
          reduce={reduce}
          swayDelay={1.05}
          className="absolute -bottom-10 -right-2 h-[min(60vh,480px)] w-auto max-w-none translate-x-[46%] scale-x-[-1] sm:h-[min(70vh,560px)] sm:translate-x-[40%] lg:h-[min(80vh,620px)] lg:translate-x-[36%]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 pb-10 pt-6 sm:px-8 sm:pt-10">
        <motion.div
          className="hero-settle z-10 max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 150, scale: 0.74 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={motionOf(2.05, 1.05)}
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-terracotta sm:text-xs sm:tracking-[0.22em]">
            Handmade in small barnis
          </p>
          <h1 className="mt-3 font-serif text-[2.6rem] font-semibold leading-[0.95] tracking-tight text-forest sm:text-6xl lg:text-7xl">
            Athammas <span className="text-terracotta">Achar</span>
          </h1>
          <motion.p
            className="mx-auto mt-4 max-w-xl px-1 font-serif text-lg italic leading-snug text-forest/80 sm:text-2xl"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionOf(2.55, 0.7)}
          >
            {site.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-scene relative mt-1 w-full max-w-3xl"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={motionOf(0.05, 0.9)}
        >
          <svg viewBox="0 0 720 520" className="mx-auto h-[min(32vh,220px)] w-auto max-w-full sm:h-[min(40vh,340px)] lg:h-[min(46vh,420px)]" aria-hidden="true">
            <defs>
              <linearGradient id="clay" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D4784E" />
                <stop offset="48%" stopColor="#B85D36" />
                <stop offset="100%" stopColor="#7A3E24" />
              </linearGradient>
              <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D98A62" />
                <stop offset="100%" stopColor="#8C4630" />
              </linearGradient>
              <radialGradient id="halo" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#F4EBD9" />
                <stop offset="100%" stopColor="#F4EBD9" stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse cx="390" cy="270" rx="250" ry="170" fill="url(#halo)" />
            <ellipse cx="470" cy="470" rx="150" ry="18" fill="#0F382A" opacity="0.08" />

            <g>
              <path
                d="M118 330c-10 86 22 150 96 164 86 16 160-22 172-98 8-48-22-92-66-112-16-6-30-4-48-2 10 16 6 34-10 46-24 16-74 8-96-10-14-12-30-6-48 12z"
                fill="#0F382A"
              />
              <path
                d="M168 468c46 24 130 28 186 4"
                fill="none"
                stroke="#D49B35"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M176 312c8 30 82 46 124 18 10-26 0-56-38-66-42-10-82 8-86 48z"
                fill="#B85D36"
              />
              <ellipse cx="312" cy="328" rx="26" ry="16" fill="#B85D36" />
              <path d="M214 292c10 16 40 18 50 2 2-14-10-26-26-26-16 0-26 10-24 24z" fill="#E4B896" />
              <path
                d="M150 236c-8-62 28-112 92-118 70-6 122 36 120 102-2 24-14 46-36 58-6 26-34 38-60 32-42 10-104-8-116-74z"
                fill="#0F382A"
              />
              <ellipse cx="246" cy="228" rx="42" ry="48" fill="#F0C8A8" />
              <path
                d="M204 206c10-42 30-64 54-68 28-4 52 14 58 46-20-10-38-8-56 2-18 8-38 10-56 20z"
                fill="#0F382A"
              />
              <path d="M220 224c8 8 18 8 24 0" fill="none" stroke="#0F382A" strokeWidth="2.1" strokeLinecap="round" />
              <path d="M256 224c8 8 18 8 24 0" fill="none" stroke="#0F382A" strokeWidth="2.1" strokeLinecap="round" />
              <path d="M220 212c8-4 16-4 22 1" fill="none" stroke="#0F382A" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M256 212c8-4 16-4 22 1" fill="none" stroke="#0F382A" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M214 178c8 4 12 2 16-2" fill="none" stroke="#C48A62" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              <path d="M268 176c6 4 12 2 16-1" fill="none" stroke="#C48A62" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              <path d="M248 238c2 7 2 9 0 12" fill="none" stroke="#C9956E" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M228 258c12 12 30 12 42 0" fill="none" stroke="#B85D36" strokeWidth="2.3" strokeLinecap="round" />
              <ellipse cx="214" cy="250" rx="8" ry="4" fill="#B85D36" opacity="0.28" />
              <ellipse cx="284" cy="250" rx="8" ry="4" fill="#B85D36" opacity="0.28" />
              <circle cx="250" cy="196" r="2.5" fill="#B85D36" />
              <circle cx="206" cy="248" r="3.4" fill="#D49B35" />
            </g>

            <g>
              <path
                d="M392 286c-4 0-14 22-18 46-28 40-44 96-36 150 10 62 62 96 142 100 80-4 132-38 142-100 8-54-8-110-36-150-4-24-14-46-18-46H392z"
                fill="url(#clay)"
              />
              <path
                d="M430 340c-6 48-2 110 18 156"
                fill="none"
                stroke="#F4EBD9"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.28"
              />
              <path d="M404 360h152" stroke="#D49B35" strokeWidth="7" strokeLinecap="round" />
              <path d="M416 382h128" stroke="#0F382A" strokeWidth="2" opacity="0.35" />
              <circle cx="444" cy="360" r="3" fill="#0F382A" />
              <circle cx="480" cy="360" r="3" fill="#FCF9F2" />
              <circle cx="516" cy="360" r="3" fill="#0F382A" />
              <path d="M430 250h100v40c0 6-10 12-22 12H452c-12 0-22-6-22-12v-40z" fill="#9A4E2E" />
              <ellipse cx="480" cy="250" rx="70" ry="16" fill="#C46A42" />
              <ellipse cx="480" cy="252" rx="48" ry="9" fill="#3A241C" />
            </g>

            <motion.ellipse
              cx="480"
              cy="246"
              rx="34"
              ry="10"
              fill="#D49B35"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={motionOf(1.45, 0.6)}
            />

            {motes.map((mote) => (
              <motion.circle
                key={`${mote.cx}-${mote.delay}`}
                cx={mote.cx}
                cy={mote.cy}
                r={mote.r}
                fill={mote.color}
                initial={reduce ? false : { opacity: 0, x: 0, y: 0 }}
                animate={
                  reduce
                    ? { opacity: 0, x: 0, y: 0 }
                    : { opacity: [0, 0.95, 0], x: mote.dx, y: mote.dy }
                }
                transition={motionOf(mote.delay, 1.7)}
              />
            ))}

            <motion.g
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={reduce ? { opacity: 0, y: 8 } : { opacity: [0, 0.7, 0], y: -78 }}
              transition={motionOf(1.6, 1.8)}
            >
              <path
                d="M458 230c8-16 6-28 14-40"
                fill="none"
                stroke="#FCF9F2"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M488 226c6-20 16-30 10-46"
                fill="none"
                stroke="#F4EBD9"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M512 234c12-14 8-30 16-42"
                fill="none"
                stroke="#FCF9F2"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.65"
              />
            </motion.g>

            <motion.g
              initial={reduce ? false : { opacity: 0, y: 12, rotate: -8 }}
              animate={reduce ? { opacity: 0, y: 12, rotate: -8 } : { opacity: [0, 1, 0], y: -96, rotate: 18 }}
              transition={motionOf(1.8, 1.5)}
              style={{ transformOrigin: "430px 250px" }}
            >
              <path d="M424 250c10-28 6-40-2-48 4 10 8 18 6 30-2 8-4 14-4 18z" fill="#C23B22" />
              <path d="M430 206c4-10 2-14 6-16" stroke="#0F382A" strokeWidth="1.4" fill="none" />
            </motion.g>

            <motion.g
              initial={reduce ? false : { y: 0, rotate: 0 }}
              animate={{ y: -86, rotate: -11 }}
              transition={motionOf(0.9, 1.15)}
              style={{ transformOrigin: "392px 248px", transformBox: "view-box" }}
            >
              <path
                d="M300 348c28-36 78-78 150-112"
                fill="none"
                stroke="#E4B896"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <ellipse cx="480" cy="248" rx="74" ry="15" fill="#A3522E" />
              <path d="M412 246c0-52 136-52 136 0" fill="url(#lid)" />
              <ellipse cx="480" cy="198" rx="11" ry="8" fill="#D49B35" />
              <ellipse cx="492" cy="206" rx="16" ry="11" fill="#F0C8A8" />
              <path d="M478 198c6 2 14 8 16 14" fill="none" stroke="#C9956E" strokeWidth="1.4" strokeLinecap="round" />
            </motion.g>
          </svg>
        </motion.div>

        <motion.div
          className="hero-settle z-10 -mt-2 flex w-full max-w-3xl flex-col items-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionOf(3.05, 0.7)}
        >
          <ul className="flex flex-wrap justify-center gap-2">
            {badges.map((badge) => (
            <li
                key={badge.label}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-forest/10 bg-parchment px-3 py-2 text-center text-xs text-forest sm:text-sm"
              >
                <badge.icon className="h-4 w-4 text-terracotta" aria-hidden="true" />
                {badge.label}
              </li>
            ))}
          </ul>
          <Link href="/inquiry" className="btn-primary mt-6 w-full max-w-xs sm:w-auto">
            Send an inquiry
          </Link>
          <button
            type="button"
            className="mt-6 flex flex-col items-center gap-1 text-sm text-forest/70"
            onClick={() => {
              document.getElementById("pickles")?.scrollIntoView({
                behavior: reduce ? "auto" : "smooth",
              });
            }}
          >
            <span>Scroll to the jars</span>
            <ChevronDown className={reduce ? "h-5 w-5" : "h-5 w-5 animate-bounce"} aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
