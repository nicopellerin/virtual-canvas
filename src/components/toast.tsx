import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { MdCheckCircle } from "react-icons/md"

import Portal from "./portal"

interface Props {
  message: string
  resetState: any
  delay?: number
  error?: boolean
}

export const Toast: React.FC<Props> = ({
  message,
  resetState,
  delay = 2000,
  error,
}) => {
  const [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      resetState(false)
      setShow(false)
    }, delay)
  }, [])

  return (
    <Portal>
      {show && (
        <motion.div animate={{ y: [20, 0], opacity: [0, 1] }}>
          <Wrapper error={error}>
            <Text>
              <MdCheckCircle size={16} style={{ marginRight: 7 }} />
              {message}
            </Text>
          </Wrapper>
        </motion.div>
      )}
    </Portal>
  )
}

// Styles
const Wrapper = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.5rem 2rem;
  border-radius: 5px;
  background: green;
  ${props => props.error && `background: red`};
`

const Text = styled.span`
  display: block;
  color: #f4f4f4;
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`
