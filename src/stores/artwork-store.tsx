import { observable, action, runInAction, toJS, computed } from 'mobx'
import cookie from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

import { clientUrl } from '../utils/utils'

let usernameRef
if (typeof window !== 'undefined') {
  usernameRef = window.location.href.split('/')[4]
}

const tokenRef = cookie.getJSON('vc_token')

const client = new GraphQLClient(clientUrl, {
  headers: {
    Token: tokenRef,
  },
})

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
  async updatePhotoProps() {
    const photo = this.imageInfo.photoGallery.find(
      url => url.src === this.imageInfo.photoPreview
    )

    photo.background = this.imageInfo.backgroundColor
    photo.texture = this.imageInfo.showTexture
    photo.border = this.imageInfo.showBorder
    photo.rotate = this.imageInfo.rotateIncrement
    photo.lighting = this.imageInfo.lightIntensity

    const query = `
      mutation updateArtwork($input: UpdateArtworkInput!) {
        updateArtwork(
          input: $input
        ) {
          id
        }
      }
    `

    await client.request(query, {
      input: {
        id: photo.id,
        src: photo.src,
        name: photo.name,
        ratio: photo.ratio,
        border: photo.border,
        texture: photo.texture,
        background: photo.background,
        rotate: photo.rotate,
        lighting: photo.lighting,
        username: this.username,
      },
    })
  }

  @action
  updateGalleryState(data) {
    this.imageInfo.photoGallery = data
  }

  @action
  async getAllArtwork() {
    const query = `
    query getUser($input: UsernameInput){
      getUser(input: $input) {
        images {
          id
          src
          name
          ratio
          border
          texture
          background
          rotate
          lighting
        }
      }
    }
    `
    const variables = {
      input: {
        username: this.username,
      },
    }

    const { getUser: getImages } = await client.request(query, variables)

    runInAction(() => {
      if (getImages && getImages.images && getImages.images.length > 0) {
        if (this.imageInfo.queryId) {
          const photo = getImages.images.find(
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
            photoGallery: getImages.images,
            queryId: photo.id,
          }
        } else {
          this.imageInfo = {
            photoPreview: getImages.images[0].src,
            photoRatio: getImages.images[0].ratio,
            artworkName: getImages.images[0].name,
            backgroundColor: getImages.images[0].background,
            rotateIncrement: getImages.images[0].rotate,
            showBorder: getImages.images[0].border,
            showTexture: getImages.images[0].texture,
            lightIntensity: getImages.images[0].lighting,
            photoGallery: getImages.images,
          }
        }
      }
    })
  }

  @action
  async updateArtworkName(e, setShowSuccessMsg, setSubmitted, artworkFieldRef) {
    e.preventDefault()

    const photo = this.imageInfo.photoGallery.find(
      url => url.src === this.imageInfo.photoPreview
    )
    photo.name = this.imageInfo.artworkName

    const query = `
      mutation updateArtwork($input: UpdateArtworkInput!) {
        updateArtwork(
          input: $input
        ) {
          id
        }
      }
    `

    await client.request(query, {
      input: {
        id: photo.id,
        src: photo.src,
        name: photo.name,
        ratio: photo.ratio,
        border: photo.border,
        texture: photo.texture,
        background: photo.background,
        rotate: photo.rotate,
        lighting: photo.lighting,
        username: this.username,
      },
    })

    if (this.imageInfo.artworkName) {
      setShowSuccessMsg('Saved name to artwork')
      setSubmitted(true)
      artworkFieldRef.current.blur()
    }
  }

  @action
  showPreviousItemGallery = prevItem => {
    runInAction(() => {
      this.imageInfo.photoPreview = prevItem.src
      this.imageInfo.photoRatio = prevItem.ratio
      this.imageInfo.artworkName = prevItem.name
      this.imageInfo.backgroundColor = prevItem.background
      this.imageInfo.showBorder = prevItem.border
      this.imageInfo.showTexture = prevItem.texture
      this.imageInfo.rotateIncrement = prevItem.rotate
      this.imageInfo.lightIntensity = prevItem.lighting
    })
  }

  @action
  showNextItemGallery = nextItem => {
    runInAction(() => {
      this.imageInfo.photoPreview = nextItem.src
      this.imageInfo.photoRatio = nextItem.ratio
      this.imageInfo.artworkName = nextItem.name
      this.imageInfo.backgroundColor = nextItem.background
      this.imageInfo.showBorder = nextItem.border
      this.imageInfo.showTexture = nextItem.texture
      this.imageInfo.rotateIncrement = nextItem.rotate
      this.imageInfo.lightIntensity = nextItem.lighting
    })
  }

  @action
  showCurrentItemGallery = photo => {
    runInAction(() => {
      this.imageInfo.photoPreview = photo.src
      this.imageInfo.photoRatio = photo.ratio
      this.imageInfo.artworkName = photo.name
      this.imageInfo.backgroundColor = photo.background
      this.imageInfo.showBorder = photo.border
      this.imageInfo.showTexture = photo.texture
      this.imageInfo.rotateIncrement = photo.rotate
      this.imageInfo.lightIntensity = photo.lighting
    })
  }

  @action
  removeArtwork = async (e, id: string): Promise<void> => {
    e.stopPropagation()

    const index = this.imageInfo.photoGallery.findIndex(
      photo => photo.id === id
    )

    const query = `
      mutation deleteArtwork($input: DeleteArtworkInput) {
        deleteArtwork(
          input: $input
        ) {
            id
        }
      }
    `

    await client.request(query, {
      input: {
        username: this.username,
        id,
      },
    })

    runInAction(() => {
      if (index >= 0) {
        this.imageInfo.photoGallery.splice(index, 1)
      }
    })
  }
}
