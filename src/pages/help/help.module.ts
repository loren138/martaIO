import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {HelpPage} from "./help";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [ HelpPage ],
    imports: [IonicPageModule.forChild(HelpPage), ComponentsModule],
    entryComponents: [ HelpPage ]
}) export class MyHelpModule {}