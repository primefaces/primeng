import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlideMenuDemo} from './slidemenudemo';
import {SlideMenuDemoRoutingModule} from './slidemenudemo-routing.module';
import {SlideMenuModule} from '../../../components/slidemenu/slidemenu';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		SlideMenuDemoRoutingModule,
        SlideMenuModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		SlideMenuDemo
	]
})
export class SlideMenuDemoModule {}
