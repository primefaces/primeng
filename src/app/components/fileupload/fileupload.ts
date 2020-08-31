import {NgModule,Component,OnDestroy,Input,Output,EventEmitter,TemplateRef,AfterViewInit,AfterContentInit,
            ContentChildren,QueryList,ViewChild,ElementRef,NgZone,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {ProgressBarModule} from 'primeng/progressbar';
import {DomHandler} from 'primeng/dom';
import {Message} from 'primeng/api';
import {PrimeTemplate,SharedModule} from 'primeng/api';
import {BlockableUI} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';  
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'p-fileUpload',
    template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'">
            <div class="p-fileupload-buttonbar">
                <span class="p-button p-component p-fileupload-choose" [ngClass]="{'p-focus': focus, 'p-disabled':disabled || isChooseDisabled()}" (focus)="onFocus()" (blur)="onBlur()" pRipple
                    (click)="choose()" (keydown.enter)="choose()" tabindex="0"> 
                    <input #advancedfileinput type="file" (change)="onFileSelect($event)" [multiple]="multiple" [accept]="accept" [disabled]="disabled || isChooseDisabled()" [attr.title]="''">
                    <span [ngClass]="'p-button-icon p-button-icon-left'" [class]="chooseIcon"></span>
                    <span class="p-button-label">{{chooseLabel}}</span>
                </span>

                <p-button *ngIf="!auto&&showUploadButton" type="button" [label]="uploadLabel" [icon]="uploadIcon" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()"></p-button>
                <p-button *ngIf="!auto&&showCancelButton" type="button" [label]="cancelLabel" [icon]="cancelIcon" (onClick)="clear()" [disabled]="!hasFiles() || uploading"></p-button>

                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="p-fileupload-row" *ngFor="let file of files; let i = index;">
                            <div><img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" /></div>
                            <div>{{file.name}}</div>
                            <div>{{formatSize(file.size)}}</div>
                            <div>
                                <button type="button" icon="pi pi-times" pButton (click)="remove($event,i)" [disabled]="uploading"></button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container *ngTemplateOutlet="contentTemplate; context: {$implicit: files}"></ng-container>
            </div>
        </div>
        <div class="p-fileupload p-fileupload-basic p-component" *ngIf="mode === 'basic'">
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <span [ngClass]="{'p-button p-component p-fileupload-choose': true, 'p-fil(eupload-choose-selected': hasFiles(),'p-focus': focus, 'p-disabled':disabled}"
                [ngStyle]="style" [class]="styleClass" (mouseup)="onBasicUploaderClick()" (keydown)="onBasicUploaderClick()" tabindex="0" pRipple>
                <span class="p-button-icon p-button-icon-left pi" [ngClass]="hasFiles()&&!auto ? uploadIcon : chooseIcon"></span>
                <span class="p-button-label">{{auto ? chooseLabel : hasFiles() ? files[0].name : chooseLabel}}</span>
                <input #basicfileinput type="file" [accept]="accept" [multiple]="multiple" [disabled]="disabled"
                    (change)="onFileSelect($event)" *ngIf="!hasFiles()" (focus)="onFocus()" (blur)="onBlur()">
            </span>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./fileupload.css']
})
export class FileUpload implements AfterViewInit,AfterContentInit,OnDestroy,BlockableUI {

    @Input() name: string;

    @Input() url: string;

    @Input() method: string = 'POST';

    @Input() multiple: boolean;

    @Input() accept: string;

    @Input() disabled: boolean;

    @Input() auto: boolean;

    @Input() withCredentials: boolean;

    @Input() maxFileSize: number;

    @Input() invalidFileSizeMessageSummary: string = '{0}: Invalid file size, ';

    @Input() invalidFileSizeMessageDetail: string = 'maximum upload size is {0}.';

    @Input() invalidFileTypeMessageSummary: string = '{0}: Invalid file type, ';

    @Input() invalidFileTypeMessageDetail: string = 'allowed file types: {0}.';

    @Input() invalidFileLimitMessageDetail: string = 'limit is {0} at most.';

    @Input() invalidFileLimitMessageSummary: string = 'Maximum number of files exceeded, ';

