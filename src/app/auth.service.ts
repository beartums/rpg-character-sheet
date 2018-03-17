import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
	userData: any;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
		this.user.subscribe(user => 
			this.userData = user 
		);
  }

  signupWithEmail(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  loginWithEmail(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  loginWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(value => {
        console.log(value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  logout() {
    this.firebaseAuth.auth.signOut();
  }

}