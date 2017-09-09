import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage({
  name:'about',
  segment: 'about'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

}
