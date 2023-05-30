'use client';

import { CSSProperties, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useDeviceOrientation from '../hooks/useDeviceOrientaion';

interface Vector2 {
  x: number,
  y: number
}

const isMobile = typeof navigator !== 'undefined' ? 
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) :
  false;

interface Props {
  wiggle: boolean
}

export default function Wiggly({
  children,
  wiggle
}: PropsWithChildren<Props>) {
  const [mousePercentage, setMousePercentage] = useState<Vector2>({
    x: 0.5, y: 0.5
  });

  const [vpSize, setVPSize] = useState<Vector2>({x: 0, y: 0});

  const OrientationData = useDeviceOrientation();

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

    return () => {
      document.removeEventListener('resize', onResize);
    }
  }, [])

  useEffect(() => {
    const range = 30;
    const gclamped = Math.min(Math.max(0, (OrientationData.gamma! + range) / (range * 2)), 1);
    const bclamped = Math.min(Math.max(0, (OrientationData.beta! + range) / (range * 2)), 1);
    setMousePercentage({x: gclamped, y:bclamped})
  }, [OrientationData]);

  useEffect(() => {
    if (!isMobile) {
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
      x: (wiggle ? mousePercentage.x : 0.5) * (vpSize.x - refTopDiv.current.offsetWidth),
      y: (wiggle ? mousePercentage.y : 0.5) * (vpSize.y - refTopDiv.current.offsetHeight),
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
  }, [wiggle, mousePercentage, vpSize]);

  return (
    <main className={"bg-purple-900 w-screen h-screen"}>
      <div className={`rounded-[16px] bg-purple-700 w-[95%] h-[95%] shadow-md shadow-purple-900/30`} style={divStyles[0]}>
      </div>
      <div className={`rounded-[12px] bg-purple-500 w-[90%] h-[90%] shadow-md shadow-purple-900/30`} style={divStyles[1]}>
      </div>
      <div className={`rounded-[8px] bg-purple-300 w-[85%] h-[85%] shadow-md shadow-purple-700/30`} style={divStyles[2]}>
      </div>
      <div className={`rounded-[4px] bg-white w-[80%] h-[80%] shadow-md shadow-purple-700/30 p-4 border-black`} style={divStyles[3]} ref={refTopDiv}>
        {children}
      </div>
    </main>
  )
}
