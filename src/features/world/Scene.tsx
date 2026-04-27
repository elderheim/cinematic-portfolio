/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useHelper, Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import Building from "../environment/Building";
import AnimatedCamera from "../camera/AnimatedCamera";

/**
 * This component sets up the 3D scene, including the camera, lighting, and objects.
 * It also applies the fog and background color to create a moody atmosphere.
 * @param cameraAnimRef - A ref object that holds the current camera position for animation.
 * @param targetAnimRef - A ref object that holds the current camera target position for animation.
 * Children components can be added to this scene, such as the InteractiveMouseLight, which will be rendered within the 3D environment.
 * @returns
 */
export default function Scene({ cameraAnimRef, targetAnimRef, children }: any) {
  const { scene } = useThree();
  const [lightTarget, setLightTarget] = useState<THREE.Object3D | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);

  useHelper(sunLightRef as any, THREE.DirectionalLightHelper, 5, "red");

  useEffect(() => {
    if (scene) {
      const fogColor = new THREE.Color("#1a0835");
      scene.fog = new THREE.Fog(fogColor, 12, 28);
      //scene.background = new THREE.Color("#1a0835");
    }
  }, [scene]);

  return (
    <>
      <AnimatedCamera
        cameraAnimRef={cameraAnimRef}
        targetAnimRef={targetAnimRef}
      />
      <ambientLight intensity={0.2} color="#a080cc" />
      {/* <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow /> */}
      <directionalLight
        ref={sunLightRef}
        target={lightTarget || undefined}
        position={[-30, 40, -25]}
        intensity={5}
        color="#ff7b00"
        castShadow
        // Optional: If shadows look jagged on the building, increase the shadow map resolution
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      >
        <object3D ref={setLightTarget} position={[15, 20, 0]} />\
      </directionalLight>
      <directionalLight
        position={[20, 5, -10]}
        intensity={0.5}
        color="#00aaff"
      />{" "}
      <pointLight position={[0, 50, 20]} intensity={0.8} color="#a080cc" />
      <Building />
      <Environment files="./assets/sky.jpg" background />
      {children}
    </>
  );
}
