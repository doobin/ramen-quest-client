class Helper {
  static baseURL () {
    return 'https://api.foursquare.com/v2'
  }
  static auth () {
    const keys = {
      client_id: 'ASLYIZHTA5Z5SADLWBU43CQP2Z0BYTHCZAROGCBN33GQMLZY',
      client_secret: 'LK1GTRKH2YCXSEXWKOF5OMSVVUJCXPEOA2APJMUHLDDDWIE0',
      v: '20181203'
    }
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join('&')
  }
  static urlBuilder (urlParams) {
    if (!urlParams) {
      return ''
    }
    return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join('&')
  }
  static headers () {
    return {
      Accept: 'application/json'
    }
  }
  static simpleFetch (endPoint, method, urlParams) {
    const requestData = {
      method,
      headers: Helper.headers()
    }
    return fetch(
      `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
        urlParams
      )}`,
      requestData
    ).then(res => res.json())
  }
}

export default class FourSquareAPI {
  static search(urlParams) {
    return Helper.simpleFetch('/venues/search', 'GET', urlParams)
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET')
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET')
  }
}
