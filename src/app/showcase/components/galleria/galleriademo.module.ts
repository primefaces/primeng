import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleriaDemoRoutingModule} from './galleriademo-routing.module';
import {GalleriaModule} from 'primeng/galleria';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

import {GalleriaDemo} from './galleriademo';
import {GalleriaBasicDemo} from './galleriabasicdemo';
import {GalleriaSubmenu} from './galleriasubmenu';
import { GalleriaIndicatorDemo } from './galleriaindicatordemo';
import { GalleriaThumbnailDemo } from './galleriathumbnaildemo';
import { GalleriaPreviewDemo } from './galleriapreviewdemo';
import { GalleriaResponsiveDemo } from './galleriaresponsivedemo';
import { GalleriaFullscreenDemo } from './galleriafullscreendemo';
import { GalleriaCircularDemo } from './galleriacirculardemo';
import { GalleriaCaptionDemo } from './galleriacaptiondemo';

@NgModule({
	imports: [
		CommonModule,
		GalleriaDemoRoutingModule,
        GalleriaModule,
        TabViewModule,
		CodeHighlighterModule,
		ButtonModule
	],
	declarations: [
		GalleriaSubmenu,
		GalleriaDemo,
		GalleriaBasicDemo,
		GalleriaIndicatorDemo,
		GalleriaThumbnailDemo,
		GalleriaPreviewDemo,
		GalleriaResponsiveDemo,
		GalleriaFullscreenDemo,
		GalleriaCircularDemo,
		GalleriaCaptionDemo
	]
})
export class GalleriaDemoModule {}
