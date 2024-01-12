import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode : boolean = true;

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
    
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){
      console.log("login mode ...");
    }else{
      this.authService.register(email, password).subscribe(response => {
        console.log(response);
      })
    }
  }

}
