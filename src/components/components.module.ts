import { NgModule } from '@angular/core';
import { TimeDisplayComponent } from './time-display/time-display';
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import { TabsComponent } from './tabs/tabs';
import { DataErrorComponent } from './data-error/data-error';

@NgModule({
	declarations: [TimeDisplayComponent,
    TabsComponent,
    DataErrorComponent],
	imports: [CommonModule, IonicModule],
	exports: [TimeDisplayComponent, TabsComponent,
    DataErrorComponent]
})
export class ComponentsModule {}
