export default async ({ $axios, error, store }) => {
  // if we extend
  // we need to set up additionals here
  $axios.setHeader('Authorization', store.state.auth.accessToken)

  // global error handler that will redirect user to error page of any error code
  // now only 404, 500
  $axios.onError(err => {
    if (err.response) {
      const { status } = err.response
      let errorObject = null

      switch (status) {
        // api sends back 404 on various endpoints if resource is absent
        // case 404:
        //   errorObject = { statusCode: 404, message: `The page you're looking for has moved or doesn't exist.` }
        //   break
        case 500:
          errorObject = { statusCode: 500, message: `Something terrible happened` }
          break
        default:
          break
      }

      if (errorObject) {
        return error(errorObject)
      }
    }
  })
}
