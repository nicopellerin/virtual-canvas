/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/editor/)) {
    page.matchPath = '/editor/*'
    createPage(page)
  }

  if (page.path.match(/^\/profile/)) {
    page.matchPath = '/profile/*'
    createPage(page)
  }
}
