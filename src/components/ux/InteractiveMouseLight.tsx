import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function InteractiveMouseLight() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // We store the local position here.
  // Z is set to -2, meaning it will always sit exactly 2 units in front of the camera lens,
  // safely away from the buildings so it never clips.
  const localPos = useRef(new THREE.Vector3(0, 0, -2));

  useFrame((state) => {
    if (!sphereRef.current || !lightRef.current) return;

    // 1. Calculate the exact dimensions of the screen at our specific depth
    const depth = 2;
    const viewport = state.viewport.getCurrentViewport(
      state.camera,
      new THREE.Vector3(0, 0, -depth),
    );

    // 2. Map the pointer coordinates to that specific viewport slice
    const targetX = (state.pointer.x * viewport.width) / 2;
    const targetY = (state.pointer.y * viewport.height) / 2;

    // 3. Smoothly track the mouse in this local 2D space
    localPos.current.x = THREE.MathUtils.lerp(localPos.current.x, targetX, 0.1);
    localPos.current.y = THREE.MathUtils.lerp(localPos.current.y, targetY, 0.1);

    // 4. Convert that local coordinate into a real-world position locked to the camera
    sphereRef.current.position
      .copy(localPos.current)
      .applyMatrix4(state.camera.matrixWorld);

    // 5. Force the "lens" to permanently face the camera perfectly flat
    sphereRef.current.quaternion.copy(state.camera.quaternion);

    // Keep the light locked to the same spot, but drop the intensity so it doesn't color the glass
    lightRef.current.position.copy(sphereRef.current.position);
  });

  return (
    <group>
      {/* Reduced intensity to 0.5. It still lights the environment, but won't blow out the bubble */}
      <pointLight
        ref={lightRef}
        intensity={0.5}
        color="#00ffff"
        distance={15}
      />

      {/* Here is the secret sauce: scale={[1, 1, 0.1]}
        This squashes the sphere perfectly flat on the Z-axis. 
        It's no longer a crystal ball; it's a contact lens.
      */}
      <mesh ref={sphereRef} scale={[1, 1, 0.1]}>
        {/* Adjusted radius to 0.3 for a tighter localized warp */}
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshTransmissionMaterial
          thickness={0.02}
          roughness={0}
          transmission={1}
          ior={1.03} // Extremely close to 1.0 (air). This provides the subtle 375.studio warp.
          chromaticAberration={0.03} // Just a tiny hint of digital edge-split
          transparent
        />
      </mesh>
    </group>
  );
}
