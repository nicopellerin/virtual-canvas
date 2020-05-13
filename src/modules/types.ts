export interface Image {
  id: string
  src: string
  ratio: number
  name: string
  rotate: boolean
  border: boolean
  texture: boolean
  background: boolean
  lighting: number
  price: number
  buyLink: string
}

export interface UserProfile {
  username: string
  email: string
  social: {
    instagram: string
    facebook: string
    website: string
  }
  images: Image[]
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
