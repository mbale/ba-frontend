export default async function ({ route, store, redirect }) {
  const isLoggedIn = store.getters['user/isLoggedIn']

  if (!isLoggedIn) {
    const redirectPath = '/login'

    return redirect(redirectPath)
  }
}
