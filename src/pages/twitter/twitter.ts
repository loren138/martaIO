import {Component} from '@angular/core';
import {Events, IonicPage, NavController, ToastController} from 'ionic-angular';
import {TweetService} from "../../app/tweetService";

@IonicPage()
@Component({
    selector: 'twitter-page',
    templateUrl: 'twitter.html'
})
export class TwitterPage {

    tweets: any;
    tweetError: boolean;
    emptyResponse: boolean;
    refresher: any;
    loading: any;
    error: any;
    connectionProblem: any;

    constructor(public navCtrl: NavController, public events: Events, public tweetService: TweetService,
    public toastCtrl: ToastController) {
        this.refresher = null;
        this.tweetError = false;
        this.emptyResponse = false;
        this.loading = true;
        this.connectionProblem = false;
        this.refresher = null;
        this.loadTweets(false);
        events.subscribe('tweets:updated', () => {
            this.loadTweets(true);
        });
        events.subscribe('tweets:error', () => {
            if (this.refresher !== null) {
                this.refresher.cancel();
                this.refresher = null;
            }
            this.error = this.tweetService.getError();
            this.connectionProblem = (this.error.status === 0);
            this.tweetError = true;
            this.loading = false;
            this.emptyResponse = false;
        });
    }

    private loadTweets(trainsUpdated) {
        this.tweets = this.tweetService.getTweets();
        if (this.tweets.length === 0) {
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
        this.tweetError = false;
        this.connectionProblem = false;
    }

    fullDateForTweet(dateString) {
        let d = new Date(Date.parse(dateString));
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let minuteString = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minuteString + ' ' + ampm;

        // http://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
        return ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/"  +
            d.getFullYear() + " " + strTime;
    }

    public openLinkUrl(url) {
        window.open(url, '_blank');
    }

    public openTwitter(screenName) {
        window.open("https://twitter.com/"+screenName, '_blank');
    }

    dateForTweet(dateString) {
        let now = new Date();
        let d = new Date(Date.parse(dateString));
        if (now.getDate() == d.getDate() && now.getMonth() == d.getMonth() && now.getFullYear() == d.getFullYear()) {
            let hours = d.getHours();
            let minutes = d.getMinutes();
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            let minuteString = minutes < 10 ? '0'+minutes : minutes;
            return hours + ':' + minuteString + ' ' + ampm;
        } else {
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Sept", "Oct", "Nov", "Dec"
            ];
            // http://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
            return monthNames[d.getMonth()] + " " + d.getDate();

        }
    }

    toastDate(dateString) {
        console.log('toast');
        let toast = this.fullDateForTweet(dateString);
        let toast2 = this.toastCtrl.create({
            message: toast,
            duration: 1250,
            position: 'bottom'
        });
        toast2.present();
    }


    reloadTweets(refresher) {
        this.refresher = refresher;
        this.tweetService.loadTweets();
    }

}
