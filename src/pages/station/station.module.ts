import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationPage } from './station';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    StationPage
  ],
  imports: [
    IonicPageModule.forChild(StationPage)
  ],
})
export class StationPageModule {}
