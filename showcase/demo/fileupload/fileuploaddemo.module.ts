import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadDemo} from './fileuploaddemo';
import {FileUploadDemoRoutingModule} from './fileuploaddemo-routing.module';
import {FileUploadModule} from '../../../components/fileupload/fileupload';
import {GrowlModule} from '../../../components/growl/growl';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		FileUploadDemoRoutingModule,
        FileUploadModule,
        GrowlModule,
        TabViewModule,
        CodeHighlighterModule
	],
	declarations: [
		FileUploadDemo
	]
})
export class FileUploadDemoModule {}
