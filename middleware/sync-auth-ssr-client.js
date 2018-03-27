export default async ({ store }) => {
  await store.dispatch('auth/getToken')

  if (store.state.auth.accessToken) {
    await store.dispatch('user/getProfile')
  }
}
