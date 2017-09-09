import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainPage } from './train';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TrainPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainPage), ComponentsModule
  ],
})
export class TrainPageModule {}
