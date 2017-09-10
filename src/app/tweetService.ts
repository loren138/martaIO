import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Events, Platform} from 'ionic-angular';

@Injectable()
export class TweetService {

    tweets: any;
    timer: any;
    error: any;
    errorCount: number;

    constructor(public http: Http, public events: Events, public platform: Platform) {
        this.timer = null;
        this.errorCount = 0;
        this.tweets = [];
        this.loadTweets();

        // Reload Trains when we come out of the background
        this.platform.resume.subscribe(() => {
            this.loadTweets();
        });
    }

    loadTweets() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        if (this.http) {
            let url = "http://klingmandesign.com/marta/twitter/index.php?key=martaApp&count=40&date=" + (new Date()).getTime();
            //url = "http://klingmandesign.com/marta/data.php";
            this.http.get(url)

                .map(res => res.json()).subscribe(
                data => {
                    this.tweets = data;
                    this.errorCount = 0;
                    this.events.publish('tweets:updated');
                },
                err => {
                    this.error = err;
                    this.events.publish('tweets:error');
                },
                () => {
                    //console.log("Finally");
                    this.timer = setTimeout(() => {
                        this.loadTweets()
                    }, 60000); // 1 minute
                });
        } else {
            this.errorCount++;
            this.timer = setTimeout(() => {
                this.loadTweets()
            }, 200); // try again in a fifth a second
            console.log('http went missing');
            if (this.errorCount > 10) {
                this.events.publish('tweets:error');
            }
        }
    }

    getError() {
        return this.error;
    }

    getTweets() {
        return this.tweets;
    }

}