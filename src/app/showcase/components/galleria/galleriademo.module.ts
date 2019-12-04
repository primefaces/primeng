import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleriaDemo} from './galleriademo';
import {GalleriaDemoRoutingModule} from './galleriademo-routing.module';
import {GalleriaModule} from 'primeng/galleria';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		GalleriaDemoRoutingModule,
        GalleriaModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		GalleriaDemo
	]
})
export class GalleriaDemoModule {}
