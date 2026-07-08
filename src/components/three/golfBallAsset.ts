"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const GOLF_BALL_URL = "/models/GolfBall.glb";

/** Radius of the ball geometry inside GolfBall.glb (modelled in metres). */
export const GLB_BALL_RADIUS = 0.021;

/**
 * Extracts the shared geometry + material from GolfBall.glb.
 * Every ball on the site renders from this single geometry so the GPU
 * uploads the 10k-vert dimple mesh exactly once.
 */
export function useGolfBallAsset() {
  const { scene } = useGLTF(GOLF_BALL_URL);

  return useMemo(() => {
    const found: {
      geometry: THREE.BufferGeometry | null;
      material: THREE.Material | null;
    } = { geometry: null, material: null };

    scene.traverse((child) => {
      if (!found.geometry && child instanceof THREE.Mesh) {
        found.geometry = child.geometry;
        found.material = child.material as THREE.Material;
      }
    });

    if (found.material instanceof THREE.MeshStandardMaterial) {
      // Cast-urethane look: warm white, soft sheen. Just a touch below the
      // original so the spheres shade against the paper background.
      found.material.roughness = 0.55;
      found.material.metalness = 0.0;
      found.material.color = new THREE.Color("#d9d6ce");
    }

    return found;
  }, [scene]);
}

useGLTF.preload(GOLF_BALL_URL);
