import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { ThisReceiver } from '@angular/compiler';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode : boolean = true;
  loading: boolean = false;
  error: string =" ";  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  toogleModel(){
    this.isLoginMode = !this.isLoginMode;
  }

  handleAuth(form: NgForm){
    if(!form.valid){
      return;
    }

    this.loading = true;
    
    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<AuthResponse>;

    if(this.isLoginMode){
      authResponse = this.authService.login(email, password);
      
    }else{
      authResponse = this.authService.register(email, password);
    };

    authResponse.subscribe({
      next: (response) => {
        this.loading = false;
        this.error = " ";
      },

      error: (err) => {
        this.loading = false;
        this.error = err;

      }
    });
  }

}
