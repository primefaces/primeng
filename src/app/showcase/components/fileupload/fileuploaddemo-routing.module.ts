import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router'
import {FileUploadDemo} from './fileuploaddemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: FileUploadDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class FileUploadDemoRoutingModule {}
