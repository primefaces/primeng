import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ScrollPanelDemo} from './scrollpaneldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: ScrollPanelDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ScrollPanelDemoRoutingModule {}
