import {Component} from '@angular/core';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: './fileuploaddemo.html'
})
export class FileUploadDemo {

    msgs: Message[];
    
    uploadedFiles: any[] = [];

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
    
    onBasicUpload(event) {        
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }
    
    onBasicUploadAuto(event) {        
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
}