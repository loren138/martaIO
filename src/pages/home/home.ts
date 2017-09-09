import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trains: any;

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get("http://marta-api.herokuapp.com/arrivals?" + (new Date()).getTime()).map(res => res.json()).subscribe(data => {
      console.log(data);
      this.trains = data.data.children;
    });

  }

}