import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import { MdAccountCircle } from 'react-icons/md'
import { motion } from 'framer-motion'
import { queryCache } from 'react-query'

import { Toast } from './toast'

import { UserProfile } from '../modules/types'
import { EditorContext } from '../context/editor-context'

interface Props {
  toggleProfile: boolean
  setToggleProfile: Dispatch<SetStateAction<boolean>>
}

const SocialBar: React.FC<Props> = ({ toggleProfile, setToggleProfile }) => {
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')
  const [website, setWebsite] = useState('')
  const [showSuccessMsg, setShowSuccessMsg] = useState('')

  const userProfile = queryCache.getQueryData('userProfile') as UserProfile

  const { updateUser, username } = useContext(EditorContext)

  useEffect(() => {
    setInstagram(userProfile?.social?.instagram)
    setFacebook(userProfile?.social?.facebook)
    setWebsite(userProfile?.social?.website)
  }, [userProfile])

  const handleSubmit = async e => {
    e.preventDefault()

    const { msg } = await updateUser({
      username,
      facebook,
      website,
      instagram,
    })
    if (msg === 'Profile updated') {
      setShowSuccessMsg('Social links updated')
    }
  }

  const slideInOutProfile = useSpring({
    transform: toggleProfile
      ? 'translate3d(-330px, -50%, 0)'
      : 'translate3d(-30px, -50%, 0)',
    config: { mass: 1, tension: 120, friction: 18 },
  })

  return (
    <>
      <Wrapper style={slideInOutProfile}>
        <UserIcon onClick={() => setToggleProfile(prevState => !prevState)} />
        <Container onSubmit={handleSubmit}>
          <div>
            <SocialContainer>
              <h2>Social links</h2>
              <InputFieldRowSocial>
                <LabelSocial style={{ display: 'block' }}>
                  Instagram
                </LabelSocial>
                <InputFieldSocial
                  name="instagram"
                  value={instagram}
                  onChange={e => setInstagram(e.target.value)}
                />
              </InputFieldRowSocial>
              <InputFieldRowSocial>
                <LabelSocial style={{ display: 'block' }}>Facebook</LabelSocial>
                <InputFieldSocial
                  name="facebook"
                  value={facebook}
                  onChange={e => setFacebook(e.target.value)}
                />
              </InputFieldRowSocial>
              <InputFieldRowSocial>
                <LabelSocial style={{ display: 'block' }}>Website</LabelSocial>
                <InputFieldSocial
                  name="website"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                />
              </InputFieldRowSocial>
            </SocialContainer>
            <div>
              <h2>Profile info</h2>
              <InputFieldRowSocial>
                <LabelSocial style={{ display: 'block' }}>Username</LabelSocial>
                <InputFieldSocial onChange={() => {}} value={username} />
              </InputFieldRowSocial>
            </div>
          </div>
          <SaveButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Save
          </SaveButton>
        </Container>
      </Wrapper>
      {showSuccessMsg && (
        <Toast
          message={showSuccessMsg}
          resetState={() => setShowSuccessMsg('')}
          delay={3000}
        />
      )}
    </>
  )
}

export default SocialBar

// Styles
const Wrapper = styled(animated.div)`
  content: '';
  height: 90%;
  width: 350px;
  padding: 3rem 5rem 2rem 4rem;
  background: #f4f4f4;
  position: absolute;
  border-top-left-radius: 23px;
  border-bottom-left-radius: 23px;
  top: 50%;
  z-index: 0;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.15);
`

const Container = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const UserIcon = styled(MdAccountCircle)`
  position: absolute;
  top: 50%;
  left: 7px;
  font-size: 1.8rem;
  transform: translateY(-50%);
  color: #623cea;
  cursor: pointer;
`

const SocialContainer = styled.div`
  margin-bottom: 3rem;
`

const InputFieldRow = styled.div`
  margin-bottom: 2.8rem;
  position: relative;
`

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
`

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background: #f4f4f4;
  font-size: 1.4rem;
  color: #333;
  font-family: inherit;
  outline: none;
`

const InputFieldRowSocial = styled(InputFieldRow)`
  margin-bottom: 1rem;
`

const InputFieldSocial = styled(InputField)`
  background: #fff;

  &::placeholder {
    font-size: 1.2rem;
    color: #999;
  }
`

const LabelSocial = styled(Label)`
  font-size: 1.2rem;
`

const SaveButton = styled(motion.button)`
  background: #623cea;
  padding: 1rem 3.8rem;
  border: none;
  color: ghostwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 5px;
  box-shadow: 0 5px #4923d1;
  cursor: pointer;
  margin-bottom: 3rem;
  outline: none;
`
