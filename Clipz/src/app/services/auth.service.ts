import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from 'src/app/Models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth : AngularFireAuth,
    private db : AngularFirestore
  ) { }

  public async createUser(userData : IUser){

    const userCredential = await this.auth.createUserWithEmailAndPassword(userData.email,userData.password);
      // console.log(userCredential);
      //returns promise
      await this.db.collection('users').add({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phoneNumber : userData.phoneNumber
      })

  }

}
