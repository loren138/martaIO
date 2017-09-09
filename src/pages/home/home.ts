import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TrainService} from '../../app/trainService';
import {Events} from 'ionic-angular';
import {Location} from '../../app/location';
import {Favorites} from '../../app/favorites';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    arrivals: any;
    trainsError: boolean;
    emptyResponse: boolean;
    refresher: any;
    loading: any;
    error: any;
    favs: any;
    nearbyStations: any;
    connectionProblem: any;

    constructor(public navCtrl: NavController, public trainService: TrainService, public events: Events,
                public location: Location, public favorites: Favorites) {
        this.trainsError = false;
        this.emptyResponse = false;
        this.loading = true;
        this.favs = false;
        this.nearbyStations = false;
        this.connectionProblem = false;
        this.refresher = null;
        events.subscribe('trains:updated', () => {
            if (this.refresher !== null) {
                this.refresher.complete();
                this.refresher = null;
            }
            this.loading = false;

            this.arrivals = trainService.latestByStation();
            this.favs = favorites.intersection(this.arrivals);
            if (this.arrivals.length === 0) {
                this.emptyResponse = true;
            } else {
                this.emptyResponse = false;
            }
            this.trainsError = false;
            this.connectionProblem = false;
        });
        events.subscribe('location:updated', () => {
            let userLocation = location.getLocation();
        });
        events.subscribe('trains:error', () => {
            if (this.refresher !== null) {
                this.refresher.cancel();
                this.refresher = null;
            }
            this.error = trainService.getError();
            if (this.error.status === 0) {
                this.connectionProblem = true;
            } else {
                this.connectionProblem = false;
            }
            this.trainsError = true;
            this.loading = false;
            this.emptyResponse = false;
        });


    }

    reloadTrains(refresher) {
        this.refresher = refresher;
        this.trainService.loadTrains();
    }

    stationView(stationName) {
        console.log(stationName);
    }

    toggleFavorite(stationName) {
        this.favorites.toggle(stationName);
    }

    objectKeys(o) {
        if (o !== null && typeof o === 'object') {
            return Object.keys(o);
        } else {
            return false;
        }
    };

    ionViewWillEnter() {
        this.navCtrl.popToRoot()
    }

    pushHome(){
        this.navCtrl.popToRoot();
    }

    pushAbout(){
        this.navCtrl.push('AboutPage');
    }

    pushContact(){
        this.navCtrl.push('ContactPage');
    }

}