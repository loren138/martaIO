import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {}


  pushHome(){
    this.navCtrl.setRoot('HomePage');
    this.navCtrl.popToRoot();
  }

  pushAbout(){
    this.navCtrl.push('AboutPage');
  }

  pushContact(){
    this.navCtrl.push('ContactPage');
  }

}
