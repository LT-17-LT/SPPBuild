"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";
import * as THREE from "three";
import { useGolfBallAsset, GLB_BALL_RADIUS } from "./golfBallAsset";

/**
 * BallPit - the Problem section's interactive 3D golf-ball field.
 *
 * Every ball is an instance of GolfBall.glb. The hero ball follows the
 * cursor (kinematic body) and knocks the field balls (dynamic bodies)
 * around; a soft spring pulls each displaced ball back to its home spot
 * so the scene always settles back into composition.
 */

export type PointerState = {
  /** Normalised section coords: x right, y up, both -1..1. */
  x: number;
  y: number;
  inside: boolean;
};

type BallPitProps = {
  pointerRef: React.RefObject<PointerState>;
  active: boolean;
  reduced: boolean;
};

/* Deterministic layout - same seeded PRNG idea as the old SVG field. */
function makeSeeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type FieldSpec = {
  id: string;
  /** Home position as fraction of viewport, x: 0..1 left→right, y: 0..1 top→bottom */
  px: number;
  py: number;
  /** Ball radius as a fraction of world viewport height */
  rf: number;
};

const FIELD: FieldSpec[] = (() => {
  const rand = makeSeeded(42);
  const specs: FieldSpec[] = Array.from({ length: 18 }, (_, i) => {
    const depth = rand() * 0.8 + 0.2;
    return {
      id: `b${i}`,
      px: rand() * 0.9 + 0.05,
      py: rand() * 0.82 + 0.09,
      rf: 0.022 + depth * 0.055 + rand() * 0.01,
    };
  });

  // Relax home positions so no two balls start interpenetrating.
  for (let iter = 0; iter < 24; iter++) {
    for (let a = 0; a < specs.length; a++) {
      for (let b = a + 1; b < specs.length; b++) {
        const A = specs[a];
        const B = specs[b];
        // Work in aspect-corrected space (assume ~2.4:1 section)
        const ax = A.px * 2.4;
        const ay = A.py;
        const bx = B.px * 2.4;
        const by = B.py;
        const dx = bx - ax;
        const dy = by - ay;
        const dist = Math.hypot(dx, dy) || 1e-4;
        const minDist = (A.rf + B.rf) * 1.15 + 0.01;
        if (dist < minDist) {
          const push = (minDist - dist) / 2;
          const ux = dx / dist;
          const uy = dy / dist;
          A.px = THREE.MathUtils.clamp(A.px - (ux * push) / 2.4, 0.03, 0.97);
          A.py = THREE.MathUtils.clamp(A.py - uy * push, 0.05, 0.95);
          B.px = THREE.MathUtils.clamp(B.px + (ux * push) / 2.4, 0.03, 0.97);
          B.py = THREE.MathUtils.clamp(B.py + uy * push, 0.05, 0.95);
        }
      }
    }
  }
  return specs;
})();

const HERO_RF = 0.105; // hero ball radius as fraction of viewport height

function FieldBall({
  spec,
  paused,
}: {
  spec: FieldSpec;
  paused: boolean;
}) {
  const { parts } = useGolfBallAsset();
  const { viewport } = useThree();
  const body = useRef<RapierRigidBody>(null);

  const radius = spec.rf * viewport.height;
  const home = useMemo(
    () =>
      new THREE.Vector3(
        (spec.px - 0.5) * viewport.width,
        (0.5 - spec.py) * viewport.height,
        0,
      ),
    [spec, viewport.width, viewport.height],
  );

  useFrame((_, dt) => {
    const rb = body.current;
    if (!rb || paused) return;
    const t = rb.translation();
    const dx = home.x - t.x;
    const dy = home.y - t.y;
    const dist = Math.hypot(dx, dy);
    // Gentle homing spring - strong enough to always come back,
    // weak enough to read as a slow, lazy roll.
    if (dist > 0.01) {
      const m = rb.mass();
      const k = 2.2;
      const step = Math.min(dt, 0.05);
      rb.applyImpulse(
        { x: dx * k * m * step, y: dy * k * m * step, z: 0 },
        true,
      );
    }
  });

  if (parts.length === 0) return null;

  const scale = radius / GLB_BALL_RADIUS;
  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={[home.x, home.y, 0]}
      enabledTranslations={[true, true, false]}
      linearDamping={1.6}
      angularDamping={1.2}
      restitution={0.55}
      friction={0.4}
    >
      <BallCollider args={[radius]} />
      <group scale={scale}>
        {parts.map((p, i) => (
          <mesh key={i} geometry={p.geometry} material={p.material} />
        ))}
      </group>
    </RigidBody>
  );
}

