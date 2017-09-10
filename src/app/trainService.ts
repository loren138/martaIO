import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Events, Platform} from 'ionic-angular';

@Injectable()
export class TrainService {

    trains: any;
    timer: any;
    error: any;
    errorCount: number;

    readonly dirOrder = ['n', 's', 'w', 'e'];
    readonly stationLocations = {
        'bankhead station': {
            latitude: 33.772979,
            longitude: -84.428537
        },
        'midtown station': {
            latitude: 33.780737,
            longitude: -84.386657
        },
        'indian creek station': {
            latitude: 33.769212,
            longitude: -84.229255
        },
        'garnett station': {
            latitude: 33.748938,
            longitude: -84.395513
        },
        'college park station': {
            latitude: 33.6513813,
            longitude: -84.4470162
        },
        'ashby station': {
            latitude: 33.756289,
            longitude: -84.41755599999999
        },
        'five points station': {
            latitude: 33.754061,
            longitude: -84.391539
        },
        'airport station': {
            latitude: 33.639975,
            longitude: -84.44403199999999
        },
        'sandy springs station': {
            latitude: 33.9321044,
            longitude: -84.3513524
        },
        'lindbergh station': {
            latitude: 33.823698,
            longitude: -84.369248
        },
        'lakewood station': {
            latitude: 33.700649,
            longitude: -84.429541
        },
        'chamblee station': {
            latitude: 33.8879695,
            longitude: -84.30468049999999
        },
        'king memorial station': {
            latitude: 33.749468,
            longitude: -84.37601099999999
        },
        'east lake station': {
            latitude: 33.765062,
            longitude: -84.31261099999999
        },
        'vine city station': {
            latitude: 33.756612,
            longitude: -84.404348
        },
        'buckhead station': {
            latitude: 33.847874,
            longitude: -84.367296
        },
        'lenox station': {
            latitude: 33.845137,
            longitude: -84.357854
        },
        'civic center station': {
            latitude: 33.766245,
            longitude: -84.38750399999999
        },
        'arts center station': {
            latitude: 33.789283,
            longitude: -84.387125
        },
        'west end station': {
            latitude: 33.73584,
            longitude: -84.412967
        },
        'dunwoody station': {
            latitude: 33.9486029,
            longitude: -84.355848
        },
        'omni dome station': {
            latitude: 33.7489954,
            longitude: -84.3879824
        },
        'oakland city station': {
            latitude: 33.71726400000001,
            longitude: -84.42527899999999
        },
        'east point station': {
            latitude: 33.676609,
            longitude: -84.440595
        },
        'doraville station': {
            latitude: 33.9026881,
            longitude: -84.28025099999999
        },
        'brookhaven station': {
            latitude: 33.859928,
            longitude: -84.33922
        },
        'decatur station': {
            latitude: 33.774455,
            longitude: -84.297131
        },
        'medical center station': {
            latitude: 33.9106263,
            longitude: -84.3513751
        },
        'georgia state station': {
            latitude: 33.749732,
            longitude: -84.38569700000001
        },
        'avondale station': {
            latitude: 33.77533,
            longitude: -84.280715
        },
        'inman park station': {
            latitude: 33.757317,
            longitude: -84.35262
        },
        'kensington station': {
            latitude: 33.772093,
            longitude: -84.252217
        },
        'edgewood candler park station': {
            latitude: 33.761812,
            longitude: -84.340064
        },
        'peachtree center station': {
            latitude: 33.759532,
            longitude: -84.387564
        },
        'north ave station': {
            latitude: 33.771696,
            longitude: -84.387411
        }
    };

    constructor(public http: Http, public events: Events, public platform: Platform) {
        this.timer = null;
        this.errorCount = 0;
        this.trains = [];
        this.loadTrains();

        // Reload Trains when we come out of the background
        this.platform.resume.subscribe(() => {
            this.loadTrains();
        });
    }

