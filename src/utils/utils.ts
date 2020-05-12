export const clientUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.virtualcanvas.app/query'
    : 'https://api.virtualcanvas.app/query'

export const isPublicProfile =
  typeof window !== 'undefined' &&
  window.location.pathname.split('/')[1] === 'profile'

export const usernameFromPathname =
  typeof window !== 'undefined' && window.location.pathname.split('/').pop()