function HeroBall({
  pointerRef,
  paused,
}: {
  pointerRef: React.RefObject<PointerState>;
  paused: boolean;
}) {
  const { parts } = useGolfBallAsset();
  const { viewport } = useThree();
  const body = useRef<RapierRigidBody>(null);
  const meshGroup = useRef<THREE.Group>(null);
  // Smoothed position; seeded from the body's spawn point on first frame.
  const pos = useRef<THREE.Vector3 | null>(null);
  const spinAxis = useMemo(() => new THREE.Vector3(), []);

  const radius = HERO_RF * viewport.height;
  const restX = viewport.width * 0.04;
  const restY = -viewport.height * 0.12;

  useFrame((_, dt) => {
    const rb = body.current;
    if (!rb || paused) return;
    if (!pos.current) {
      const t = rb.translation();
      pos.current = new THREE.Vector3(t.x, t.y, 0);
    }

    const p = pointerRef.current;
    const tx = p?.inside ? (p.x * viewport.width) / 2 : restX;
    const ty = p?.inside ? (p.y * viewport.height) / 2 : restY;

    const cur = pos.current;
    const alpha = 1 - Math.exp(-6.5 * Math.min(dt, 0.05));
    const nx = cur.x + (tx - cur.x) * alpha;
    const ny = cur.y + (ty - cur.y) * alpha;

    // Visual roll: spin the group about the axis perpendicular to travel.
    const dx = nx - cur.x;
    const dy = ny - cur.y;
    const dist = Math.hypot(dx, dy);
    if (meshGroup.current && dist > 1e-5) {
      spinAxis.set(-dy / dist, dx / dist, 0);
      meshGroup.current.rotateOnWorldAxis(spinAxis, -dist / radius);
    }

    cur.set(nx, ny, 0);
    rb.setNextKinematicTranslation({ x: nx, y: ny, z: 0 });
  });

  if (parts.length === 0) return null;

  const scale = radius / GLB_BALL_RADIUS;
  return (
    <RigidBody
      ref={body}
      type="kinematicPosition"
      colliders={false}
      position={[0, viewport.height * 1.2, 0]} // enters from above
    >
      <BallCollider args={[radius]} />
      <group ref={meshGroup} scale={scale}>
        {parts.map((p, i) => (
          <mesh key={i} geometry={p.geometry} material={p.material} />
        ))}
      </group>
    </RigidBody>
  );
}

/** Invisible walls just outside the viewport keep knocked balls in play. */
function Bounds() {
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;
  const t = 2; // wall thickness
  const pad = 0.5;
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider args={[w, t, 2]} position={[0, h / 2 + pad + t, 0]} />
      <CuboidCollider args={[w, t, 2]} position={[0, -h / 2 - pad - t, 0]} />
      <CuboidCollider args={[t, h, 2]} position={[-w / 2 - pad - t, 0, 0]} />
      <CuboidCollider args={[t, h, 2]} position={[w / 2 + pad + t, 0, 0]} />
    </RigidBody>
  );
}

function Scene({ pointerRef, paused }: {
  pointerRef: React.RefObject<PointerState>;
  paused: boolean;
}) {
  return (
    <Physics gravity={[0, 0, 0]} paused={paused}>
      <Bounds />
      {FIELD.map((spec) => (
        <FieldBall key={spec.id} spec={spec} paused={paused} />
      ))}
      <HeroBall pointerRef={pointerRef} paused={paused} />
    </Physics>
  );
}

export function BallPit({ pointerRef, active, reduced }: BallPitProps) {
  const paused = !active || reduced;
  return (
    <Canvas
      className="absolute inset-0"
      style={{ position: "absolute", pointerEvents: "none" }}
      camera={{ position: [0, 0, 10], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop={paused ? "demand" : "always"}
      aria-hidden
    >
      {/* Soft overhead ambient + a faint lower-left fill. The upper key
          light (the "top-left" highlight, previously at [5, 7, 3]) is turned
          off per direction - restore it if the shading goes too flat. */}
      <hemisphereLight args={["#fdfcf8", "#6f6a5c", 3.2]} />
      <directionalLight position={[-8, -4, 2]} intensity={1.76} />
      <Suspense fallback={null}>
        <Scene pointerRef={pointerRef} paused={paused} />
      </Suspense>
    </Canvas>
  );
}
