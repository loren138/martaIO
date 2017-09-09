import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {HomePage} from "./home";
import { TimeDisplayComponent } from '../../components/time-display/time-display';

@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [ HomePage, TimeDisplayComponent ],
    imports: [IonicPageModule.forChild(HomePage)],
    entryComponents: [ HomePage ]
}) export class MyHomeModule {}