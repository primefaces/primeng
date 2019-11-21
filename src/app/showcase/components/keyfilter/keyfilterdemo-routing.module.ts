import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {KeyFilterDemo} from './keyfilterdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: KeyFilterDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class KeyFilterDemoRoutingModule {}
