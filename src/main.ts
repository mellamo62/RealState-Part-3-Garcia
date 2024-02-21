import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';

if(!navigator.geolocation){
  alert("el navegador no soporta la geolocalizacion");
  throw new Error("el navegador no soporta la geolocalizacion")
}
bootstrapApplication(AppComponent, {
  providers:[
    provideProtractorTestingSupport(),
    provideRouter(routeConfig)
  ]
})
  .catch((err) => console.error(err));
