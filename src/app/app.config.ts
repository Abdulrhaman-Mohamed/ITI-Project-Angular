import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './Modules/Core/interceptors/token.interceptor';
import { loadingScreenInterceptor } from './Modules/Core/interceptors/loading-screen.interceptor';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

const firebaseConfig = {
  apiKey: "AIzaSyBtS81n7q_QtyMf-uW6AtMOYOLN_z4HOTc",
  authDomain: "angularcloudfiles.firebaseapp.com",
  projectId: "angularcloudfiles",
  storageBucket: "angularcloudfiles.appspot.com",
  messagingSenderId: "773269212616",
  appId: "1:773269212616:web:8f85ddca6c3400ff8b84fd"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([tokenInterceptor, loadingScreenInterceptor])),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
    ]),
  ],


};
