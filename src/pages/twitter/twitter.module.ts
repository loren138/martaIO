import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import { TwitterPage } from './twitter';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [ TwitterPage ],
    imports: [IonicPageModule.forChild(TwitterPage), ComponentsModule],
    entryComponents: [ TwitterPage ]
}) export class MyTwitterModule {}