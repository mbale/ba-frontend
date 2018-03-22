export default async function ({ route, store, redirect }) {
  const client = process.client
  const server = process.server
  const { slug } = route.params

  await store.dispatch('bookmakers/getBySlug', { slug })

  const bookmaker = store.state.bookmakers.bookmaker

  if (client) {
    window.location.replace(bookmaker.affiliateUrl)
  }

  if (server) {
    return redirect(bookmaker.affiliateUrl)
  }
}
