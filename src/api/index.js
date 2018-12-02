class Helper {
  static baseURL () {
    return 'https://api.foursquare.com/v2'
  }
  static auth () {
    const keys = {
      client_id: 'U1Z34304NXNVX31JVECPBURMDKUZURX0F3OJ2WHVWD5BBAIA',
      client_secret: 'TUYU1PBW0JXW3NKADZD0VDNRGKSHIX5QXA2RETWZYNBGTXV1',
      v: '20181202'
    }
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join('&')
  }
  static urlBuilder (urlParams) {
    if (!urlParams) {
      return ''
    }
    return Oject.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join('&')
  }
  static headers () {
    return {
      Accept: 'application/json'
    }
  }
  static simpleFetch (endPoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    }
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth}&${Helper.urlBuilder(
      urlParams
    )}`,
    requestData
    ).then(res => res.json())
  }
}
