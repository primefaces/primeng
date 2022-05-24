import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {RatingDemo} from './ratingdemo';
import {RatingDemoRoutingModule} from './ratingdemo-routing.module';
import {RatingModule} from 'primeng/rating';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';
import {AppDemoActionsModule} from '../../app.demoactions.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		RatingDemoRoutingModule,
        RatingModule,
		TabViewModule,
		AppCodeModule,
		AppDemoActionsModule
	],
	declarations: [
		RatingDemo
	]
})
export class RatingDemoModule {}
