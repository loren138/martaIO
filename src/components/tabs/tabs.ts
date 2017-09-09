import { Component } from '@angular/core';
import {NavController} from "ionic-angular";

/**
 * Generated class for the TabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  constructor(public navCtrl: NavController) {
  }


  pushHome(){
    this.navCtrl.setRoot('HomePage');
    //this.navCtrl.popToRoot();
  }

  pushTwitter(){
    this.navCtrl.push('TwitterPage');
  }

  pushHelp(){
    this.navCtrl.push('HelpPage');
  }
}
