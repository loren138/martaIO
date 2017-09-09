import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {HomePage} from "./home";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [ HomePage ],
    imports: [IonicPageModule.forChild(HomePage), ComponentsModule],
    entryComponents: [ HomePage ]
}) export class MyHomeModule {}