import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadDemo} from './fileuploaddemo';
import {FileUploadDemoRoutingModule} from './fileuploaddemo-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FileUploadDemoRoutingModule
	],
	declarations: [
		FileUploadDemo
	]
})
export class FileUploadDemoModule {}
