import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {OrderListDemo} from './orderlistdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: OrderListDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class OrderListDemoRoutingModule {}
