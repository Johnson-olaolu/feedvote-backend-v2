import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
// import { firebaseAdminConfig } from 'src/config/firebase.config';

@Injectable()
export class FirebaseApp {
  private firebaseApp: firebase.app.App;

  constructor(private configService: ConfigService) {
    this.firebaseApp = firebase.initializeApp({
      credential: applicationDefault(),
      databaseURL: this.configService.get('FIREBASE_DATABASE_URL'),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };

  firestore = (): firebase.firestore.Firestore => {
    return this.firebaseApp.firestore();
  };

  db = (): firebase.database.Database => {
    return this.firebaseApp.database();
  };
}
