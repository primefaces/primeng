import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleriaDemoRoutingModule} from './galleriademo-routing.module';
import {GalleriaModule} from 'primeng/galleria';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';

import {GalleriaDemo} from './galleriademo';
import {GalleriaProgrammaticDemo} from './galleriaprogrammaticdemo';
import {GalleriaIndicatorDemo} from './galleriaindicatordemo';
import {GalleriaThumbnailDemo} from './galleriathumbnaildemo';
import {GalleriaNavigatorDemo} from './gallerianavigatordemo';
import {GalleriaResponsiveDemo} from './galleriaresponsivedemo';
import {GalleriaFullscreenDemo} from './galleriafullscreendemo';
import {GalleriaAutoPlayDemo} from './galleriaautoplaydemo';
import {GalleriaCaptionDemo} from './galleriacaptiondemo';
import {GalleriaAdvancedDemo} from './galleriaadvanceddemo';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		GalleriaDemoRoutingModule,
        GalleriaModule,
        TabViewModule,
		AppCodeModule,
		ButtonModule
	],
	declarations: [
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
