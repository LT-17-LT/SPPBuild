"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const GOLF_BALL_URL = "/models/GolfBall.glb";

/** Radius of the ball geometry inside GolfBall.glb (modelled in metres). */
export const GLB_BALL_RADIUS = 0.021;

export type GolfBallPart = {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
};

/**
 * Extracts every mesh part from GolfBall.glb (a single dimpled sphere).
 * Parts share the same geometry/material across every instance in the
 * scene so the GPU uploads them once.
 */
export function useGolfBallAsset() {
  const { scene } = useGLTF(GOLF_BALL_URL);

  return useMemo(() => {
    const parts: GolfBallPart[] = [];

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.Material;
        if (material instanceof THREE.MeshStandardMaterial) {
          material.roughness = 0.55;
          material.metalness = 0.0;
          material.color = new THREE.Color("#d9d6ce");
        }
        parts.push({ geometry: child.geometry, material });
      }
    });

    return { parts };
  }, [scene]);
}

useGLTF.preload(GOLF_BALL_URL);
