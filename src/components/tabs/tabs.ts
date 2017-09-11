import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
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

  constructor(public navCtrl: NavController) {
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
