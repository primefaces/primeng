import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {GalleriaDemo} from './galleriademo';
import { GalleriaBasicDemo } from './galleriabasicdemo';
import { GalleriaIndicatorDemo } from './galleriaindicatordemo';
import { GalleriaThumbnailDemo } from './galleriathumbnaildemo';
import { GalleriaPreviewDemo } from './galleriapreviewdemo';
import { GalleriaResponsiveDemo } from './galleriaresponsivedemo';
import { GalleriaFullscreenDemo } from './galleriafullscreendemo';
import { GalleriaCircularDemo } from './galleriacirculardemo';
import { GalleriaCaptionDemo } from './galleriacaptiondemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: GalleriaDemo},
			{path:'basic', component: GalleriaBasicDemo},
			{path:'indicator', component: GalleriaIndicatorDemo},
			{path:'thumbnail', component: GalleriaThumbnailDemo},
			{path:'preview', component: GalleriaPreviewDemo},
			{path:'responsive', component: GalleriaResponsiveDemo},
			{path:'fullscreen', component: GalleriaFullscreenDemo},
			{path:'circular', component: GalleriaCircularDemo},
			{path:'caption', component: GalleriaCaptionDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class GalleriaDemoRoutingModule {}
