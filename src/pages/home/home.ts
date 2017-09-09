import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TrainService} from '../../app/trainService';
import { Events } from 'ionic-angular';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trains: any;

  constructor(public navCtrl: NavController, public trainService: TrainService, public events: Events) {

      events.subscribe('trains:updated', () => {
          this.trains = trainService.getTrains();
      });
  }

}