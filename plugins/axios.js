export default ({ $axios, error }) => {
  $axios.onError(err => {
    if (err.response) {
      const { status } = err.response
      let errorObject = null

      switch (status) {
        case 404:
          errorObject = { statusCode: 404, message: `The page you're looking for has moved or doesn't exist.` }
          break
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
