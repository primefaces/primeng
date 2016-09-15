import {Component} from '@angular/core';
import {Message} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/fileupload/fileuploaddemo.html'
})
export class FileUploadDemo {

    msgs: Message[];
    
    uploadedFiles: any[] = [];

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}