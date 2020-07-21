import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';
import {RatingDemo} from './ratingdemo';
import {RatingDemoRoutingModule} from './ratingdemo-routing.module';
import {RatingModule} from 'primeng/rating';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
        FormsModule,
		RatingDemoRoutingModule,
        RatingModule,
		TabViewModule,
		AppCodeModule,
        CodeHighlighterModule
	],
	declarations: [
		RatingDemo
	]
})
export class RatingDemoModule {}
