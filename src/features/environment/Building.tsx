import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

/**
 * 3D Model of a building used for the portfolio
 * Modify the scale and position to determine where it should appear and how it should appear when loading the site.
 */
export default function Building() {
  const { scene } = useGLTF("./assets/Building.glb");

  useEffect(() => {
    if (scene) {
      scene.scale.set(0.25, 0.25, 0.25);
      scene.position.set(15, 0, 0);
    }
  }, [scene]);

  return <primitive object={scene} />;
}