import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadDemo} from './fileuploaddemo';
import {FileUploadDemoRoutingModule} from './fileuploaddemo-routing.module';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		FileUploadDemoRoutingModule,
        FileUploadModule,
        ToastModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		FileUploadDemo
	]
})
export class FileUploadDemoModule {}
