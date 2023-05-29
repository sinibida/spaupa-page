'use client';

import { CSSProperties, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface Vector2 {
  x: number,
  y: number
}

const isMobile = typeof navigator !== 'undefined' ? 
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) :
  false;

interface Props {
}

export default function Wiggly({
  children
}: PropsWithChildren<Props>) {
  const [mousePercentage, setMousePercentage] = useState<Vector2>({
    x: 0.5, y: 0.5
  });

  const [vpSize, setVPSize] = useState<Vector2>({x: 0, y: 0});

  useEffect(() => {
    setVPSize({
      x: window.innerWidth, y: window.innerHeight
    })

    const onResize = (e: UIEvent) => {
      setVPSize({
        x: window.innerWidth, y: window.innerHeight
      });
    }

    window.addEventListener('resize', onResize);

    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      console.log("Hello Please");
      const {alpha, beta, gamma} = e;
      const range = 90;
      const gclamped = Math.min(Math.max(0, (gamma! + range) / (range * 2)), 1);
      const bclamped = Math.min(Math.max(0, (beta! + range) / (range * 2)), 1);
      setMousePercentage({x: gclamped, y:bclamped})
    }
    console.log(isMobile);
    window.addEventListener('deviceorientation', onDeviceOrientation);

    return () => {
      document.removeEventListener('resize', onResize);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
    }
  }, [])

  useEffect(() => {
  
    const onMouseMove = (e: MouseEvent) => {
      const newMouse = {
        x: e.clientX / vpSize.x,
        y: e.clientY / vpSize.y,
      };
      setMousePercentage(newMouse);
    }

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    }
  }, [vpSize]);

  const refTopDiv = useRef<HTMLDivElement>(null);

  const divStyles = useMemo<CSSProperties[]>(() => {
    if (!(refTopDiv.current)) {
      return [
        {position: 'absolute'},
        {position: 'absolute'},
        {position: 'absolute'},
        {position: 'absolute'},
      ]
    }
    const absolPos = {
      x: mousePercentage.x * (vpSize.x - refTopDiv.current.offsetWidth),
      y: mousePercentage.y * (vpSize.y - refTopDiv.current.offsetHeight),
    };
    const calculated = [0.25, 0.5, 0.75, 1].map(k => ({
      x: absolPos.x * k,
      y: absolPos.y * k,
    }))
    const styles = calculated.map<CSSProperties>(pos => ({
      position: 'absolute',
      top: pos.y,
      left: pos.x,
    }))
    return styles;
  }, [mousePercentage, vpSize]);

  return (
    <main className={"bg-purple-900 w-screen h-screen"}>
      <div className={`rounded-[16px] bg-purple-700 w-[95%] h-[95%] shadow-sm`} style={divStyles[0]}>
      </div>
      <div className={`rounded-[12px] bg-purple-500 w-[90%] h-[90%] shadow-sm`} style={divStyles[1]}>
      </div>
      <div className={`rounded-[8px] bg-purple-300 w-[85%] h-[85%] shadow-md`} style={divStyles[2]}>
      </div>
      <div className={`rounded-[4px] bg-white w-[80%] h-[80%] shadow-lg p-4`} style={divStyles[3]} ref={refTopDiv}>
        {children}
      </div>
    </main>
  )
}
