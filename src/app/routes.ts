import { Routes} from "@angular/router";
import { HomeComponent} from "./home/home.component";
import { DetailsComponent} from "./details/details.component";
import {LoginComponent} from "./login/login.component";
import {MapComponent} from "./map/map.component";

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  {
    path:'login',
    component: LoginComponent,
    title:'Login'
  },
  {
    path:'map/:id',
    component:MapComponent,
    title:'Map'
  }
];

export default routeConfig;
