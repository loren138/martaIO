import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import {Events} from 'ionic-angular';

@Injectable()
export class Favorites {

    favorites: any;
    readonly key = 'martaio-favorites';

    constructor(public storage: Storage, public events: Events) {
        this.favorites = [];
        this.storage.get(this.key).then((val) => {
            this.favorites = JSON.parse(val || '[]');
            this.events.publish('favorites:updated');
        });
    }

    private setFavorites() {
        this.storage.set(this.key, JSON.stringify(this.favorites));
        this.events.publish('favorites:updated');
    }

    getFavorites() {
        return this.favorites;
    }

    isFavorite(station) {
        return this.favorites.indexOf(station) > -1;
    }

    toggle(station) {
        let removeIndex = this.favorites.indexOf(station);
        console.log(removeIndex);
        if (removeIndex == -1) {
            this.favorites.push(station);
        } else {
            this.favorites.splice(removeIndex, 1);
            console.log(this.favorites);
        }
        this.setFavorites();
        return;
    }

    intersection(arrivals) {
        let ret = {};
        let haveOne = false;
        for(let fav of this.favorites) {
            if (arrivals[fav]) {
                haveOne = true;
                ret[fav] = arrivals[fav];
            }
        }
        if (haveOne) {
            return ret;
        } else {
            return null;
        }
    }
}