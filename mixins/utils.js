import pinnacleLogo from '~/assets/images/bookmakers/pinnacle-logo.jpeg'

export default {
  methods: {
    getBookmakerLogo (bookmaker) {
      try {
        let url = null

        switch (bookmaker) {
          case 'pinnacle':
            url = pinnacleLogo
            break
        }

        return url
      } catch (error) {
        return error
      }
    }
  }
}
