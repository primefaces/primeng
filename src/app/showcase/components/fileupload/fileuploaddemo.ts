import {Component} from '@angular/core';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './fileuploaddemo.html',
    providers: [MessageService]
})
export class FileUploadDemo {
    
    uploadedFiles: any[] = [];
    
    constructor(private messageService: MessageService) {}

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
    
    onBasicUpload(event) {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }
    
    onBasicUploadAuto(event) {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }
}
