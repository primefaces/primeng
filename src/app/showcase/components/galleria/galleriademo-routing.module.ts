import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {GalleriaDemo} from './galleriademo';
import {GalleriaIndicatorDemo} from './galleriaindicatordemo';
import {GalleriaThumbnailDemo} from './galleriathumbnaildemo';
import {GalleriaNavigatorDemo} from './gallerianavigatordemo';
import {GalleriaResponsiveDemo} from './galleriaresponsivedemo';
import {GalleriaFullscreenDemo} from './galleriafullscreendemo';
import {GalleriaAutoPlayDemo} from './galleriaautoplaydemo';
import {GalleriaCaptionDemo} from './galleriacaptiondemo';
import {GalleriaProgrammaticDemo} from './galleriaprogrammaticdemo';
import {GalleriaAdvancedDemo} from './galleriaadvanceddemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: GalleriaDemo},
			{path:'programmatic', component: GalleriaProgrammaticDemo},
			{path:'indicator', component: GalleriaIndicatorDemo},
			{path:'thumbnail', component: GalleriaThumbnailDemo},
			{path:'navigator', component: GalleriaNavigatorDemo},
			{path:'responsive', component: GalleriaResponsiveDemo},
			{path:'fullscreen', component: GalleriaFullscreenDemo},
			{path:'autoplay', component: GalleriaAutoPlayDemo},
			{path:'caption', component: GalleriaCaptionDemo},
			{path:'advanced', component: GalleriaAdvancedDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class GalleriaDemoRoutingModule {}
