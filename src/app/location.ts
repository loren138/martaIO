import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

@Injectable()
export class Location {

    location: any;

    constructor(public geolocation: Geolocation, public events: Events) {
        this.location = null;
        this.geolocation.getCurrentPosition().then((resp) => {
            this.saveLocation(resp);
        }).catch((error) => {
            console.log('Error getting location', error);
        });

        let watch = this.geolocation.watchPosition();
        watch.subscribe((resp) => {
            //console.log('watch', resp);
            this.saveLocation(resp);
        });
    }

    private saveLocation(resp) {
        if (resp.coords && resp.coords.latitude && resp.coords.longitude) {
            let lat = resp.coords.latitude;
            let lon = resp.coords.longitude;
            if (lat && lon) {
                this.location = {
                    'latitude': lat,
                    'longitude': lon
                };
                //console.log('log', resp);
                this.events.publish('location:updated');
            }
        }
    }

    getLocation() {
        return this.location;
    }

}