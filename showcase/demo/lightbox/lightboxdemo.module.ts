import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {LightboxDemo} from './lightboxdemo';
import {LightboxDemoRoutingModule} from './lightboxdemo-routing.module';
import {LightboxModule} from '../../../components/lightbox/lightbox';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		LightboxDemoRoutingModule,
        LightboxModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		LightboxDemo
	]
})
export class LightboxDemoModule {}
