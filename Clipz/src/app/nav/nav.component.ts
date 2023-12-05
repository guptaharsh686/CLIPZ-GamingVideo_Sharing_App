import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    public modal : ModalService, 
    public auth: AuthService,
    public afAuth : AngularFireAuth,
    public router : Router
    ){
  }

  openModal($event : Event){
    $event.preventDefault();
    this.modal.toggleModal('auth');

  }

  async Logout($event : Event){
    $event.preventDefault();
    //clear credintials from storage and revoke the token
    await this.afAuth.signOut();

    //as method returns a promice we have to await it
    await this.router.navigateByUrl('/');
  }

}
