import { useEffect, useState } from "react";

export interface DeviceOrientationData {
  absolute: boolean,
  alpha: number | null,
  beta: number | null,
  gamma: number | null,
}

export default function useDeviceOrientation() {
  const [dat, setDat] = useState<DeviceOrientationData>({
    absolute: false,
    alpha: 0,
    beta: 0,
    gamma: 0
  })

  useEffect(() => {
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      const {absolute, alpha, beta, gamma} = e;
      setDat({
        absolute,
        alpha,
        beta,
        gamma,
      })
    }
    window.addEventListener('deviceorientation', onDeviceOrientation);

    return () => {
      window.removeEventListener('deviceorientation', onDeviceOrientation);
    }
  }, [])

  return dat;
}