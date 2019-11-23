import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {EditorDemo} from './editordemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: EditorDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class EditorDemoRoutingModule {}
