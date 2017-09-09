import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {HelpPage} from "./help";

@NgModule({
    declarations: [ HelpPage ],
    imports: [IonicPageModule.forChild(HelpPage)],
    entryComponents: [ HelpPage ]
}) export class MyHelpModule {}