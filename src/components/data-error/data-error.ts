import { Component } from '@angular/core';
import {TrainService} from "../../app/trainService";
import {Events} from "ionic-angular";

/**
 * Generated class for the DataErrorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'data-error',
  templateUrl: 'data-error.html'
})
export class DataErrorComponent {

  trainsError: boolean;
  emptyResponse: boolean;
  error: any;
  connectionProblem: any;
  subTUpdated: any;
  subError: any;

  constructor(public trainService: TrainService, public events: Events) {
    this.trainsError = false;
    this.emptyResponse = false;
    this.connectionProblem = false;

    this.subTUpdated = () => {
      this.emptyResponse = (this.trainService.getTrains().length === 0);
      this.trainsError = false;
      this.connectionProblem = false;
    };
    events.subscribe('trains:updated', this.subTUpdated);
    this.subError = () => {
      this.error = this.trainService.getError();
      this.connectionProblem = (this.error.status === 0);
      this.trainsError = true;
    };
    events.subscribe('trains:error', this.subError);
  }

  ionViewWillUnload() {
    if (this.subTUpdated) {
      this.events.unsubscribe('trains:updated', this.subTUpdated);
      this.subTUpdated = undefined;
    }
    if (this.subError) {
      this.events.unsubscribe('trains:error', this.subError);
      this.subError = undefined;
    }
  }
}
