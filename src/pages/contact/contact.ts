import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {}

  pushHome(){
    this.navCtrl.push('HomePage');
  }

  pushAbout(){
    this.navCtrl.push('AboutPage');
  }

  pushContact(){
    this.navCtrl.push('ContactPage');
  }

}
