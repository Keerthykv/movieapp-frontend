import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { constants } from '../shared/constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  user = new BehaviorSubject<{ user: User } | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.autoLogin();
  }

  login(loginCredentials: { loginId: any; password: any }) {
    return this.http
      .post<{ user: User }>(constants.MOVIE_API_SERVICE_URL + '/login', loginCredentials)
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.storeUser(response.user);
          this.user.next(response);
        })
      );
  }

  signup(signupCredentials: {
    firstName: any;
    lastName: any;
    email: any;
    loginId: any;
    password: any;
    confirmPassword: any;
    contactNumber: any;
  }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    return this.http
      .post<{ user: User }>(
        constants.MOVIE_API_SERVICE_URL + '/register',
        signupCredentials, { headers, responseType: 'text' as 'json' }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.storeUser(response.user);
          this.user.next(response);
          this.router.navigate(['/home']);
        })
      );
  }

  

  forgotPassword(
    username: any,
    forgotPasswordRequest: {
      email: any
      newPassword: any;
    }
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    return this.http
      .post<{ user: User }>(
        `${constants.MOVIE_API_SERVICE_URL}/${username}/forgot`, forgotPasswordRequest, { headers, responseType: 'text' as 'json' }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.router.navigate(['/login']);
        })
      );
  }

  autoLogin() {
    const user = localStorage.getItem('authData');
    if (user) {
      const parsedUser: User = JSON.parse(user);
      if (parsedUser.loginId) {
        this.user.next({ user: parsedUser });
      }
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['./login']);
    this.removeUser();
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }

  private storeUser(user: User) {
    localStorage.setItem('authData', JSON.stringify(user));
  }

  private removeUser() {
    localStorage.removeItem('authData');
  }
}
