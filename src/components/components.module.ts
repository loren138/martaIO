import { NgModule } from '@angular/core';
import { TimeDisplayComponent } from './time-display/time-display';
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";

@NgModule({
	declarations: [TimeDisplayComponent],
	imports: [CommonModule, IonicModule],
	exports: [TimeDisplayComponent]
})
export class ComponentsModule {}
