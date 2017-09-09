import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationPage } from './station';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    StationPage
  ],
  imports: [
    IonicPageModule.forChild(StationPage), ComponentsModule
  ],
})
export class StationPageModule {}
