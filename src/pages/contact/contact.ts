import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

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
