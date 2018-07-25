import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {NotifyDemo} from './notifydemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'', component: NotifyDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class NotifyDemoRoutingModule {}
