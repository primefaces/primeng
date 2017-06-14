import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {DataGridDemo} from './datagriddemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: DataGridDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class DataGridDemoRoutingModule {}
