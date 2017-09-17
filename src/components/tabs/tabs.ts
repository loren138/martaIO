import { Component } from '@angular/core';
import {Events, NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import {TwitterPage} from "../../pages/twitter/twitter";
import {HelpPage} from "../../pages/help/help";

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
  goingHome = false;
  sub: any;

  constructor(public navCtrl: NavController, public events: Events) {
  }

  isHome() {
    return this.navCtrl.getActive().instance instanceof HomePage ? 'secondary': 'light';
  }

  isTwitter() {
    return this.navCtrl.getActive().instance instanceof TwitterPage ? '': 'light';
  }


  isHelp() {
    return this.navCtrl.getActive().instance instanceof HelpPage ? 'danger': 'light';
  }


  pushHome(){
    if (!(this.navCtrl.getActive().instance instanceof HomePage)) {
      this.navCtrl.setRoot(this.homePage, {}, {'animation': 'ios-transition', 'animate': true});
    }
  }

  pushTwitter(){
    if (!(this.navCtrl.getActive().instance instanceof TwitterPage)) {
      this.navCtrl.push(this.twitterPage);
    }
  }

  pushHelp(){
    if (!(this.navCtrl.getActive().instance instanceof HelpPage)) {
      this.navCtrl.push(this.helpPage);
    }
  }
}
