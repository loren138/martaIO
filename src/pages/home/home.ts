import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TrainService} from '../../app/trainService';
import {Events} from 'ionic-angular';
import {Location} from '../../app/location';
import {Favorites} from '../../app/favorites';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
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
    userLocation: any;

    constructor(public navCtrl: NavController, public trainService: TrainService, public events: Events,
                public location: Location, public favorites: Favorites) {
        this.trainsError = false;
        this.emptyResponse = false;
        this.loading = true;
        this.favs = false;
        this.nearbyStations = false;
        this.connectionProblem = false;
        this.refresher = null;
        this.userLocation = this.location.getLocation();
        this.loadTrains(false);
        events.subscribe('trains:updated', () => {
            this.loadTrains(true);
        });
        events.subscribe('location:updated', () => {
            this.userLocation = this.location.getLocation();
            this.reloadData();
        });
        events.subscribe('favorites:updated', () => {
            this.reloadData();
        });
        events.subscribe('trains:error', () => {
            if (this.refresher !== null) {
                this.refresher.cancel();
                this.refresher = null;
            }
            this.error = this.trainService.getError();
            this.connectionProblem = (this.error.status === 0);
            this.trainsError = true;
            this.loading = false;
            this.emptyResponse = false;
        });
    }

    private loadTrains(trainsUpdated) {
        this.arrivals = this.trainService.latestByStation();
        if (this.trainService.getTrains().length === 0) {
            // No trains
            if (!trainsUpdated) {
                // This is the initial app load so don't clear the loader
                return;
            }
            this.emptyResponse = true;
        }
        if (this.refresher !== null) {
            this.refresher.complete();
            this.refresher = null;
        }
        this.loading = false;

        this.reloadData();
        this.trainsError = false;
        this.connectionProblem = false;
    }

    private reloadData() {
        if (this.userLocation) {
            this.nearbyStations = this.trainService.closestTo(this.userLocation, this.arrivals);
        }
        this.favs = this.favorites.intersection(this.arrivals);
    }

    reloadTrains(refresher) {
        this.refresher = refresher;
        this.trainService.loadTrains();
    }

    stationView(stationName) {
        this.navCtrl.push('StationPage', {
            'stationName': stationName
        })
    }

    toggleFavorite(stationName, slidingItem) {
        this.favorites.toggle(stationName);
        slidingItem.close();
    }

    objectKeys(o) {
        if (o !== null && typeof o === 'object') {
            return Object.keys(o);
        } else {
            return null;
        }
    };

}