import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
    templateUrl: './fileuploaddemo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .ui-toast {
            top: 80px;
        }

        :host ::ng-deep .news-active .ui-toast {
            top: 150px;
        }

        @media screen and (max-width: 64em) {
            :host ::ng-deep .ui-toast {
                top: 110px;
            }

            :host ::ng-deep .news-active .ui-toast {
                top: 180px;
            }
        }
    `]
})
export class FileUploadDemo {
    
    uploadedFiles: any[] = [];
    
    constructor(private messageService: MessageService, private app: AppComponent) {}

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
    
    isNewsActive() {
        return this.app.newsActive;
    }
}
