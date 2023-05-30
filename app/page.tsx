'use client';

import { useState } from "react";
import IndexInner from "./components/IndexInner"
import Wiggly from "./components/Wiggly"

export default function Home() {
  const [wiggle, setWiggle] = useState(true);

  return (
    <Wiggly wiggle={wiggle}>
      <IndexInner onWiggleChange={setWiggle}/>
    </Wiggly>
  )
}