import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from 'src/app/Models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth : AngularFireAuth,
    private db : AngularFirestore
  ) {
    this.usersCollection = db.collection('users');
   }

  private usersCollection : AngularFirestoreCollection<IUser>

  public async createUser(userData : IUser){

    if(!userData.password){
      throw new Error("Password not provided!");
    }

    const userCredential = await this.auth.createUserWithEmailAndPassword(userData.email,userData.password);
      // console.log(userCredential);
      //returns promise
      await this.usersCollection.add({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phoneNumber : userData.phoneNumber
      })

  }

}
