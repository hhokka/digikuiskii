import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthData {
  constructor() { }
  user = firebase.auth().currentUser;
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref('/userProfile')
          .child(newUser.uid)
          .set({ email: email });
      });
  }
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  resetPassword(email: string): Promise<void> {

    return firebase.auth().sendPasswordResetEmail(email);
  }

  sendConfirmationEmail(): Promise<void> {
    return firebase.auth().currentUser.sendEmailVerification();
  }
}