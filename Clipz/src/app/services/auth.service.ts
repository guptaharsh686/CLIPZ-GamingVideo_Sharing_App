import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, delay, map, filter, switchMap,of } from 'rxjs';
import IUser from 'src/app/Models/user.model';
import { ActivatedRoute,NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
   //$ is special naming convention for identifying properties as observables.
   public isAuthenticated$ : Observable<boolean>

   public isAuthenticatedWithDelay$ : Observable<boolean>

   private usersCollection : AngularFirestoreCollection<IUser>;
   
   private redirect = false;
  constructor(
    private auth : AngularFireAuth,
    private db : AngularFirestore,
    private router : Router,
    private routeInfo : ActivatedRoute
  ) {
    this.usersCollection = db.collection('users');
    //routeInfo.data.subscribe(console.log);
    //auth.user.subscribe(console.log);
    //use user observable provided by authentication service to verify if user is logged in
    //if user obj is emitted by user observable then user is logged in if null is emitted then user is not logged in.
    this.isAuthenticated$ =  auth.user.pipe(
      map((user) => !!user)
      )

      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
        delay(1000)
      )

      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => this.routeInfo.firstChild),
        switchMap(route => route?.data ?? of({
          authOnly : null
        }))
      ).subscribe(data => {
        this.redirect = data?.authOnly ?? false 
      });
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

  public async logout($event? : Event){
    if($event){
      $event.preventDefault();
    }
    //clear credintials from storage and revoke the token
    await this.auth.signOut();

    //as method returns a promice we have to await it
    if(this.redirect){
      await this.router.navigateByUrl('/');
    }
  }

}
