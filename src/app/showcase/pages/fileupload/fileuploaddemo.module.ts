import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadDocModule } from '@doc/fileupload/fileuploaddoc.module';
import { FileUploadDemo } from './fileuploaddemo';
import { FileUploadDemoRoutingModule } from './fileuploaddemo-routing.module';

@NgModule({
    imports: [CommonModule, FileUploadDemoRoutingModule, FileUploadDocModule],
    declarations: [FileUploadDemo]
})
export class FileUploadDemoModule {}
