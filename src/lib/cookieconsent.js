import 'cookieconsent/build/cookieconsent.min.css'

if (typeof window !== `undefined`) {
  // Import non server side rendering cookieconsent
  import('cookieconsent').then(() => {
    const cookieIds = () => {
      return document.cookie
        ? document.cookie.split(';').map(c => c.split('=', 1)[0].trim())
        : []
    }

    const enable = () => {
      window.isCookies = true
      // Google analytics
      window['ga-disable-UA-XXXXX-Y'] = false
    }

    const disable = () => {
      window.isCookies = false
      // Google analytics
      window['ga-disable-UA-XXXXX-Y'] = true
      // Delete cookies
      cookieIds().forEach(id => {
        if (id !== 'cookieconsent_status') {
          document.cookie = `${id}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        }
      })
    }

    const statusChange = (type, didConsent) => {
      if (type === 'opt-in' && didConsent) enable()
      if (type === 'opt-out' && !didConsent) disable()
    }

    window.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#000'
        },
        button: {
          background: 'transparent',
          text: '#fff',
          border: '#535353'
        }
      },
      position: 'bottom-left',
      type: 'opt-out',
      content: {
        message:
          "Nous utilisons des cookies afin d'améliorer votre expérience sur le site et ainsi vous proposer un contenu adapté à vos besoins.",
        link: 'En savoir plus',
        href: '/mentions-legales/#cookiepolicy',
        dismiss: 'Fermer',
        deny: 'Refuser',
        allow: 'Accepter'
      },
      onInitialise (status) {
        statusChange(this.options.type, this.hasConsented())
      },
      onStatusChange (status, chosenBefore) {
        statusChange(this.options.type, this.hasConsented())
      },
      onRevokeChoice () {
        const type = this.options.type
        if (type === 'opt-in') disable()
        if (type === 'opt-out') enable()
      }
    })
  })
}
