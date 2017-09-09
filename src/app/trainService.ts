import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';

@Injectable()
export class TrainService {

    trains: any;

    constructor(public http: Http, public events: Events) {
        this.loadTrains();
    }

    loadTrains() {
        this.http.get("http://marta-api.herokuapp.com/arrivals?" + (new Date()).getTime()).map(res => res.json()).subscribe(
            data => {
                console.log(data);
                this.trains = data;
                this.events.publish('trains:updated');
            },
            err => {
                console.log("Oops!");
            });
    }

    getTrains() {
        return this.trains;
    }

}