import { type JwtPayload, jwtDecode } from 'jwt-decode';

interface ExtendedJwt extends JwtPayload {
  data:{
    username:string,
    email:string,
    _id:string
  }
};

class AuthService {
  getProfile() {
    return jwtDecode<ExtendedJwt>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string, bookIds: string[]) {
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('saved_books', JSON.stringify([...bookIds]))
    // window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('saved_books')
    window.location.assign('/');
  }
}

export default new AuthService();