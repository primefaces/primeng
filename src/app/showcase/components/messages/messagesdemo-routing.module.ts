import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {MessagesDemo} from './messagesdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: MessagesDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class MessagesDemoRoutingModule {}
