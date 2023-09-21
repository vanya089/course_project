


export class TokenService {

  static getToken(token: string) {

    return `Bearer ${localStorage.getItem("token")}`
  }



  static deleteToken() {
    localStorage.removeItem("token")
  }



}

