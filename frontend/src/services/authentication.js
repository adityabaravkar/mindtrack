export class Authentication {
  static setAuthData(userid, token, type) {
    localStorage.setItem("userId", userid);
    localStorage.setItem("token", token);
    localStorage.setItem("accountType", type);
  }

  static setUserDetails(data) {
    localStorage.setItem("userDetail", JSON.stringify(data));
  }

  static get getUserDetails() {
    return localStorage.getItem("userDetail");
  }
  static get token() {
    return localStorage.getItem("token");
  }

  static get bearerToken() {
    return "Bearer " + localStorage.getItem("token");
  }
  static get userId() {
    return localStorage.getItem("userId");
  }

  static get accountType() {
    return localStorage.getItem("accountType");
  }

  static isUserLoggedIn() {
    return this.token && this.userId && this.accountType;
  }

  static isUserLoggedIntoPatientMode() {
    return this.token && this.userId && this.accountType === "patient";
  }

  static isUserLoggedIntoTherapistMode() {
    return this.token && this.userId && this.accountType === "therapist";
  }

  static logout() {
    localStorage.clear();
  }
}
