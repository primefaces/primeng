import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabViewModule} from 'primeng/tabview';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RippleModule} from 'primeng/ripple';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpeedDialDemo } from './speeddialdemo';
import { SpeedDialDemoRoutingModule } from './speeddialdemo-routing.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
	imports: [
		CommonModule,
		SpeedDialDemoRoutingModule,
        TabViewModule,
		AppCodeModule,
        ProgressSpinnerModule,
		AppDemoActionsModule,
        SpeedDialModule,
        ToastModule,
        RippleModule
	],
	declarations: [
		SpeedDialDemo
	]
})
export class SpeedDialDemoModule {}
