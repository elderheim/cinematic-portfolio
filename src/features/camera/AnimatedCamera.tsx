/* eslint-disable @typescript-eslint/no-explicit-any */
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera} from "@react-three/drei";
import { useRef, useEffect } from "react";

/**
 * AnimatedCamera is a helper component that updates the camera's position and target based on the current scroll position.
 * It uses refs to receive the current camera and target positions from the parent component's animation timeline.
 * The useFrame hook is used to update the camera's position and orientation on every frame, ensuring smooth animations.
 * @param cameraAnimRef - A ref object that holds the current camera position for animation.
 * @param targetAnimRef - A ref object that holds the current camera target position for animation.
 * @returns A PerspectiveCamera component that is controlled by the parent component's animation timeline.
 */
export default function AnimatedCamera({ cameraAnimRef, targetAnimRef }: any) {
  const cameraRef = useRef<any>(null);
  const { set } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [set]);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(
        cameraAnimRef.current.x,
        cameraAnimRef.current.y,
        cameraAnimRef.current.z,
      );
      cameraRef.current.lookAt(
        targetAnimRef.current.x,
        targetAnimRef.current.y,
        targetAnimRef.current.z,
      );
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={45}
      near={1}
      far={1000}
      position={[0, 5, 0]}
    />
  );
}