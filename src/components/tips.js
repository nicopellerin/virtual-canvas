import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const tips = [
  "Use your trackpad to zoom in/zoom out",
  "Click, hold & then move mouse to rotate canvas",
]

const Tips = () => {
  const [tip, setTip] = useState("")

  useEffect(() => {
    timer()
  }, [])

  const timer = () => {
    let i = 0

    const interval = setInterval(() => {
      setTip(
        <motion.div animate={{ opacity: [0, 1], y: [-50, 0] }}>
          <Text>{tips[i]}</Text>
        </motion.div>
      )

      if (i++ >= tips.length) clearInterval(interval)
    }, 2500)

    return interval
  }
  return <Wrapper>{tip}</Wrapper>
}

export default Tips

// Styles
const Wrapper = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;

  transform: translateX(-50%);
`

const Text = styled.span`
  display: block;
  font-size: 1.6rem;
  color: #999;
`
