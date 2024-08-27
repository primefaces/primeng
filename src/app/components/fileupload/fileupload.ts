import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    numberAttribute,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlockableUI, Message, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { PlusIcon } from 'primeng/icons/plus';
import { TimesIcon } from 'primeng/icons/times';
import { UploadIcon } from 'primeng/icons/upload';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { VoidListener } from 'primeng/ts-helpers';
import { Subscription } from 'rxjs';
import {
    FileBeforeUploadEvent,
    FileProgressEvent,
    FileRemoveEvent,
    FileSelectEvent,
    FileSendEvent,
    FileUploadErrorEvent,
    FileUploadEvent,
    FileUploadHandlerEvent,
    RemoveUploadedFileEvent,
} from './fileupload.interface';
import { FileUploadStyle } from './style/fileuploadstyle';
import { BaseComponent } from 'primeng/basecomponent';
/**
 * FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
 * @group Components
 */
@Component({
    selector: 'p-fileUpload',
    template: `
        <div
            [ngClass]="'p-fileupload p-fileupload-advanced p-component'"
            [ngStyle]="style"
            [class]="styleClass"
            *ngIf="mode === 'advanced'"
            [attr.data-pc-name]="'fileupload'"
            [attr.data-pc-section]="'root'"
        >
            <input
                [attr.aria-label]="browseFilesLabel"
                #advancedfileinput
                type="file"
                (change)="onFileSelect($event)"
                [multiple]="multiple"
                [accept]="accept"
                [disabled]="disabled || isChooseDisabled()"
                [attr.title]="''"
                [attr.data-pc-section]="'input'"
                [style.display]="'none'"
            />
            <div class="p-fileupload-header">
                <ng-container *ngIf="!headerTemplate">
                    <p-button
                        [styleClass]="'p-fileupload-choose-button ' + chooseStyleClass"
                        [disabled]="disabled || isChooseDisabled()"
                        (focus)="onFocus()"
                        [label]="chooseButtonLabel"
                        (blur)="onBlur()"
                        (onClick)="choose()"
                        (keydown.enter)="choose()"
                        tabindex="0"
                        [attr.data-pc-section]="'choosebutton'"
                    >
                        <input
                            [attr.aria-label]="browseFilesLabel"
                            #advancedfileinput
                            type="file"
                            (change)="onFileSelect($event)"
                            [multiple]="multiple"
                            [accept]="accept"
                            [disabled]="disabled || isChooseDisabled()"
                            [attr.title]="''"
                            [attr.data-pc-section]="'input'"
                        />
                        <span
                            *ngIf="chooseIcon"
                            [class]="chooseIcon"
                            [attr.aria-label]="true"
                            [attr.data-pc-section]="'chooseicon'"
                        ></span>
                        <ng-container *ngIf="!chooseIcon">
                            <PlusIcon
                                *ngIf="!chooseIconTemplate"
                                [attr.aria-label]="true"
                                [attr.data-pc-section]="'chooseicon'"
                            />
                            <span
                                *ngIf="chooseIconTemplate"
                                [attr.aria-label]="true"
                                [attr.data-pc-section]="'chooseicon'"
                            >
                                <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>

                    <p-button
                        *ngIf="!auto && showUploadButton"
                        [label]="uploadButtonLabel"
                        (onClick)="upload()"
                        [disabled]="!hasFiles() || isFileLimitExceeded()"
                        [styleClass]="'p-fileupload-upload-button ' + uploadStyleClass"
                    >
                        <span *ngIf="uploadIcon" [ngClass]="uploadIcon" [attr.aria-hidden]="true"></span>
                        <ng-container *ngIf="!uploadIcon">
                            <UploadIcon *ngIf="!uploadIconTemplate" />
                            <span *ngIf="uploadIconTemplate" [attr.aria-hidden]="true">
                                <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>
                    <p-button
                        *ngIf="!auto && showCancelButton"
                        [label]="cancelButtonLabel"
                        (onClick)="clear()"
                        [disabled]="!hasFiles() || uploading"
                        [styleClass]="'p-fileupload-cancel-button ' + cancelStyleClass"
                    >
                        <span *ngIf="cancelIcon" [ngClass]="cancelIcon"></span>
                        <ng-container *ngIf="!cancelIcon">
                            <TimesIcon *ngIf="!cancelIconTemplate" [attr.aria-hidden]="true" />
                            <span *ngIf="cancelIconTemplate" [attr.aria-hidden]="true">
                                <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>
                </ng-container>
                <ng-container
                    *ngTemplateOutlet="
                        headerTemplate;
                        context: {
                            $implicit: files,
                            uploadedFiles: uploadedFiles,
                            chooseCallback: choose.bind(this),
                            clearCallback: clear.bind(this),
                            uploadCallback: upload.bind(this)
                        }
                    "
                ></ng-container>
                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div
                #content
                class="p-fileupload-content"
                (dragenter)="onDragEnter($event)"
                (dragleave)="onDragLeave($event)"
                (drop)="onDrop($event)"
                [attr.data-pc-section]="'content'"
            >
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-file-list" *ngIf="hasFiles()">
                    @if(!fileTemplate){
                    <div class="p-fileupload-file" *ngFor="let file of files; let i = index">
                        <img
                            [src]="file.objectURL"
                            *ngIf="isImage(file)"
                            [width]="previewWidth"
                            (error)="imageError($event)"
                            class="p-fileupload-file-thumbnail"
                        />
                        <div class="p-fileupload-file-info">
                            <div class="p-fileupload-file-name">{{ file.name }}</div>
                            <span class="p-fileupload-file-size">{{ formatSize(file.size) }}</span>
                        </div>
                        <div class="p-fileupload-file-actions">
                            <p-button
                                (onClick)="remove($event, i)"
                                [disabled]="uploading"
                                [styleClass]="'p-fileupload-file-remove-button ' + removeStyleClass"
                            >
                                <ng-template pTemplate="icon">
                                    <TimesIcon *ngIf="!cancelIconTemplate" />
                                    <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                                </ng-template>
                            </p-button>
                        </div>
                    </div>
                    } @if(fileTemplate) {
                    <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    }
                </div>
                <ng-container
                    *ngTemplateOutlet="
                        contentTemplate;
                        context: {
                            $implicit: files,
                            uploadedFiles: uploadedFiles,
                            chooseCallback: choose.bind(this),
                            clearCallback: clear.bind(this),
                            removeUploadedFileCallback: removeUploadedFile.bind(this),
                            removeFileCallback: remove.bind(this),
                            progress: progress,
                            messages: msgs
                        }
                    "
                ></ng-container>
                @if(emptyTemplate && !hasFiles() && !hasUploadedFiles()){
                <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                }
            </div>
        </div>
        <div
            class="p-fileupload p-fileupload-basic p-component"
            *ngIf="mode === 'basic'"
            [attr.data-pc-name]="'fileupload'"
        >
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <p-button
                [styleClass]="'p-fileupload-choose-button ' + chooseStyleClass"
                [disabled]="disabled"
                [label]="basicButtonLabel"
                [style]="style"
                (onClick)="onBasicUploaderClick()"
                (keydown)="onBasicKeydown($event)"
                tabindex="0"
            >
                <ng-template pTemplate="icon">
                    @if(hasFiles() && !auto) {
                    <span *ngIf="uploadIcon" class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                    }@else {
                    <span *ngIf="chooseIcon" class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon *ngIf="!chooseIconTemplate" [attr.data-pc-section]="'uploadicon'" />
                        <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                    </ng-container>
                    }
                </ng-template>
                <input
                    [attr.aria-label]="browseFilesLabel"
                    #basicfileinput
                    type="file"
                    [accept]="accept"
                    [multiple]="multiple"
                    [disabled]="disabled"
                    (change)="onFileSelect($event)"
                    *ngIf="!hasFiles()"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.data-pc-section]="'input'"
                />
            </p-button>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FileUploadStyle],
})
export class FileUpload
    extends BaseComponent
    implements AfterViewInit, AfterContentInit, OnInit, OnDestroy, BlockableUI
{
    /**
     * Name of the request parameter to identify the files at backend.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * Remote url to upload the files.
     * @group Props
     */
    @Input() url: string | undefined;
    /**
     * HTTP method to send the files to the url such as "post" and "put".
     * @group Props
     */
    @Input() method: 'post' | 'put' | undefined = 'post';
    /**
     * Used to select multiple files at once from file dialog.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) multiple: boolean | undefined;
    /**
     * Comma-separated list of pattern to restrict the allowed file types. Can be any combination of either the MIME types (such as "image/*") or the file extensions (such as ".jpg").
     * @group Props
     */
    @Input() accept: string | undefined;
    /**
     * Disables the upload functionality.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * When enabled, upload begins automatically after selection is completed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) auto: boolean | undefined;
    /**
     * Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) withCredentials: boolean | undefined;
    /**
     * Maximum file size allowed in bytes.
     * @group Props
     */
    @Input({ transform: numberAttribute }) maxFileSize: number | undefined;
    /**
     * Summary message of the invalid file size.
     * @group Props
     */
    @Input() invalidFileSizeMessageSummary: string = '{0}: Invalid file size, ';
    /**
     * Detail message of the invalid file size.
     * @group Props
     */
    @Input() invalidFileSizeMessageDetail: string = 'maximum upload size is {0}.';
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    @Input() invalidFileTypeMessageSummary: string = '{0}: Invalid file type, ';
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    @Input() invalidFileTypeMessageDetail: string = 'allowed file types: {0}.';
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    @Input() invalidFileLimitMessageDetail: string = 'limit is {0} at most.';
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    @Input() invalidFileLimitMessageSummary: string = 'Maximum number of files exceeded, ';
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Width of the image thumbnail in pixels.
     * @group Props
     */
    @Input({ transform: numberAttribute }) previewWidth: number = 50;
    /**
     * Label of the choose button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    @Input() chooseLabel: string | undefined;
    /**
     * Label of the upload button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    @Input() uploadLabel: string | undefined;
    /**
     * Label of the cancel button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    @Input() cancelLabel: string | undefined;
    /**
     * Icon of the choose button.
     * @group Props
     */
    @Input() chooseIcon: string | undefined;
    /**
     * Icon of the upload button.
     * @group Props
     */
    @Input() uploadIcon: string | undefined;
    /**
     * Icon of the cancel button.
     * @group Props
     */
    @Input() cancelIcon: string | undefined;
    /**
     * Whether to show the upload button.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showUploadButton: boolean = true;
    /**
     * Whether to show the cancel button.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showCancelButton: boolean = true;
    /**
     * Defines the UI of the component.
     * @group Props
     */
    @Input() mode: 'advanced' | 'basic' | undefined = 'advanced';
    /**
     * HttpHeaders class represents the header configuration options for an HTTP request.
     * @group Props
     */
    @Input() headers: HttpHeaders | undefined;
    /**
     * Whether to use the default upload or a manual implementation defined in uploadHandler callback. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) customUpload: boolean | undefined;
    /**
     * Maximum number of files that can be uploaded.
     * @group Props
     */
    @Input({ transform: (value: unknown) => numberAttribute(value, null) }) fileLimit: number | undefined;
    /**
     * Style class of the upload button.
     * @group Props
     */
    @Input() uploadStyleClass: string | undefined;
    /**
     * Style class of the cancel button.
     * @group Props
     */
    @Input() cancelStyleClass: string | undefined;
    /**
     * Style class of the remove button.
     * @group Props
     */
    @Input() removeStyleClass: string | undefined;
    /**
     * Style class of the choose button.
     * @group Props
     */
    @Input() chooseStyleClass: string | undefined;
    /**
     * Callback to invoke before file upload is initialized.
     * @param {FileBeforeUploadEvent} event - Custom upload event.
     * @group Emits
     */
    @Output() onBeforeUpload: EventEmitter<FileBeforeUploadEvent> = new EventEmitter<FileBeforeUploadEvent>();
    /**
     * An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.
     * @param {FileSendEvent} event - Custom send event.
     * @group Emits
     */
    @Output() onSend: EventEmitter<FileSendEvent> = new EventEmitter<FileSendEvent>();
    /**
     * Callback to invoke when file upload is complete.
     * @param {FileUploadEvent} event - Custom upload event.
     * @group Emits
     */
    @Output() onUpload: EventEmitter<FileUploadEvent> = new EventEmitter<FileUploadEvent>();
    /**
     * Callback to invoke if file upload fails.
     * @param {FileUploadErrorEvent} event - Custom error event.
     * @group Emits
     */
    @Output() onError: EventEmitter<FileUploadErrorEvent> = new EventEmitter<FileUploadErrorEvent>();
    /**
     * Callback to invoke when files in queue are removed without uploading using clear all button.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onClear: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when a file is removed without uploading using clear button of a file.
     * @param {FileRemoveEvent} event - Remove event.
     * @group Emits
     */
    @Output() onRemove: EventEmitter<FileRemoveEvent> = new EventEmitter<FileRemoveEvent>();
    /**
     * Callback to invoke when files are selected.
     * @param {FileSelectEvent} event - Select event.
     * @group Emits
     */
    @Output() onSelect: EventEmitter<FileSelectEvent> = new EventEmitter<FileSelectEvent>();
    /**
     * Callback to invoke when files are being uploaded.
     * @param {FileProgressEvent} event - Progress event.
     * @group Emits
     */
    @Output() onProgress: EventEmitter<FileProgressEvent> = new EventEmitter<FileProgressEvent>();
    /**
     * Callback to invoke in custom upload mode to upload the files manually.
     * @param {FileUploadHandlerEvent} event - Upload handler event.
     * @group Emits
     */
    @Output() uploadHandler: EventEmitter<FileUploadHandlerEvent> = new EventEmitter<FileUploadHandlerEvent>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onImageError: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {RemoveUploadedFileEvent} event - Remove event.
     * @group Emits
     */
    @Output() onRemoveUploadedFile: EventEmitter<RemoveUploadedFileEvent> = new EventEmitter<RemoveUploadedFileEvent>();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @ViewChild('advancedfileinput') advancedFileInput: ElementRef | undefined | any;

    @ViewChild('basicfileinput') basicFileInput: ElementRef | undefined;

    @ViewChild('content') content: ElementRef | undefined;

    @Input() set files(files) {
        this._files = [];

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            if (this.validate(file)) {
                if (this.isImage(file)) {
                    (<any>file).objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                }

                this._files.push(files[i]);
            }
        }
    }

    get files(): File[] {
        return this._files;
    }

    public get basicButtonLabel(): string {
        if (this.auto || !this.hasFiles()) {
            return this.chooseLabel as string;
        }

        return this.uploadLabel ?? this.files[0].name;
    }

    public _files: File[] = [];

    public progress: number = 0;

    public dragHighlight: boolean | undefined;

    public msgs: Message[] | undefined;

    public fileTemplate: TemplateRef<any> | undefined;

    public headerTemplate: TemplateRef<any> | undefined;

    public contentTemplate: TemplateRef<any> | undefined;

    public toolbarTemplate: TemplateRef<any> | undefined;

    chooseIconTemplate: TemplateRef<any> | undefined;

    uploadIconTemplate: TemplateRef<any> | undefined;

    cancelIconTemplate: TemplateRef<any> | undefined;

    emptyTemplate: TemplateRef<any> | undefined;

    public uploadedFileCount: number = 0;

    focus: boolean | undefined;

    uploading: boolean | undefined;

    duplicateIEEvent: boolean | undefined; // flag to recognize duplicate onchange event for file input

    translationSubscription: Subscription | undefined;

    dragOverListener: VoidListener;

    public uploadedFiles = [];

    sanitizer: DomSanitizer = inject(DomSanitizer);

    zone: NgZone = inject(NgZone);

    http: HttpClient = inject(HttpClient);

    _componentStyle = inject(FileUploadStyle);

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'file':
                    this.fileTemplate = item.template;
                    break;

                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'toolbar':
                    this.toolbarTemplate = item.template;
                    break;

                case 'chooseicon':
                    this.chooseIconTemplate = item.template;
                    break;

                case 'uploadicon':
                    this.uploadIconTemplate = item.template;
                    break;

                case 'cancelicon':
                    this.cancelIconTemplate = item.template;
                    break;

                case 'empty':
                    this.emptyTemplate = item.template;
                    break;

                default:
                    this.fileTemplate = item.template;
                    break;
            }
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (isPlatformBrowser(this.platformId)) {
            if (this.mode === 'advanced') {
                this.zone.runOutsideAngular(() => {
                    if (this.content) {
                        this.dragOverListener = this.renderer.listen(
                            this.content.nativeElement,
                            'dragover',
                            this.onDragOver.bind(this),
                        );
                    }
                });
            }
        }
    }

    getTranslation(option: string) {
        return this.config.getTranslation(option);
    }

    choose() {
        this.advancedFileInput?.nativeElement.click();
    }

    onFileSelect(event: any) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }

        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }

        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                    }

                    this.files.push(files[i]);
                }
            }
        }

        this.onSelect.emit({ originalEvent: event, files: files, currentFiles: this.files });

        // this will check the fileLimit with the uploaded files
        this.checkFileLimit(files);

        if (this.hasFiles() && this.auto && (this.mode !== 'advanced' || !this.isFileLimitExceeded())) {
            this.upload();
        }

        if (event.type !== 'drop' && this.isIE11()) {
            this.clearIEInput();
        } else {
            this.clearInputElement();
        }
    }

    isFileSelected(file: File): boolean {
        for (let sFile of this.files) {
            if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) {
                return true;
            }
        }

        return false;
    }

    isIE11() {
        if (isPlatformBrowser(this.platformId)) {
            return (
                !!(this.document.defaultView as any)['MSInputMethodContext'] && !!(this.document as any)['documentMode']
            );
        }
    }

    validate(file: File): boolean {
        this.msgs = this.msgs || [];
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept),
            });
            return false;
        }

        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize)),
            });
            return false;
        }

        return true;
    }

    private isFileTypeValid(file: File): boolean {
        let acceptableTypes = this.accept?.split(',').map((type) => type.trim());
        for (let type of acceptableTypes!) {
            let acceptable = this.isWildcard(type)
                ? this.getTypeClass(file.type) === this.getTypeClass(type)
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
    /**
     * Uploads the selected files.
     * @group Method
     */
    upload() {
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
            }

            this.uploadHandler.emit({
                files: this.files,
            });

            this.cd.markForCheck();
        } else {
            this.uploading = true;
            this.msgs = [];
            let formData = new FormData();

            this.onBeforeUpload.emit({
                formData: formData,
            });

            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name!, this.files[i], this.files[i].name);
            }

            this.http
                .request(<string>this.method, this.url as string, {
                    body: formData,
                    headers: this.headers,
                    reportProgress: true,
                    observe: 'events',
                    withCredentials: this.withCredentials,
                })
                .subscribe(
                    (event: HttpEvent<any>) => {
                        switch (event.type) {
                            case HttpEventType.Sent:
                                this.onSend.emit({
                                    originalEvent: event,
                                    formData: formData,
                                });
                                break;
                            case HttpEventType.Response:
                                this.uploading = false;
                                this.progress = 0;

                                if (event['status'] >= 200 && event['status'] < 300) {
                                    if (this.fileLimit) {
                                        this.uploadedFileCount += this.files.length;
                                    }

                                    this.onUpload.emit({ originalEvent: event, files: this.files });
                                } else {
                                    this.onError.emit({ files: this.files });
                                }
                                this.uploadedFiles.push(...this.files);
                                this.clear();
                                break;
                            case HttpEventType.UploadProgress: {
                                if (event['loaded']) {
                                    this.progress = Math.round((event['loaded'] * 100) / event['total']!);
                                }

                                this.onProgress.emit({ originalEvent: event, progress: this.progress });
                                break;
                            }
                        }

                        this.cd.markForCheck();
                    },
                    (error: ErrorEvent) => {
                        this.uploading = false;
                        this.onError.emit({ files: this.files, error: error });
                    },
                );
        }
    }
    /**
     * Clears the files list.
     * @group Method
     */
    clear() {
        this.files = [];
        this.uploadedFileCount = 0;
        this.onClear.emit();
        this.clearInputElement();
        this.cd.markForCheck();
    }
    /**
     * Removes a single file.
     * @param {Event} event - Browser event.
     * @param {Number} index - Index of the file.
     * @group Method
     */
    remove(event: Event, index: number) {
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
        this.checkFileLimit(this.files);
    }
    /**
     * Removes uploaded file.
     * @param {Number} index - Index of the file to be removed.
     * @group Method
     */
    removeUploadedFile(index) {
        let removedFile = this.uploadedFiles.splice(index, 1)[0];
        this.uploadedFiles = [...this.uploadedFiles];
        this.onRemoveUploadedFile.emit({ file: removedFile, files: this.uploadedFiles });
    }

    isFileLimitExceeded() {
        const isAutoMode = this.auto;
        const totalFileCount = isAutoMode ? this.files.length : this.files.length + this.uploadedFileCount;

        if (this.fileLimit && this.fileLimit <= totalFileCount && this.focus) {
            this.focus = false;
        }

        return this.fileLimit && this.fileLimit < totalFileCount;
    }

    isChooseDisabled() {
        if (this.auto) {
            return this.fileLimit && this.fileLimit <= this.files.length;
        } else {
            return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
        }
    }

    checkFileLimit(files: File[]) {
        this.msgs ??= [];
        const hasExistingValidationMessages = this.msgs.length > 0 && this.fileLimit < files.length;
        if (this.isFileLimitExceeded() || hasExistingValidationMessages) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileLimitMessageSummary.replace('{0}', (this.fileLimit as number).toString()),
                detail: this.invalidFileLimitMessageDetail.replace('{0}', (this.fileLimit as number).toString()),
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

    hasUploadedFiles() {
        return this.uploadedFiles && this.uploadedFiles.length > 0;
    }

    onDragEnter(e: DragEvent) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onDragOver(e: DragEvent) {
        if (!this.disabled) {
            DomHandler.addClass(this.content?.nativeElement, 'p-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onDragLeave(event: DragEvent) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
        }
    }

    onDrop(event: any) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();

            let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            let allowDrop = this.multiple || (files && files.length === 1);

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

    formatSize(bytes: number) {
        const k = 1024;
        const dm = 3;
        const sizes = this.getTranslation(TranslationKeys.FILE_SIZE_TYPES);

        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = (bytes / Math.pow(k, i)).toFixed(dm);

        return `${formattedSize} ${sizes[i]}`;
    }

    onBasicUploaderClick() {
        if (this.hasFiles()) this.upload();
        else this.basicFileInput?.nativeElement.click();
    }

    onBasicKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Space':
            case 'Enter':
                this.onBasicUploaderClick();

                event.preventDefault();
                break;
        }
    }

    imageError(event: Event) {
        this.onImageError.emit(event);
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    get chooseButtonLabel(): string {
        return this.chooseLabel || this.config.getTranslation(TranslationKeys.CHOOSE);
    }

    get uploadButtonLabel(): string {
        return this.uploadLabel || this.config.getTranslation(TranslationKeys.UPLOAD);
    }

    get cancelButtonLabel(): string {
        return this.cancelLabel || this.config.getTranslation(TranslationKeys.CANCEL);
    }

    get browseFilesLabel(): string {
        return this.config.getTranslation(TranslationKeys.ARIA)[TranslationKeys.BROWSE_FILES];
    }

    get pendingLabel() {
        return this.config.getTranslation(TranslationKeys.PENDING);
    }

    ngOnDestroy() {
        if (this.content && this.content.nativeElement) {
            if (this.dragOverListener) {
                this.dragOverListener();
                this.dragOverListener = null;
            }
        }

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ButtonModule,
        ProgressBarModule,
        MessagesModule,
        RippleModule,
        PlusIcon,
        UploadIcon,
        TimesIcon,
    ],
    exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
    declarations: [FileUpload],
})
export class FileUploadModule {}
