import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private auth:AngularFireAuth){

  }

  inLoginProcess = false;
  alertColor = 'blue';
  showAlert = false;
  alertMessage = 'please wait you are being logged-in!' 

  credentials = {
    email : '',
    password: ''
  }

  async login(){
    //console.log(this.credentials);
    this.alertColor = 'blue';
    this.alertMessage = 'please wait you are being logged-in!';
    this.showAlert=true;
    this.inLoginProcess = true;
    try{
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      )
    }catch(e){
      console.log(e);
      this.inLoginProcess = false
      this.alertColor = 'red';
      this.alertMessage = 'Invalid credentials';
      this.inLoginProcess = false;
      return
    }

    this.alertMessage = 'Sucess! You are now logged in';
    this.alertColor = 'green';

  }

}
