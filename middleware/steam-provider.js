module.exports = function (req, res, next) {
  // req is the Node.js http request object
  // const Issuer = require('openid-client').Issuer
  // Issuer.discover('https://accounts.google.com') // => Promise
  //   .then(function (googleIssuer) {
  //     console.log('Discovered issuer %s', googleIssuer)
  //   })

  // res is the Node.js http response object

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  next()
}
