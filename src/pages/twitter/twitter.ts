import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'twitter.html'
})
export class TwitterPage {

  constructor(public navCtrl: NavController) {}


  pushHome(){
    this.navCtrl.setRoot('HomePage');
    this.navCtrl.popToRoot();
  }

  pushTwitter(){
    this.navCtrl.push('TwitterPage');
  }

  pushHelp(){
    this.navCtrl.push('HelpPage');
  }

}