    loadTrains() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        if (this.http) {
            let url = "http://marta-api.herokuapp.com/arrivals?" + (new Date()).getTime();
            //url = "http://klingmandesign.com/marta/data.php";
            this.http.get(url)

                .map(res => res.json()).subscribe(
                data => {
                    this.trains = [];
                    for (let train of data) {
                        // Ensure all keys are lower case...
                        let key, keys = Object.keys(train);
                        let n = keys.length;
                        let newobj = {};
                        while (n--) {
                            key = keys[n];
                            newobj[key.toLowerCase()] = typeof train[key] === "string" ? train[key].toLowerCase() : train[key];
                        }
                        this.trains.push(newobj);
                    }
                    this.errorCount = 0;
                    this.events.publish('trains:updated');
                },
                err => {
                    this.error = err;
                    this.events.publish('trains:error');
                },
                () => {
                    //console.log("Finally");
                    this.timer = setTimeout(() => {
                        this.loadTrains()
                    }, 10500); // 10.5 seconds
                });
        } else {
            this.errorCount++;
            this.timer = setTimeout(() => {
                this.loadTrains()
            }, 200); // try again in a fifth a second
            console.log('http went missing');
            if (this.errorCount > 10) {
                this.events.publish('trains:error');
            }
        }
    }

    getError() {
        return this.error;
    }

    getTrains() {
        return this.trains;
    }

    static timeboxClass(arrival) {
        let ret = {
            scheduled: arrival.scheduled
        };
        ret[arrival.line + '-line'] = true;
        return ret;
    }

    byDirection(obj) {
        if (!obj) {
            return null;
        }
        let res = {};
        // Must return an array
        let result = [];
        for (let order of this.dirOrder) {
            if (obj[order]) {
                res[order] = obj[order];
                result.push(obj[order]);
            }
        }
        //console.log(obj, res, result);
        return result;
    }

    find(attr, value) {
        let res = [];
        for (let train of this.trains) {
            if (train[attr] == value) {
                res.push(train);
            }
        }
        return res;
    }

    // for use on dashboard, showing next arrivals
    latestByStation() {
        let res = {};
        let sortedArrivals = this.trains.slice().sort(function (a, b) {
            if (a.station == b.station) {
                return a.waiting_seconds < b.waiting_seconds ? -1 : 1;
            }
            return a.station < b.station ? -1 : 1;
        });

        for (let train of sortedArrivals) {
            // don't need station on the end of all these names
            let station = train.station.replace(/ station$/, '');
            let dir = train.direction;
            if (!res[station]) {
                res[station] = {};
            }
            if (!res[station][dir]) {
                res[station][dir] = train;
            }
        }
        return res;
    }

    closestTo(coords, arrivalsByStation) {
        if (!arrivalsByStation) return null;
        let closestThree = this.nearestStations(coords, 3);
        let atLeastOne = null;
        let results = {};
        for (let close of closestThree) {
            let stationName = close.replace(/ station$/, '');
            let result = arrivalsByStation[stationName];
            if (result) {
                atLeastOne = true;
                results[stationName] = result;
            }
        }
        // return null if the object is empty
        return atLeastOne && results;
    }

    nearestStations(coords, num) {
        let dists = [], closest = [];
        for (let station in this.stationLocations) {
            if (this.stationLocations.hasOwnProperty(station)) {
                let curr = this.stationLocations[station];
                let lat = Math.pow(coords.latitude - curr.latitude, 2);
                let lng = Math.pow(coords.longitude - curr.longitude, 2);
                let dist = Math.sqrt(lat + lng);
                for (let i = 0; i < num; i++) {
                    if (!dists[i] || (dists[i] > dist)) {
                        if (dists.length == num) {
                            closest.pop();
                            dists.pop();
                        }
                        closest.splice(i, 0, station);
                        dists.splice(i, 0, dist);
                        break;
                    }
                }
            }
        }
        return closest;
    }

}