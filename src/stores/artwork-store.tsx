import { observable, action, runInAction, toJS, computed } from 'mobx'
import axios from 'axios'
import cookie from 'js-cookie'

let usernameRef
if (typeof window !== 'undefined') {
  usernameRef = window.location.href.split('/')[4]
}

const tokenRef = cookie.getJSON('vc_token')

export class ArtworkStore {
  @observable
  username = usernameRef

  @observable
  token = tokenRef

  @observable
  imageInfo = {
    lightIntensity: '0',
    showTexture: false,
    showBorder: false,
    artworkName: '',
    backgroundColor: false,
    rotateIncrement: false,
    photoPreview: '',
    photoRatio: 0,
    photoGallery: [],
    queryId: '',
  }

  @observable
  imageState = {
    photoUploaded: false,
    loader: '',
    loaded: false,
    errMsg: '',
    uploaded: true,
  }

  @computed
  get artworkData() {
    const clone = toJS(this.imageInfo)
    console.log(clone)
    return clone
  }

  @action
  updateLight(value) {
    this.imageInfo.lightIntensity = value
  }

  @action
  async updateCanvas(e) {
    this.imageInfo[e.target.name] = !this.imageInfo[e.target.name]
    await this.updatePhotoProps()
  }

  @action
  async updateName(e, setShowSuccessMsg, setSubmitted, artworkFieldRef) {
    e.preventDefault()

    const photo = this.imageInfo.photoGallery.find(
      url => url.src === this.imageInfo.photoPreview
    )
    photo.name = this.imageInfo.artworkName

    await axios.patch(
      `https://api.virtualcanvas.app/api/artwork/${photo.id}`,
      photo,
      {
        headers: {
          Token: tokenRef,
        },
      }
    )

    if (this.imageInfo.artworkName) {
      setShowSuccessMsg('Saved name to artwork')
      setSubmitted(true)
      artworkFieldRef.current.blur()
    }
  }

  @action
  async updatePhotoProps() {
    const photo = this.imageInfo.photoGallery.find(
      url => url.src === this.imageInfo.photoPreview
    )

    photo.background = this.imageInfo.backgroundColor
    photo.texture = this.imageInfo.showTexture
    photo.border = this.imageInfo.showBorder
    photo.rotate = this.imageInfo.rotateIncrement
    photo.lighting = this.imageInfo.lightIntensity

    await axios.patch(
      `https://api.virtualcanvas.app/api/artwork/${photo.id}`,
      photo,
      {
        headers: {
          Token: tokenRef,
        },
      }
    )
  }

  @action
  updateGalleryState(data) {
    this.imageInfo.photoGallery = data
  }

  @action
  async getAllArtwork() {
    const { data } = await axios.get(
      `https://api.virtualcanvas.app/api/account/${this.username}`
    )

    runInAction(() => {
      if (data && data.images && data.images.length > 0) {
        if (this.imageInfo.queryId) {
          const photo = data.images.find(
            url => url.id === this.imageInfo.queryId
          )

          this.imageInfo = {
            photoPreview: photo.src,
            photoRatio: photo.ratio,
            artworkName: photo.name,
            backgroundColor: photo.background,
            rotateIncrement: photo.rotate,
            showBorder: photo.border,
            showTexture: photo.texture,
            lightIntensity: photo.lighting,
            photoGallery: data.images,
            queryId: photo.id,
          }
        } else {
          this.imageInfo = {
            photoPreview: data.images[0].src,
            photoRatio: data.images[0].ratio,
            artworkName: data.images[0].name,
            backgroundColor: data.images[0].background,
            rotateIncrement: data.images[0].rotate,
            showBorder: data.images[0].border,
            showTexture: data.images[0].texture,
            lightIntensity: data.images[0].lighting,
            photoGallery: data.images,
          }
        }
      }
    })
  }

  @action
  async handleArtworkNameChange(
    e,
    setShowSuccessMsg,
    setSubmitted,
    artworkFieldRef
  ) {
    e.preventDefault()

    const token = cookie.getJSON('vc_token')

    const photo = this.imageInfo.photoGallery.find(
      url => url.src === this.imageInfo.photoPreview
    )
    photo.name = this.imageInfo.artworkName

    await axios.patch(
      `https://api.virtualcanvas.app/api/artwork/${photo.id}`,
      photo,
      {
        headers: {
          Token: token,
        },
      }
    )

    if (this.imageInfo.artworkName) {
      setShowSuccessMsg('Saved name to artwork')
      setSubmitted(true)
      artworkFieldRef.current.blur()
    }
  }
}
