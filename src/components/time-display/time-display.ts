import {Component, Input, OnInit} from '@angular/core';
import {TrainService} from "../../app/trainService";

/**
 * Generated class for the TimeDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'time-display',
  templateUrl: 'time-display.html'
})
export class TimeDisplayComponent implements OnInit {

  @Input() arrival;

  constructor() {
    //console.log('Hello TimeDisplayComponent Component');
  }

  timeboxClass(arrival) {
    return TrainService.timeboxClass(arrival);
  }

  parseInt(number) {
    return parseInt(number);
  }
  ngOnInit() {}

}
