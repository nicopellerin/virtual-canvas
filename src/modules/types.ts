export interface Image {
  id: string
  src: string
  ratio: number
  name: string
  rotate: boolean
  border: boolean
  texture: boolean
  background: boolean
}

export interface PublicProfile {
  username: string
  social: {
    instagram: string
    facebook: string
    website: string
  }
  images: Image[]
}
