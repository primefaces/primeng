import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-fileUpload',
    template: `
        <input type="file">
    `,
})
export class FileUpload {

    

}

@NgModule({
    imports: [CommonModule],
    exports: [FileUpload],
    declarations: [FileUpload]
})
export class FileUploadModule { }