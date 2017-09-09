import { NgModule } from '@angular/core';
import { TimeDisplayComponent } from './time-display/time-display';
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import { TabsComponent } from './tabs/tabs';

@NgModule({
	declarations: [TimeDisplayComponent,
    TabsComponent],
	imports: [CommonModule, IonicModule],
	exports: [TimeDisplayComponent, TabsComponent]
})
export class ComponentsModule {}
