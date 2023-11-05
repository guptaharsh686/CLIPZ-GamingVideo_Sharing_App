import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import IUser from 'src/app/Models/user.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
   //$ is special naming convention for identifying properties as observables.
   public isAuthenticated$ : Observable<boolean>

   private usersCollection : AngularFirestoreCollection<IUser>;
   
  constructor(
    private auth : AngularFireAuth,
    private db : AngularFirestore
  ) {
    this.usersCollection = db.collection('users');

    //auth.user.subscribe(console.log);
    //use user observable provided by authentication service to verify if user is logged in
    //if user obj is emitted by user observable then user is logged in if null is emitted then user is not logged in.
    this.isAuthenticated$ =  auth.user.pipe(
      map((user) => !!user)
      )
  }

  public async createUser(userData : IUser){

    if(!userData.password){
      throw new Error("Password not provided!");
    }

    const userCredential = await this.auth.createUserWithEmailAndPassword(userData.email,userData.password);
      // console.log(userCredential);
      //returns promise
      if(!userCredential.user){
        throw new Error("User can't be found");
      }
      await this.usersCollection.doc(userCredential.user.uid).set({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phoneNumber : userData.phoneNumber
      })

      await userCredential.user.updateProfile({
        displayName: userData.name
      })
  }

}
