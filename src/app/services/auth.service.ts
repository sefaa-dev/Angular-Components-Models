import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = "AIzaSyC43d59Hr6zxVDyulVBXALmmrR_zTYotqY";
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  register(email: string, password: string){

    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
      email : email,
      password : password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime() + (+response.expiresIn *1000))
        const user = new User(
          response.email,
          response.localId,
          response.idToken,
          expirationDate
        );
          this.user.next(user);
      }),
      catchError(this.handleError)
    );

  }
  
  login(email: string, password: string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
    email : email,
    password : password,
    returnSecureToken: true
  }).pipe(
    tap(response => {
      const expirationDate = new Date(new Date().getTime() + (+response.expiresIn *1000))
      const user = new User(
        response.email,
        response.localId,
        response.idToken,
        expirationDate
      );
      this.user.next(user);
    }),
    catchError(this.handleError)
  );
  }

  private handleError(err: HttpErrorResponse){
    let message = "hata oluştu";

    if(err.error.error){
      switch(err.error.error.message){
        case "EMAIL_EXISTS":
          message = "bu mail adresi zaten kullanılıyor.";
          break;

        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "bir süre bekleyip tekrar deneyiniz.";
          break;

        case "EMAIL_NOT_FOUND":
          message = "email adresi bulunamadı";
          break;
        case "INVALID_PASSWORD":
          message = "hatalı parola";
          break;
      }
    }

    return throwError(() => message);
  }
   
}
