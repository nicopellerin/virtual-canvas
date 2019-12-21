import React, { useState, useEffect, Suspense } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'

import { useStores } from '../stores/useStores'
import { observer } from 'mobx-react-lite'

const ScrollAreaLazy = React.lazy(() => import('react-scrollbar'))

interface StyledProps {
  disabled?: boolean
  backgroundColor?: boolean
}

const Gallery: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(true)

  const { artworkStore } = useStores()

  useEffect(() => {
    if (
      artworkStore.imageInfo.photoGallery &&
      artworkStore.imageInfo.photoGallery.length === 0
    ) {
      setToggle(false)
    }
  }, [artworkStore.imageInfo.photoGallery])

  const slideInOut = useSpring({
    transform: toggle
      ? 'translate3d(0%, -50%, 0)'
      : 'translate3d(-86%, -50%, 0)',
    config: { mass: 1, tension: 120, friction: 18 },
  })

  const isSSR = typeof window === 'undefined'

  return (
    <Wrapper
      style={slideInOut}
      onClick={() => setToggle(prevState => !prevState)}
      disabled={artworkStore.imageInfo.photoGallery.length === 0}
    >
      <Container>
        {!isSSR && (
          <Suspense fallback={<div />}>
            <ScrollAreaLazy
              style={{
                height: 400,
                width: 100,
                background: 'rgba(255, 255, 255, 0.05)',
                borderTopRightRadius: '23px',
                borderBottomRightRadius: '23px',
                boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
              }}
              // speed={0.8}
              // smoothScrolling
              verticalScrollbarStyle={{ background: '#000' }}
              verticalContainerStyle={{ background: '#eee' }}
            >
              {artworkStore.imageInfo.photoGallery.map((photo, index) => {
                const prevItem = artworkStore.imageInfo.photoGallery[index - 1]
                const nextItem = artworkStore.imageInfo.photoGallery[index + 1]
                return (
                  <ThumbnailWrapper key={photo.id}>
                    <Thumbnail
                      src={photo.src}
                      alt="Preview thumbnail"
                      width={60}
                      height={60}
                      lastImage={
                        artworkStore.imageInfo.photoGallery.length - 1 === index
                      }
                      onClick={e => {
                        e.stopPropagation()
                        artworkStore.showCurrentItemGallery(photo)
                      }}
                    />
                    <CloseIcon
                      size={16}
                      color="white"
                      onClick={e => {
                        if (prevItem) {
                          artworkStore.showPreviousItemGallery(prevItem)
                        } else if (nextItem) {
                          artworkStore.showNextItemGallery(nextItem)
                        } else {
                          artworkStore.imageInfo.photoPreview = ''
                          artworkStore.imageInfo.artworkName = ''
                        }
                        artworkStore.removeArtwork(e, photo.id)
                      }}
                    />
                  </ThumbnailWrapper>
                )
              })}
            </ScrollAreaLazy>
          </Suspense>
        )}
      </Container>
      <Text
        backgroundColor={artworkStore.imageInfo.backgroundColor ? true : false}
      >
        Gallery
      </Text>
    </Wrapper>
  )
}

export default observer(Gallery)

// Styles
const Wrapper = styled(animated.div)`
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 0;
  pointer-events: ${(props: StyledProps) => (props.disabled ? 'none' : 'all')};
`

const Container = styled.div`
  position: relative;
  height: 400px;
`

const ThumbnailWrapper = styled.div`
  position: relative;
`

const Thumbnail = styled.img`
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin: 1.5rem 0 0rem 1.5rem;
  ${(props: { lastImage: boolean }) =>
    props.lastImage && 'margin-bottom: 2rem'};
`

const CloseIcon = styled(MdClose)`
  position: absolute;
  top: 1.2rem;
  right: 2.2rem;
  background: #111;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: opacity 300ms ease-in-out;

  ${ThumbnailWrapper}:hover & {
    opacity: 1;
  }
`

const Text = styled.span`
  display: block;
  transform: rotate(90deg);
  color: ${(props: StyledProps) => (props.backgroundColor ? '#333' : '#999')};
  position: absolute;
  left: 77px;
  padding-left: 20px;
  top: calc(50% - 2rem);
  font-size: 1.4rem;
  cursor: pointer;
`
