export const clientUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.virtualcanvas.app/query'
    : 'http://localhost:8080/query'
