import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {GalleriaDemo} from './galleriademo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: GalleriaDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class GalleriaDemoRoutingModule {}
