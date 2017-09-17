import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TrainService} from '../../app/trainService';
import {Events} from 'ionic-angular';

/**
 * Generated class for the StationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    segment: 'station/:stationName',
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-station',
    templateUrl: 'station.html'
})
export class StationPage {

    stationName: string;
    refresher: any;
    arrivals: any;
    trainsError: boolean;
    emptyResponse: boolean;
    loading: any;
    error: any;
    connectionProblem: any;
    subUpdated: any;
    subError: any;
    currentPage: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public trainService: TrainService) {
        this.stationName = this.navParams.get('stationName') + " station";
        this.refresher = null;
        this.trainsError = false;
        this.emptyResponse = false;
        this.loading = true;
        this.connectionProblem = false;
        this.refresher = null;
        this.currentPage = true;
        this.loadTrains(false);
        this.subUpdated = () => {
            this.loadTrains(true);
        };
        events.subscribe('trains:updated', this.subUpdated);
        this.subError = () => {
            if (this.refresher !== null) {
                this.refresher.cancel();
                this.refresher = null;
            }
            if (this.currentPage) {
                this.navCtrl.setRoot('HomePage', {}, {'animation': 'ios-transition', 'animate': true});
            }
        };
        events.subscribe('trains:error', this.subError);
    }


    ionViewWillEnter() {
        this.currentPage = true;
    }

    ionViewWillLeave() {
        this.currentPage = false;
    }

    ionViewWillUnload() {
        if (this.subUpdated) {
            this.events.unsubscribe('trains:updated', this.subUpdated);
            this.subUpdated = undefined;
        }
        if (this.subError) {
            this.events.unsubscribe('trains:error', this.subError);
            this.subError = undefined;
        }
    }

    private loadTrains(trainsUpdated) {
        this.emptyResponse = (this.trainService.getTrains().length === 0);
        if (this.emptyResponse && !trainsUpdated) {
            // This is the initial app load so don't clear the loader
            return;
        }
        this.arrivals = this.trainService.find('station', this.stationName);
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

    trainView(trainId) {
        this.navCtrl.push('TrainPage', {
            'trainId': trainId
        });
    }

    home() {
        this.navCtrl.setRoot('HomePage', {}, {'animation': 'ios-transition', 'animate': true});
    }

}
