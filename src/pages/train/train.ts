import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TrainService} from '../../app/trainService';
import {Events} from 'ionic-angular';

/**
 * Generated class for the StationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'train/:trainId',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-train',
  templateUrl: 'train.html'
})
export class TrainPage {

  trainId: string;
  refresher: any;
  arrivals: any;
  trainsError: boolean;
  emptyResponse: boolean;
  loading: any;
  error: any;
  connectionProblem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public trainService: TrainService) {
    this.trainId = this.navParams.get('trainId');
    this.refresher = null;
    this.trainsError = false;
    this.emptyResponse = false;
    this.loading = true;
    this.connectionProblem = false;
    this.refresher = null;
    this.loadTrains(false);
    events.subscribe('trains:updated', () => {
      this.loadTrains(true);
    });
    events.subscribe('trains:error', () => {
      if (this.refresher !== null) {
        this.refresher.cancel();
        this.refresher = null;
      }
      // On error go home to show the message
      this.navCtrl.push('HomePage');
    });
  }

  private loadTrains(trainsUpdated) {
    this.emptyResponse = (this.trainService.getTrains().length === 0);
    if (this.emptyResponse && !trainsUpdated) {
      // This is the initial app load so don't clear the loader
      return;
    }
    this.arrivals = this.trainService.find('train_id', this.trainId);
    if (this.refresher !== null) {
      this.refresher.complete();
      this.refresher = null;
    }
    this.loading = false;
    this.trainsError = false;
    this.connectionProblem = false;
  }

  timeboxClass(arrival) {
    return TrainService.timeboxClass(arrival);
  }

  reloadTrains(refresher) {
    this.refresher = refresher;
    this.trainService.loadTrains();
  }

  /*ionViewDidLoad() {
   console.log('ionViewDidLoad StationPage');
   }*/

}
