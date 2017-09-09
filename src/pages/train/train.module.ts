import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainPage } from './train';

@NgModule({
  declarations: [
    TrainPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainPage),
  ],
})
export class TrainPageModule {}
