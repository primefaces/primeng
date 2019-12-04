import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ToastDemo} from './toastdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'', component: ToastDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class ToastDemoRoutingModule {}
