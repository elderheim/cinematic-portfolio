import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function Sky() {
  const { scene } = useGLTF("./assets/sky.glb");

  useEffect(() => {
    if (!scene) return;

    scene.scale.set(100, 100, 100);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        // Cast the material to access properties safely
        const oldMat = child.material as THREE.MeshStandardMaterial;

        // Swap to a basic material so it glows independently of scene lighting.
        // Rendering the BackSide is crucial because the camera is sitting inside the model.
        child.material = new THREE.MeshBasicMaterial({
          map: oldMat.map || null,
          color: oldMat.color || new THREE.Color("pink"),
          side: THREE.BackSide,
          fog: false,
        });

        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

useGLTF.preload("./assets/sky.glb");
