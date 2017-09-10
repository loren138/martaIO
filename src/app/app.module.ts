import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {TrainService} from './trainService';
import {Location} from './location';
import {Favorites} from './favorites';
import {Geolocation} from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePage} from "../pages/home/home";
import {MyHomeModule} from "../pages/home/home.module";
import {TweetService} from "./tweetService";

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        MyHomeModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {'pageTransition': 'ios-transition'}),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        TrainService,
        Location,
        Favorites,
        Geolocation,
        TweetService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