    @Input() style: any;

    @Input() styleClass: string;

    @Input() previewWidth: number = 50;

    @Input() chooseLabel: string = 'Choose';

    @Input() uploadLabel: string = 'Upload';

    @Input() cancelLabel: string = 'Cancel';

    @Input() chooseIcon: string = 'pi pi-plus';

    @Input() uploadIcon: string = 'pi pi-upload';

    @Input() cancelIcon: string = 'pi pi-times';

    @Input() showUploadButton: boolean = true;

    @Input() showCancelButton: boolean = true;

    @Input() mode: string = 'advanced';

    @Input() headers: HttpHeaders;
    
    @Input() customUpload: boolean;

    @Input() fileLimit: number;

    @Output() onBeforeUpload: EventEmitter<any> = new EventEmitter();

    @Output() onSend: EventEmitter<any> = new EventEmitter();

    @Output() onUpload: EventEmitter<any> = new EventEmitter();

    @Output() onError: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onProgress: EventEmitter<any> = new EventEmitter();

    @Output() uploadHandler: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('advancedfileinput') advancedFileInput: ElementRef;

    @ViewChild('basicfileinput') basicFileInput: ElementRef;

    @ViewChild('content') content: ElementRef;

    @Input() set files(files) {
        this._files = [];

        for(let i = 0; i < files.length; i++) {
            let file = files[i];

            if (this.validate(file)) {
                if (this.isImage(file)) {
                    (<any>file).objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                }

                this._files.push(files[i]);
            }
        }
    }

    get files(): File[] {
        return this._files;
    }

    public _files: File[] = [];

    public progress: number = 0;

    public dragHighlight: boolean;

    public msgs: Message[];

    public fileTemplate: TemplateRef<any>;

    public contentTemplate: TemplateRef<any>;

    public toolbarTemplate: TemplateRef<any>;

    public uploadedFileCount: number = 0;

    focus: boolean;

    uploading: boolean;

    duplicateIEEvent: boolean;  // flag to recognize duplicate onchange event for file input

    constructor(private el: ElementRef, public sanitizer: DomSanitizer, public zone: NgZone, private http: HttpClient, public cd: ChangeDetectorRef){}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'file':
                    this.fileTemplate = item.template;
                break;

                case 'content':
                    this.contentTemplate = item.template;
                break;

                case 'toolbar':
                    this.toolbarTemplate = item.template;
                break;

