import {NgModule,Component,OnInit,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizationService} from '@angular/platform-browser';
import {ButtonModule} from '../button/button';
import {ProgressBarModule} from '../progressbar/progressbar';

@Component({
    selector: 'p-fileUpload',
    template: `
        <div class="ui-fileupload ui-widget">
            <div class="ui-fileupload-buttonbar ui-widget-header ui-corner-top">
                <button type="button" label="Choose" icon="fa-plus" pButton class="ui-fileupload-choose" (click)="fileinput.value=null"> 
                    <input #fileinput type="file" (change)="onFileSelect($event)" [multiple]="multiple" [accept]="accept">
                </button>

                <button type="button" label="Upload" icon="fa-upload" pButton (click)="upload()"></button>
                <button type="button" label="Cancel" icon="fa-close" pButton (click)="clear()"></button>
            </div>
            <div [ngClass]="{'ui-fileupload-content ui-widget-content ui-corner-bottom':true,'ui-fileupload-highlight':dragHighlight}" 
                (dragenter)="onDragEnter($event)" (dragover)="onDragOver($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>
                
                <div class="ui-fileupload-files" *ngIf="hasFiles()">
                    <div class="ui-fileupload-row" *ngFor="let file of files;let i = index;">
                        <div><img [src]="file.objectURL" *ngIf="isImage(file)" width="50" /></div>
                        <div>{{file.name}}</div>
                        <div>{{file.size}}</div>
                        <div><button type="button" icon="fa-close" pButton (click)="remove(i)"></button></div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class FileUpload implements OnInit {
    
    @Input() name: string;
    
    @Input() url: string;
    
    @Input() multiple: boolean;
    
    @Input() accept: string;
    
    @Output() onUpload: EventEmitter<any> = new EventEmitter();
    
    @Output() onError: EventEmitter<any> = new EventEmitter();
    
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
     
    files: File[];
    
    progress: number = 0;
    
    dragHighlight: boolean;
    
    constructor(private sanitizer:DomSanitizationService){}
    
    ngOnInit() {
        this.files = [];
    }
    
    onFileSelect(event) {
        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for(let i = 0; i < files.length; i++) {
            let file = files[i];
            if(this.isImage(file)) {
                file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
            }
            
            this.files.push(files[i]);
        }
        
        this.onSelect.emit({originalEvent: event, files: files});
    }
    
    isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }
    
    onImageLoad(img: any) {
        window.URL.revokeObjectURL(img.src);
    }
    
    upload() {
        let xhr = new XMLHttpRequest(),
        formData = new FormData();
        
        for(let i = 0; i < this.files.length; i++) {
            formData.append(this.name, this.files[i], this.files[i].name);
        }
        
        xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if(e.lengthComputable) {
              this.progress = Math.round((e.loaded * 100) / e.total);
            }
          }, false);

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                this.progress = 0;
                
                if(xhr.status == 200)
                    this.onUpload.emit({xhr: xhr});
                else
                    this.onError.emit({xhr: xhr});
                
                this.clear();
            }
        };
        
        xhr.open('POST', this.url, true);
        xhr.send(formData);
    }

    clear() {
        this.files = [];
        this.onClear.emit();
    }
    
    remove(index: number) {
        this.files.splice(index, 1);
    }
    
    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }
    
    onDragEnter(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    
    onDragOver(e) {
        this.dragHighlight = true;
        e.stopPropagation();
        e.preventDefault();
    }
    
    onDragLeave(e) {
        this.dragHighlight = false;
    }
    
    onDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        
        this.onFileSelect(e);
    }
}

@NgModule({
    imports: [CommonModule,ButtonModule,ProgressBarModule],
    exports: [FileUpload,ButtonModule,ProgressBarModule],
    declarations: [FileUpload]
})
export class FileUploadModule { }