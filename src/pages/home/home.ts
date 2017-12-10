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
    refresher: any;
    loading: any;
    favs: any;
    nearbyStations: any;
    userLocation: any;
    subTUpdated: any;
    subFUpdated: any;
    subLUpdated: any;
    subError: any;

    constructor(public navCtrl: NavController, public trainService: TrainService, public events: Events,
                public location: Location, public favorites: Favorites) {
        this.loading = true;
        this.favs = false;
        this.nearbyStations = false;
        this.refresher = null;
        this.userLocation = this.location.getLocation();
        this.loadTrains(false);

        this.subTUpdated = () => {
            this.loadTrains(true);
        };
        events.subscribe('trains:updated', this.subTUpdated);
        this.subError = () => {
            if (this.refresher !== null) {
                this.refresher.cancel();
                this.refresher = null;
            }
            this.loading = false;
            this.arrivals = [];
            this.nearbyStations = false;
            this.favs = false;
        };
        events.subscribe('trains:error', this.subError);
        this.subLUpdated = () => {
            this.userLocation = this.location.getLocation();
            this.reloadData();
        };
        events.subscribe('location:updated', this.subLUpdated);
        this.subFUpdated = () => {
            this.reloadData();
        };
        events.subscribe('favorites:updated', this.subFUpdated);
    }

    ionViewWillUnload() {
        if (this.subTUpdated) {
            this.events.unsubscribe('trains:updated', this.subTUpdated);
            this.subTUpdated = undefined;
        }
        if (this.subFUpdated) {
            this.events.unsubscribe('trains:updated', this.subFUpdated);
            this.subFUpdated = undefined;
        }
        if (this.subLUpdated) {
            this.events.unsubscribe('trains:updated', this.subLUpdated);
            this.subLUpdated = undefined;
        }
        if (this.subError) {
            this.events.unsubscribe('trains:error', this.subError);
            this.subError = undefined;
        }
    }

    private loadTrains(trainsUpdated) {
        this.arrivals = this.trainService.latestByStation();
        if (this.trainService.getTrains().length === 0) {
            // No trains
            if (!trainsUpdated) {
                // This is the initial app load so don't clear the loader
                return;
            }
        }
        if (this.refresher !== null) {
            this.refresher.complete();
            this.refresher = null;
        }
        this.loading = false;

        this.reloadData();
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
