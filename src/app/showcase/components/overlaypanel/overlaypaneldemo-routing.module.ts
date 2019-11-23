import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {OverlayPanelDemo} from './overlaypaneldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: OverlayPanelDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class OverlayPanelDemoRoutingModule {}
