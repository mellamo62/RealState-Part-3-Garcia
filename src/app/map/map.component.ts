import {Component, inject, OnInit} from '@angular/core';
import {MapService} from "../map.service";
import * as L from "leaflet";
import {marker} from "leaflet";
import {HousingLocation} from "../housinglocation";
import {ActivatedRoute} from "@angular/router";
import {HousingService} from "../housing.service";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  template: `
    <section>
      <button (click)="usuarioLocation()">Ver posicion usuario</button>
      <button (click)="casa()">Volver posicion casa</button>
        <div id="map"></div>
      <div>
        <img src="{{icon}}" alt="imagen"><br>
        <a>Ciudad: {{name}}</a><br>
        <a>Region: {{region}}</a><br>
        <a>Pais: {{country}}</a><br>
        <a>Temperatura: {{tempC}}</a><br>
        <a>Velocidad del viento: {{windV}}</a><br>
        <a>Direccion del viento: {{windDir}}</a>
      </div>
    </section>`,
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{

  url:string="";
  geo:any;
  map:any;
  name:string="";
  region:string="";
  country:string="";
  tempC:string="";
  lastUpdated:string="";
  windV:string="";
  windDir:string="";
  icon:string="";

  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocation: HousingLocation|undefined;
  housingService= inject(HousingService);

  constructor( private placeSvc:MapService) {
    const housinLocationId = parseInt(this.route.snapshot.params['id'],10);
    this.housingService?.getHousingLocationById(housinLocationId).then(housinLocation=>{
      this.housingLocation=housinLocation;
    })
    setTimeout(()=>{
      this.placeSvc.getUserLocation();
      this.geo=this.placeSvc.useLocation;
    },1000)

  }

  ngOnInit() {

    setTimeout(()=>{
      this.url=`https://api.weatherapi.com/v1/current.json?key=2a1c31c85d4249f4968114544241702&q=${<number>this.housingLocation?.coordinates.latitude}, ${<number>this.housingLocation?.coordinates.longitude}&aqi=no`;
      fetch(this.url)
        .then((response)=>response.json())
        .then((data)=>{

        this.name= data.location.name;
        this.region=data.location.region;
        this.country=data.location.country;
        this.tempC=data.current.temp_c;
        this.lastUpdated=data.lastUpdated;
        this.windV=data.current.wind_kph;
        this.windDir=data.current.wind_dir;
        this.icon=data.current.condition.icon;

        })
        .catch((error)=>console.log(error))
    },1000)


  }

  ngAfterViewInit(){
    setTimeout(()=>{


      this.map = new L.Map('map').setView([<number>this.housingLocation?.coordinates.longitude,<number> this.housingLocation?.coordinates.latitude],13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    },1000);
  }



  casa(){
    setTimeout(()=>{

      this.map.remove();
      this.map = new L.Map('map').setView([<number>this.housingLocation?.coordinates.longitude,<number> this.housingLocation?.coordinates.latitude],13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      marker([<number>this.housingLocation?.coordinates.longitude, <number>this.housingLocation?.coordinates.latitude]).addTo(this.map).bindPopup("<strong>Casa</strong>").openPopup();
    },1000);

  }

  usuarioLocation(){

    this.map.remove();
    this.map = new L.Map('map').setView(this.geo,13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    marker(this.geo).addTo(this.map).bindPopup("<strong>Casa</strong>").openPopup();

  }

}
