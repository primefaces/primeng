import { isPlatformBrowser, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgModule,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { addClass, removeClass } from '@primeuix/utils';
import { BlockableUI, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Button, ButtonProps } from 'primeng/button';
import { PlusIcon, TimesIcon, UploadIcon } from 'primeng/icons';
import { Message } from 'primeng/message';
import { ProgressBar } from 'primeng/progressbar';
import { Ripple } from 'primeng/ripple';
import { VoidListener } from 'primeng/ts-helpers';
import { Subscription } from 'rxjs';
import { FileBeforeUploadEvent, FileProgressEvent, FileRemoveEvent, FileSelectEvent, FileSendEvent, FileUploadErrorEvent, FileUploadEvent, FileUploadHandlerEvent, RemoveUploadedFileEvent } from './fileupload.interface';
import { FileUploadStyle } from './style/fileuploadstyle';

/**
 * FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
 * @group Components
 */
@Component({
    selector: 'p-fileupload, p-fileUpload',
    imports: [Button, ProgressBar, Message, Ripple, PlusIcon, UploadIcon, TimesIcon, SharedModule, NgClass, NgStyle, NgTemplateOutlet],
    template: `
        @if (mode === 'advanced') {
            <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'fileupload'" [attr.data-pc-section]="'root'">
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
                    @if (!headerTemplate) {
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
                            [buttonProps]="chooseButtonProps"
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
                            @if (chooseIcon) {
                                <span [class]="chooseIcon" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'"></span>
                            }
                            @if (!chooseIcon) {
                                @if (!chooseiconTemplate) {
                                    <PlusIcon [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'" />
                                }
                                @if (chooseiconTemplate) {
                                    <span [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'">
                                        <ng-template *ngTemplateOutlet="chooseiconTemplate"></ng-template>
                                    </span>
                                }
                            }
                        </p-button>
                        @if (!auto && showUploadButton) {
                            <p-button [label]="uploadButtonLabel" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()" [styleClass]="'p-fileupload-upload-button ' + uploadStyleClass" [buttonProps]="uploadButtonProps">
                                @if (uploadIcon) {
                                    <span [ngClass]="uploadIcon" [attr.aria-hidden]="true"></span>
                                }
                                @if (!uploadIcon) {
                                    @if (!uploadiconTemplate) {
                                        <UploadIcon />
                                    }
                                    @if (uploadiconTemplate) {
                                        <span [attr.aria-hidden]="true">
                                            <ng-template *ngTemplateOutlet="uploadiconTemplate"></ng-template>
                                        </span>
                                    }
                                }
                            </p-button>
                        }
                        @if (!auto && showCancelButton) {
                            <p-button [label]="cancelButtonLabel" (onClick)="clear()" [disabled]="!hasFiles() || uploading" [styleClass]="'p-fileupload-cancel-button ' + cancelStyleClass" [buttonProps]="cancelButtonProps">
                                @if (cancelIcon) {
                                    <span [ngClass]="cancelIcon"></span>
                                }
                                @if (!cancelIcon) {
                                    @if (!canceliconTemplate) {
                                        <TimesIcon [attr.aria-hidden]="true" />
                                    }
                                    @if (canceliconTemplate) {
                                        <span [attr.aria-hidden]="true">
                                            <ng-template *ngTemplateOutlet="canceliconTemplate"></ng-template>
                                        </span>
                                    }
                                }
                            </p-button>
                        }
                    }
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
                <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [attr.data-pc-section]="'content'">
                    @if (hasFiles()) {
                        <p-progressbar [value]="progress" [showValue]="false"></p-progressbar>
                    }
                    @for (message of msgs; track message) {
                        <p-message [severity]="message.severity" [text]="message.text"></p-message>
                    }
                    @if (hasFiles()) {
                        <div class="p-fileupload-file-list">
                            @if (!fileTemplate) {
                                @for (file of files; track file; let i = $index) {
                                    <div class="p-fileupload-file">
                                        @if (isImage(file)) {
                                            <img [src]="file.objectURL" [width]="previewWidth" (error)="imageError($event)" class="p-fileupload-file-thumbnail" />
                                        }
                                        <div class="p-fileupload-file-info">
                                            <div class="p-fileupload-file-name">{{ file.name }}</div>
                                            <span class="p-fileupload-file-size">{{ formatSize(file.size) }}</span>
                                        </div>
                                        <div class="p-fileupload-file-actions">
                                            <p-button (onClick)="remove($event, i)" [disabled]="uploading" text rounded severity="danger" [styleClass]="'p-fileupload-file-remove-button ' + removeStyleClass">
                                                <ng-template #icon>
                                                    @if (!canceliconTemplate) {
                                                        <TimesIcon />
                                                    }
                                                    <ng-template *ngTemplateOutlet="canceliconTemplate"></ng-template>
                                                </ng-template>
                                            </p-button>
                                        </div>
                                    </div>
                                }
                            }
                            @if (fileTemplate) {
                                @for (file of files; track file) {
                                    <ng-template [ngTemplateOutlet]="fileTemplate"></ng-template>
                                }
                            }
                        </div>
                    }
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
                    @if (emptyTemplate && !hasFiles() && !hasUploadedFiles()) {
                        <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                    }
                </div>
            </div>
        }
        @if (mode === 'basic') {
            <div [ngClass]="'p-fileupload p-fileupload-basic p-component'" [class]="styleClass" [attr.data-pc-name]="'fileupload'">
                @for (message of msgs; track message) {
                    <p-message [severity]="message.severity" [text]="message.text"></p-message>
                }
                <p-button
                    [styleClass]="'p-fileupload-choose-button ' + chooseStyleClass"
                    [disabled]="disabled"
                    [label]="chooseButtonLabel"
                    [style]="style"
                    (onClick)="onBasicUploaderClick()"
                    (keydown)="onBasicKeydown($event)"
                    tabindex="0"
                    [buttonProps]="chooseButtonProps"
                >
                    <ng-template #icon>
                        @if (hasFiles() && !auto) {
                            @if (uploadIcon) {
                                <span class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                            }
                            @if (!uploadIcon) {
                                @if (!uploadiconTemplate) {
                                    <UploadIcon [styleClass]="'p-button-icon p-button-icon-left'" />
                                }
                                @if (uploadiconTemplate) {
                                    <span class="p-button-icon p-button-icon-left">
                                        <ng-template *ngTemplateOutlet="uploadiconTemplate"></ng-template>
                                    </span>
                                }
                            }
                        } @else {
                            @if (chooseIcon) {
                                <span class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                            }
                            @if (!chooseIcon) {
                                @if (!chooseiconTemplate) {
                                    <PlusIcon [attr.data-pc-section]="'uploadicon'" />
                                }
                                <ng-template *ngTemplateOutlet="chooseiconTemplate"></ng-template>
                            }
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
                        (focus)="onFocus()"
                        (blur)="onBlur()"
                        [attr.data-pc-section]="'input'"
                    />
                </p-button>
                @if (!auto) {
                    @if (!fileLabelTemplate) {
                        <span [class]="cx('filelabel')">
                            {{ basicFileChosenLabel() }}
                        </span>
                    } @else {
                        <ng-container *ngTemplateOutlet="fileLabelTemplate; context: { $implicit: files }"></ng-container>
                    }
                }
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FileUploadStyle]
})
export class FileUpload extends BaseComponent implements AfterViewInit, OnInit, OnDestroy, BlockableUI {
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
     * Used to pass all properties of the ButtonProps to the choose button inside the component.
     * @group Props
     */
    @Input() chooseButtonProps: ButtonProps;
    /**
     * Used to pass all properties of the ButtonProps to the upload button inside the component.
     * @group Props
     */
    @Input() uploadButtonProps: ButtonProps = { severity: 'secondary' };
    /**
     * Used to pass all properties of the ButtonProps to the cancel button inside the component.
     * @group Props
     */
    @Input() cancelButtonProps: ButtonProps = { severity: 'secondary' };
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

    /**
     * Template for file.
     * @group Templates
     */
    @ContentChild('file') public fileTemplate: TemplateRef<any> | undefined;

    /**
     * Template for header.
     * @group Templates
     */
    @ContentChild('header') public headerTemplate: TemplateRef<any> | undefined;

    /**
     * Template for content.
     * @group Templates
     */
    @ContentChild('content') public contentTemplate: TemplateRef<any> | undefined;

    /**
     * Template for toolbar.
     * @group Templates
     */
    @ContentChild('toolbar') public toolbarTemplate: TemplateRef<any> | undefined;

    /**
     * Template for choose icon.
     * @group Templates
     */
    @ContentChild('chooseicon') chooseiconTemplate: TemplateRef<any> | undefined;

    /**
     * Template for file label.
     * @group Templates
     */
    @ContentChild('filelabel') filelabelTemplate: TemplateRef<any> | undefined;

    /**
     * Template for upload icon.
     * @group Templates
     */
    @ContentChild('uploadicon') uploadiconTemplate: TemplateRef<any> | undefined;

    /**
     * Template for cancel icon.
     * @group Templates
     */
    @ContentChild('cancelicon') canceliconTemplate: TemplateRef<any> | undefined;

    /**
     * Template for empty state.
     * @group Templates
     */
    @ContentChild('empty') emptyTemplate: TemplateRef<any> | undefined;

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

    public msgs: any[] | undefined;

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
                        this.dragOverListener = this.renderer.listen(this.content.nativeElement, 'dragover', this.onDragOver.bind(this));
                    }
                });
            }
        }
    }

    basicFileChosenLabel() {
        if (this.auto) return this.chooseButtonLabel;
        else if (this.hasFiles()) {
            if (this.files && this.files.length === 1) return this.files[0].name;

            return this.config.getTranslation('fileChosenMessage')?.replace('{0}', this.files.length);
        }

        return this.config.getTranslation('noFileChosenMessage') || '';
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
            return !!(this.document.defaultView as any)['MSInputMethodContext'] && !!(this.document as any)['documentMode'];
        }
    }

    validate(file: File): boolean {
        this.msgs = this.msgs || [];
        if (this.accept && !this.isFileTypeValid(file)) {
            const text = `${this.invalidFileTypeMessageSummary.replace('{0}', file.name)} ${this.invalidFileTypeMessageDetail.replace('{0}', this.accept)}`;
            this.msgs.push({
                severity: 'error',
                text: text
            });
            return false;
        }

        if (this.maxFileSize && file.size > this.maxFileSize) {
            const text = `${this.invalidFileSizeMessageSummary.replace('{0}', file.name)} ${this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))}`;
            this.msgs.push({
                severity: 'error',
                text: text
            });
            return false;
        }

        return true;
    }

    private isFileTypeValid(file: File): boolean {
        let acceptableTypes = this.accept?.split(',').map((type) => type.trim());
        for (let type of acceptableTypes!) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();

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
    uploader() {
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
            }

            this.uploadHandler.emit({
                files: this.files
            });

            this.cd.markForCheck();
        } else {
            this.uploading = true;
            this.msgs = [];
            let formData = new FormData();

            this.onBeforeUpload.emit({
                formData: formData
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
                    withCredentials: this.withCredentials
                })
                .subscribe(
                    (event: HttpEvent<any>) => {
                        switch (event.type) {
                            case HttpEventType.Sent:
                                this.onSend.emit({
                                    originalEvent: event,
                                    formData: formData
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
                    }
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
            const text = `${this.invalidFileLimitMessageSummary.replace('{0}', (this.fileLimit as number).toString())} ${this.invalidFileLimitMessageDetail.replace('{0}', (this.fileLimit as number).toString())}`;
            this.msgs.push({
                severity: 'error',
                text: text
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
            addClass(this.content?.nativeElement, 'p-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onDragLeave(event: DragEvent) {
        if (!this.disabled) {
            removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
        }
    }

    onDrop(event: any) {
        if (!this.disabled) {
            removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
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

    upload() {
        if (this.hasFiles()) this.uploader();
    }

    onBasicUploaderClick() {
        this.basicFileInput?.nativeElement.click();
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
    imports: [FileUpload, SharedModule],
    exports: [FileUpload, SharedModule]
})
export class FileUploadModule {}
