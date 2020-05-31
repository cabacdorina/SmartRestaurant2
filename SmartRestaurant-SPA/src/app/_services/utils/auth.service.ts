import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

baseUrl = environment.apiUrl + 'auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;
public role: string;

constructor(private http: HttpClient, 
  private alertify: AlertifyService) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          if(user.token === null){
            this.alertify.error("Wrong credientials");
            return;
          } 
          localStorage.setItem('token', user.token );
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.role = this.decodedToken.role;
          //debugger;
        }
      }),
    );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
