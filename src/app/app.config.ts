import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: environment.apiKey,
        authDomain: environment.authDomain,
        databaseURL: environment.databaseURL,
        storageBucket: environment.storageBucket,
        messagingSenderId: environment.messagingSenderId,
        appId: environment.appId,
      })
    ),
    provideDatabase(() => getDatabase()),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
