import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleriaDemoRoutingModule} from './galleriademo-routing.module';
import {GalleriaModule} from 'primeng/galleria';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

import {GalleriaDemo} from './galleriademo';
import {GalleriaProgrammaticDemo} from './galleriaprogrammaticdemo';
import {GalleriaSubmenu} from './galleriasubmenu';
import {GalleriaIndicatorDemo} from './galleriaindicatordemo';
import {GalleriaThumbnailDemo} from './galleriathumbnaildemo';
import {GalleriaNavigatorDemo} from './gallerianavigatordemo';
import {GalleriaResponsiveDemo} from './galleriaresponsivedemo';
import {GalleriaFullscreenDemo} from './galleriafullscreendemo';
import {GalleriaAutoPlayDemo} from './galleriaautoplaydemo';
import {GalleriaCaptionDemo} from './galleriacaptiondemo';
import {GalleriaAdvancedDemo} from './galleriadvanceddemo';

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
		GalleriaProgrammaticDemo,
		GalleriaIndicatorDemo,
		GalleriaThumbnailDemo,
		GalleriaNavigatorDemo,
		GalleriaResponsiveDemo,
		GalleriaFullscreenDemo,
		GalleriaAutoPlayDemo,
		GalleriaCaptionDemo,
		GalleriaAdvancedDemo
	]
})
export class GalleriaDemoModule {}
