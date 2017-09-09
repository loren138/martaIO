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

  readonly homePage = 'HomePage';
  readonly twitterPage = 'TwitterPage';
  readonly helpPage = 'HelpPage';

  constructor(public navCtrl: NavController) {
  }

  isHome() {
    console.log(this.navCtrl.getActive().name);
    return this.navCtrl.getActive().name === this.homePage ? 'secondary': 'light';
  }

  isTwitter() {
    return this.navCtrl.getActive().name === this.twitterPage ? '': 'light';
  }


  isHelp() {
    return this.navCtrl.getActive().name === this.helpPage ? 'danger': 'light';
  }


  pushHome(){
    this.navCtrl.setRoot(this.homePage, {}, {'animation': 'ios-transition', 'animate':true});
    //this.navCtrl.popToRoot();
  }

  pushTwitter(){
    this.navCtrl.push(this.twitterPage);
  }

  pushHelp(){
    this.navCtrl.push(this.helpPage);
  }
}
