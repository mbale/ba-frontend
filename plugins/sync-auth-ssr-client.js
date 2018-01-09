export default async (context) => {
  await context.store.dispatch('auth/getToken')

  if (context.store.state.auth.accessToken) {
    await context.store.dispatch('auth/getProfile')
  }
}
