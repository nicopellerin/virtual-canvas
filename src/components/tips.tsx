import React, { useState, useEffect, ReactElement, ReactNode } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import cookie from "js-cookie"

const tips = [
  "Use your trackpad to zoom in/zoom out",
  "Click, hold & then move mouse to rotate canvas",
]

const cookieExists = cookie.get("show_tips")

const Tips: React.FC = () => {
  const [tip, setTip] = useState<ReactNode>()

  useEffect(() => {
    if (cookieExists) {
      return
    }
    timer()
    cookie.set("show_tips", "nope")
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
  return <Wrapper data-test="tips-app">{tip}</Wrapper>
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