                default:
                    this.fileTemplate = item.template;
                break;
            }
        });
    }

    ngAfterViewInit() {
        if (this.mode === 'advanced') {
            this.zone.runOutsideAngular(() => {
                if (this.content)
                    this.content.nativeElement.addEventListener('dragover', this.onDragOver.bind(this));
            });
        }
    }

    choose() {
        this.advancedFileInput.nativeElement.click();
    }

    onFileSelect(event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }

        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }

        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for(let i = 0; i < files.length; i++) {
            let file = files[i];

            if (!this.isFileSelected(file)){
              if (this.validate(file)) {
                  if (this.isImage(file)) {
                      file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                  }

                  this.files.push(files[i]);
              }
            }
        }

        this.onSelect.emit({originalEvent: event, files: files, currentFiles: this.files});

        if (this.fileLimit && this.mode == "advanced") {
            this.checkFileLimit();
        }

        if (this.hasFiles() && this.auto && (!(this.mode === "advanced") || !this.isFileLimitExceeded())) {
            this.upload();
        }

        if (event.type !== 'drop' && this.isIE11()) {
          this.clearIEInput();
        } else {
          this.clearInputElement();
        }
    }

    isFileSelected(file: File): boolean{
        for(let sFile of this.files){
            if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type+file.size)) {
                return true;
            }
        }

        return false;
    }

    isIE11() {
        return !!window['MSInputMethodContext'] && !!document['documentMode'];
    }

    validate(file: File): boolean {
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }

        if (this.maxFileSize  && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }

        return true;
    }

    private isFileTypeValid(file: File): boolean {
        let acceptableTypes = this.accept.split(',').map(type => type.trim());
        for(let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                                                    : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();

            if (acceptable) {
                return true;
            }
        }

        return false;
    }

    getTypeClass(fileType: string): string {
        return fileType.substring(0, fileType.indexOf('/'));
    }

    isWildcard(fileType: string): boolean {
        return fileType.indexOf('*') !== -1;
    }

    getFileExtension(file: File): string {
        return '.' + file.name.split('.').pop();
    }

    isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    onImageLoad(img: any) {
        window.URL.revokeObjectURL(img.src);
    }

    upload() {
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length; 
            }
            
            this.uploadHandler.emit({
                files: this.files
            });

            this.cd.markForCheck();
        }
        else {
            this.uploading = true;
            this.msgs = [];
            let formData = new FormData();

            this.onBeforeUpload.emit({
                'formData': formData
            });

            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i], this.files[i].name);
            }

            this.http.post(this.url, formData, {
                headers: this.headers, reportProgress: true, observe: 'events', withCredentials: this.withCredentials
            }).subscribe( (event: HttpEvent<any>) => {
                    switch (event.type) {
                        case HttpEventType.Sent:
                            this.onSend.emit({
                                originalEvent: event,
                                'formData': formData
                            });
                            break;
                        case HttpEventType.Response:
                            this.uploading = false;
                            this.progress = 0;

                            if (event['status'] >= 200 && event['status'] < 300) {
                                if (this.fileLimit) {
                                    this.uploadedFileCount += this.files.length; 
                                }

                                this.onUpload.emit({originalEvent: event, files: this.files});
                            } else {
                                this.onError.emit({files: this.files});
                            }

                            this.clear();
                            break;
                        case HttpEventType.UploadProgress: {
                            if (event['loaded']) {
                                this.progress = Math.round((event['loaded'] * 100) / event['total']);
                            }

                            this.onProgress.emit({originalEvent: event, progress: this.progress});
                            break;
                        }
                    }

                    this.cd.markForCheck();
                },
                error => {
                    this.uploading = false;
                    this.onError.emit({files: this.files, error: error});
                });
        }
    }

    clear() {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
        this.cd.markForCheck();
    }

    remove(event: Event, index: number) {
        this.clearInputElement();
        this.onRemove.emit({originalEvent: event, file: this.files[index]});
        this.files.splice(index, 1);
    }

    isFileLimitExceeded() {
        if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focus) {
            this.focus = false;
        }

        return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    }

    isChooseDisabled() {
        return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    }

    checkFileLimit() {
        if (this.isFileLimitExceeded()) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileLimitMessageSummary.replace('{0}', this.fileLimit.toString()),
                detail: this.invalidFileLimitMessageDetail.replace('{0}', this.fileLimit.toString())
            });
        }
    }

    clearInputElement() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.advancedFileInput.nativeElement.value = '';
        }

        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    }

    clearIEInput() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            this.advancedFileInput.nativeElement.value = '';
        }
    }

    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }

    onDragEnter(e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onDragOver(e) {
        if (!this.disabled) {
            DomHandler.addClass(this.content.nativeElement, 'p-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onDragLeave(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content.nativeElement, 'p-fileupload-highlight');
        }
    }

    onDrop(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content.nativeElement, 'p-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();

            let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            let allowDrop = this.multiple||(files && files.length === 1);

            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    }

    onFocus() {
        this.focus = true;
    }

    onBlur() {
        this.focus = false;
    }

    formatSize(bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        let k = 1024,
        dm = 3,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    onBasicUploaderClick() {
        if (this.hasFiles())
            this.upload();
        else
            this.basicFileInput.nativeElement.click();
    }

    getBlockableElement(): HTMLElement {
      return this.el.nativeElement.children[0];
    }

    ngOnDestroy() {
        if (this.content && this.content.nativeElement) {
            this.content.nativeElement.removeEventListener('dragover', this.onDragOver);
        }
    }
}

@NgModule({
    imports: [CommonModule,SharedModule,ButtonModule,ProgressBarModule,MessagesModule,RippleModule],
    exports: [FileUpload,SharedModule,ButtonModule,ProgressBarModule,MessagesModule],
    declarations: [FileUpload]
})
export class FileUploadModule { }
