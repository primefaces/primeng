import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, effect, ElementRef, inject, input, NgModule, numberAttribute, output, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { addClass, removeClass } from '@primeuix/utils';
import { BlockableUI, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Button, ButtonProps } from 'primeng/button';
import { Plus as PlusIcon } from '@primeicons/angular/plus';
import { Times as TimesIcon } from '@primeicons/angular/times';
import { Upload as UploadIcon } from '@primeicons/angular/upload';
import { Message } from 'primeng/message';
import { ProgressBar } from 'primeng/progressbar';
import type { CSSProperties } from 'primeng/types/shared';
import { VoidListener } from 'primeng/ts-helpers';
import {
    FileBeforeUploadEvent,
    FileContentRemoveEvent,
    FileProgressEvent,
    FileRemoveEvent,
    FileSelectEvent,
    FileSendEvent,
    FileUploadContentTemplateContext,
    FileUploadErrorEvent,
    FileUploadEvent,
    FileUploadFileLabelTemplateContext,
    FileUploadFileTemplateContext,
    FileUploadHandlerEvent,
    FileUploadHeaderTemplateContext,
    FileUploadMessage,
    FileUploadPassThrough,
    RemoveUploadedFileEvent
} from 'primeng/types/fileupload';
import { Subscription } from 'rxjs';
import { FileContent } from './file-content';
import { FILEUPLOAD_INSTANCE } from './fileupload-token';
import { FileUploadStyle } from './style/fileuploadstyle';

/**
 * FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
 * @group Components
 */
@Component({
    selector: 'p-fileupload',
    standalone: true,
    imports: [NgTemplateOutlet, Button, ProgressBar, Message, PlusIcon, UploadIcon, TimesIcon, SharedModule, FileContent, Bind],
    template: `
        @if (isAdvancedMode()) {
            <div [class]="cn(cx('root'), styleClass())" [style]="style()" [pBind]="ptm('root')">
                <input [attr.aria-label]="browseFilesLabel" #advancedfileinput type="file" (change)="onFileSelect($event)" [multiple]="multiple()" [accept]="accept()" [disabled]="chooseButtonDisabled()" [attr.title]="''" [pBind]="ptm('input')" />
                <div [class]="cx('header')" [pBind]="ptm('header')">
                    @if (!headerTemplate()) {
                        <p-button
                            [styleClass]="cn(cx('pcChooseButton'), chooseStyleClass())"
                            [disabled]="chooseButtonDisabled()"
                            (focus)="onFocus()"
                            [label]="chooseButtonLabel"
                            (blur)="onBlur()"
                            (onClick)="choose()"
                            (keydown.enter)="choose()"
                            [buttonProps]="chooseButtonProps()"
                            [pt]="ptm('pcChooseButton')"
                            [unstyled]="unstyled()"
                        >
                            <input
                                [attr.aria-label]="browseFilesLabel"
                                #advancedfileinput
                                type="file"
                                (change)="onFileSelect($event)"
                                [multiple]="multiple()"
                                [accept]="accept()"
                                [disabled]="chooseButtonDisabled()"
                                [attr.title]="''"
                                [pBind]="ptm('input')"
                            />
                            <ng-template #icon>
                                @if (chooseIcon()) {
                                    <span [class]="chooseIcon()" [attr.aria-label]="true" [pBind]="ptm('pcChooseButton')?.icon"></span>
                                } @else {
                                    @if (!chooseIconTemplate()) {
                                        <svg data-p-icon="plus" [attr.aria-label]="true" [pBind]="ptm('pcChooseButton')?.icon" />
                                    } @else {
                                        <span [attr.aria-label]="true" [pBind]="ptm('pcChooseButton')?.icon">
                                            <ng-container *ngTemplateOutlet="chooseIconTemplate()"></ng-container>
                                        </span>
                                    }
                                }
                            </ng-template>
                        </p-button>

                        @if (showUploadBtn()) {
                            <p-button
                                [label]="uploadButtonLabel"
                                (onClick)="upload()"
                                [disabled]="uploadButtonDisabled()"
                                [styleClass]="cn(cx('pcUploadButton'), uploadStyleClass())"
                                [buttonProps]="uploadButtonProps()"
                                [pt]="ptm('pcUploadButton')"
                                [unstyled]="unstyled()"
                            >
                                <ng-template #icon>
                                    @if (uploadIcon()) {
                                        <span [class]="uploadIcon()" [attr.aria-hidden]="true" [pBind]="ptm('pcUploadButton')?.icon"></span>
                                    } @else {
                                        @if (!uploadIconTemplate()) {
                                            <svg data-p-icon="upload" [pBind]="ptm('pcUploadButton')?.icon" />
                                        } @else {
                                            <span [attr.aria-hidden]="true" [pBind]="ptm('pcUploadButton')?.icon">
                                                <ng-container *ngTemplateOutlet="uploadIconTemplate()"></ng-container>
                                            </span>
                                        }
                                    }
                                </ng-template>
                            </p-button>
                        }
                        @if (showCancelBtn()) {
                            <p-button
                                [label]="cancelButtonLabel"
                                (onClick)="clear()"
                                [disabled]="cancelButtonDisabled()"
                                [styleClass]="cn(cx('pcCancelButton'), cancelStyleClass())"
                                [buttonProps]="cancelButtonProps()"
                                [pt]="ptm('pcCancelButton')"
                                [unstyled]="unstyled()"
                            >
                                <ng-template #icon>
                                    @if (cancelIcon()) {
                                        <span [class]="cancelIcon()"></span>
                                    } @else {
                                        @if (!cancelIconTemplate()) {
                                            <svg data-p-icon="times" [attr.aria-hidden]="true" />
                                        } @else {
                                            <span [attr.aria-hidden]="true">
                                                <ng-container *ngTemplateOutlet="cancelIconTemplate()"></ng-container>
                                            </span>
                                        }
                                    }
                                </ng-template>
                            </p-button>
                        }
                    }
                    <ng-container *ngTemplateOutlet="headerTemplate(); context: headerTemplateContext"></ng-container>
                    <ng-container *ngTemplateOutlet="toolbarTemplate()"></ng-container>
                </div>
                <div #content [class]="cx('content')" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [pBind]="ptm('content')">
                    @if (contentTemplate()) {
                        <ng-container *ngTemplateOutlet="contentTemplate(); context: contentTemplateContext"></ng-container>
                    } @else {
                        @if (hasFiles()) {
                            <p-progressbar [value]="progress()" [showValue]="false" [pt]="ptm('pcProgressBar')"></p-progressbar>
                        }
                        @for (message of msgs(); track message) {
                            <p-message [severity]="message.severity" [pt]="ptm('pcMessage')" [unstyled]="unstyled()">{{ message.text }}</p-message>
                        }

                        @if (hasFiles()) {
                            <div [class]="cx('fileList')" [pBind]="ptm('fileList')">
                                @if (fileTemplate()) {
                                    @for (file of files; track file.name) {
                                        <ng-container *ngTemplateOutlet="fileTemplate(); context: getFileTemplateContext(file)"></ng-container>
                                    }
                                } @else {
                                    <div pFileContent [unstyled]="unstyled()" [files]="files" (onRemove)="onRemoveClick($event)" [badgeValue]="pendingLabel" [previewWidth]="previewWidth()" [fileRemoveIconTemplate]="cancelIconTemplate()"></div>
                                }
                            </div>
                        }
                        @if (hasUploadedFiles()) {
                            <div [class]="cx('fileList')" [pBind]="ptm('fileList')">
                                @if (fileTemplate()) {
                                    @for (file of uploadedFiles(); track file.name) {
                                        <ng-container *ngTemplateOutlet="fileTemplate(); context: getFileTemplateContext(file)"></ng-container>
                                    }
                                } @else {
                                    <div
                                        pFileContent
                                        [unstyled]="unstyled()"
                                        [files]="uploadedFiles()"
                                        (onRemove)="onRemoveUploadedFileClick($event)"
                                        [badgeValue]="completedLabel()"
                                        badgeSeverity="success"
                                        [previewWidth]="previewWidth()"
                                        [fileRemoveIconTemplate]="cancelIconTemplate()"
                                    ></div>
                                }
                            </div>
                        }
                    }
                    @if (showEmpty()) {
                        <ng-container *ngTemplateOutlet="emptyTemplate()" [pBind]="ptm('empty')"></ng-container>
                    }
                </div>
            </div>
        }
        @if (isBasicMode()) {
            <div [class]="cn(cx('root'), styleClass())" [pBind]="ptm('root')">
                @for (message of msgs(); track message) {
                    <p-message [severity]="message.severity" [pt]="ptm('pcMessage')" [unstyled]="unstyled()">{{ message.text }}</p-message>
                }

                <div [class]="cx('basicContent')" [pBind]="ptm('basicContent')">
                    <p-button
                        [styleClass]="cn(cx('pcChooseButton'), chooseStyleClass())"
                        [disabled]="disabled()"
                        [label]="chooseButtonLabel"
                        [style]="style()"
                        (onClick)="onBasicUploaderClick()"
                        (keydown)="onBasicKeydown($event)"
                        [buttonProps]="chooseButtonProps()"
                        [pt]="ptm('pcChooseButton')"
                        [unstyled]="unstyled()"
                    >
                        <ng-template #icon>
                            @if (hasFiles() && !auto()) {
                                @if (uploadIcon()) {
                                    <span [class]="cn('p-button-icon p-button-icon-left', uploadIcon())" [pBind]="ptm('pcChooseButton')?.icon"></span>
                                } @else {
                                    @if (!uploadIconTemplate()) {
                                        <svg data-p-icon="upload" [class]="'p-button-icon p-button-icon-left'" [pBind]="ptm('pcChooseButton')?.icon" />
                                    } @else {
                                        <span class="p-button-icon p-button-icon-left" [pBind]="ptm('pcChooseButton')?.icon">
                                            <ng-container *ngTemplateOutlet="uploadIconTemplate()"></ng-container>
                                        </span>
                                    }
                                }
                            } @else {
                                @if (chooseIcon()) {
                                    <span [class]="cn('p-button-icon p-button-icon-left pi', chooseIcon())" [pBind]="ptm('pcChooseButton')?.icon"></span>
                                } @else {
                                    @if (!chooseIconTemplate()) {
                                        <svg data-p-icon="plus" [pBind]="ptm('pcChooseButton')?.icon" />
                                    } @else {
                                        <ng-container *ngTemplateOutlet="chooseIconTemplate()"></ng-container>
                                    }
                                }
                            }
                        </ng-template>
                        <input
                            [attr.aria-label]="browseFilesLabel"
                            #basicfileinput
                            type="file"
                            [accept]="accept()"
                            [multiple]="multiple()"
                            [disabled]="disabled()"
                            (change)="onFileSelect($event)"
                            (focus)="onFocus()"
                            (blur)="onBlur()"
                            [pBind]="ptm('input')"
                        />
                    </p-button>
                    @if (!auto()) {
                        @if (!fileLabelTemplate()) {
                            <span>
                                {{ basicFileChosenLabel() }}
                            </span>
                        } @else {
                            <ng-container *ngTemplateOutlet="fileLabelTemplate(); context: fileLabelTemplateContext"></ng-container>
                        }
                    }
                </div>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FileUploadStyle, { provide: FILEUPLOAD_INSTANCE, useExisting: FileUpload }, { provide: PARENT_INSTANCE, useExisting: FileUpload }],
    hostDirectives: [Bind]
})
export class FileUpload extends BaseComponent<FileUploadPassThrough> implements BlockableUI {
    componentName = 'FileUpload';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    /**
     * Name of the request parameter to identify the files at backend.
     * @group Props
     */
    name = input<string>();
    /**
     * Remote url to upload the files.
     * @group Props
     */
    url = input<string>();
    /**
     * HTTP method to send the files to the url such as "post" and "put".
     * @group Props
     */
    method = input<'post' | 'put'>('post');
    /**
     * Used to select multiple files at once from file dialog.
     * @group Props
     */
    multiple = input(false, { transform: booleanAttribute });
    /**
     * Comma-separated list of pattern to restrict the allowed file types. Can be any combination of either the MIME types (such as "image/*") or the file extensions (such as ".jpg").
     * @group Props
     */
    accept = input<string>();
    /**
     * Disables the upload functionality.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });
    /**
     * When enabled, upload begins automatically after selection is completed.
     * @group Props
     */
    auto = input(false, { transform: booleanAttribute });
    /**
     * Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.
     * @group Props
     */
    withCredentials = input(false, { transform: booleanAttribute });
    /**
     * Maximum file size allowed in bytes.
     * @group Props
     */
    maxFileSize = input<number, unknown>(undefined, { transform: numberAttribute });
    /**
     * Summary message of the invalid file size.
     * @group Props
     */
    invalidFileSizeMessageSummary = input('{0}: Invalid file size, ');
    /**
     * Detail message of the invalid file size.
     * @group Props
     */
    invalidFileSizeMessageDetail = input('maximum upload size is {0}.');
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    invalidFileTypeMessageSummary = input('{0}: Invalid file type, ');
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    invalidFileTypeMessageDetail = input('allowed file types: {0}.');
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    invalidFileLimitMessageDetail = input('limit is {0} at most.');
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    invalidFileLimitMessageSummary = input('Maximum number of files exceeded, ');
    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<CSSProperties>();
    /**
     * Class of the element.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Width of the image thumbnail in pixels.
     * @group Props
     */
    previewWidth = input(50, { transform: numberAttribute });
    /**
     * Label of the choose button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    chooseLabel = input<string>();
    /**
     * Label of the upload button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    uploadLabel = input<string>();
    /**
     * Label of the cancel button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    cancelLabel = input<string>();
    /**
     * Icon of the choose button.
     * @group Props
     */
    chooseIcon = input<string>();
    /**
     * Icon of the upload button.
     * @group Props
     */
    uploadIcon = input<string>();
    /**
     * Icon of the cancel button.
     * @group Props
     */
    cancelIcon = input<string>();
    /**
     * Whether to show the upload button.
     * @group Props
     */
    showUploadButton = input(true, { transform: booleanAttribute });
    /**
     * Whether to show the cancel button.
     * @group Props
     */
    showCancelButton = input(true, { transform: booleanAttribute });
    /**
     * Defines the UI of the component.
     * @group Props
     */
    mode = input<'advanced' | 'basic'>('advanced');
    /**
     * HttpHeaders class represents the header configuration options for an HTTP request.
     * @group Props
     */
    headers = input<HttpHeaders>();
    /**
     * Whether to use the default upload or a manual implementation defined in uploadHandler callback. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    customUpload = input(false, { transform: booleanAttribute });
    /**
     * Maximum number of files that can be uploaded.
     * @group Props
     */
    fileLimit = input<number, unknown>(undefined, { transform: numberAttribute });
    /**
     * Style class of the upload button.
     * @group Props
     */
    uploadStyleClass = input<string>();
    /**
     * Style class of the cancel button.
     * @group Props
     */
    cancelStyleClass = input<string>();
    /**
     * Style class of the remove button.
     * @group Props
     */
    removeStyleClass = input<string>();
    /**
     * Style class of the choose button.
     * @group Props
     */
    chooseStyleClass = input<string>();
    /**
     * Used to pass all properties of the ButtonProps to the choose button inside the component.
     * @group Props
     */
    chooseButtonProps = input<ButtonProps>();
    /**
     * Used to pass all properties of the ButtonProps to the upload button inside the component.
     * @group Props
     */
    uploadButtonProps = input<ButtonProps>({ severity: 'secondary' });
    /**
     * Used to pass all properties of the ButtonProps to the cancel button inside the component.
     * @group Props
     */
    cancelButtonProps = input<ButtonProps>({ severity: 'secondary' });
    /**
     * Callback to invoke before file upload is initialized.
     * @param {FileBeforeUploadEvent} event - Custom upload event.
     * @group Emits
     */
    onBeforeUpload = output<FileBeforeUploadEvent>();
    /**
     * An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.
     * @param {FileSendEvent} event - Custom send event.
     * @group Emits
     */
    onSend = output<FileSendEvent>();
    /**
     * Callback to invoke when file upload is complete.
     * @param {FileUploadEvent} event - Custom upload event.
     * @group Emits
     */
    onUpload = output<FileUploadEvent>();
    /**
     * Callback to invoke if file upload fails.
     * @param {FileUploadErrorEvent} event - Custom error event.
     * @group Emits
     */
    onError = output<FileUploadErrorEvent>();
    /**
     * Callback to invoke when files in queue are removed without uploading using clear all button.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClear = output<void>();
    /**
     * Callback to invoke when a file is removed without uploading using clear button of a file.
     * @param {FileRemoveEvent} event - Remove event.
     * @group Emits
     */
    onRemove = output<FileRemoveEvent>();
    /**
     * Callback to invoke when files are selected.
     * @param {FileSelectEvent} event - Select event.
     * @group Emits
     */
    onSelect = output<FileSelectEvent>();
    /**
     * Callback to invoke when files are being uploaded.
     * @param {FileProgressEvent} event - Progress event.
     * @group Emits
     */
    onProgress = output<FileProgressEvent>();
    /**
     * Callback to invoke in custom upload mode to upload the files manually.
     * @param {FileUploadHandlerEvent} event - Upload handler event.
     * @group Emits
     */
    uploadHandler = output<FileUploadHandlerEvent>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = output<Event>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {RemoveUploadedFileEvent} event - Remove event.
     * @group Emits
     */
    onRemoveUploadedFile = output<RemoveUploadedFileEvent>();

    /**
     * Custom file template.
     * @group Templates
     */
    fileTemplate = contentChild<TemplateRef<void>>('file', { descendants: false });

    /**
     * Custom header template.
     * @param {FileUploadHeaderTemplateContext} context - header template context.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<FileUploadHeaderTemplateContext>>('header', { descendants: false });

    /**
     * Custom content template.
     * @param {FileUploadContentTemplateContext} context - content template context.
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<FileUploadContentTemplateContext>>('content', { descendants: false });

    /**
     * Custom toolbar template.
     * @group Templates
     */
    toolbarTemplate = contentChild<TemplateRef<void>>('toolbar', { descendants: false });

    /**
     * Custom choose icon template.
     * @group Templates
     */
    chooseIconTemplate = contentChild<TemplateRef<void>>('chooseicon', { descendants: false });

    /**
     * Custom file label template.
     * @param {FileUploadFileLabelTemplateContext} context - file label template context.
     * @group Templates
     */
    fileLabelTemplate = contentChild<TemplateRef<FileUploadFileLabelTemplateContext>>('filelabel', { descendants: false });

    /**
     * Custom upload icon template.
     * @group Templates
     */
    uploadIconTemplate = contentChild<TemplateRef<void>>('uploadicon', { descendants: false });

    /**
     * Custom cancel icon template.
     * @group Templates
     */
    cancelIconTemplate = contentChild<TemplateRef<void>>('cancelicon', { descendants: false });

    /**
     * Custom empty state template.
     * @group Templates
     */
    emptyTemplate = contentChild<TemplateRef<void>>('empty', { descendants: false });

    isAdvancedMode = computed(() => this.mode() === 'advanced');

    isBasicMode = computed(() => this.mode() === 'basic');

    showUploadBtn = computed(() => !this.auto() && this.showUploadButton());

    showCancelBtn = computed(() => !this.auto() && this.showCancelButton());

    chooseButtonDisabled = computed(() => this.disabled() || this.isChooseDisabled());

    uploadButtonDisabled = computed(() => !this.hasFiles() || this.isFileLimitExceeded());

    cancelButtonDisabled = computed(() => !this.hasFiles() || this.uploading());

    showEmpty = computed(() => !!this.emptyTemplate() && !this.hasFiles() && !this.hasUploadedFiles());

    get headerTemplateContext(): FileUploadHeaderTemplateContext {
        return {
            $implicit: this.files,
            uploadedFiles: this.uploadedFiles(),
            chooseCallback: this.choose.bind(this),
            clearCallback: this.clear.bind(this),
            uploadCallback: this.upload.bind(this)
        };
    }

    get contentTemplateContext(): FileUploadContentTemplateContext {
        return {
            $implicit: this.files,
            uploadedFiles: this.uploadedFiles(),
            chooseCallback: this.choose.bind(this),
            clearCallback: this.clear.bind(this),
            removeUploadedFileCallback: this.removeUploadedFile.bind(this),
            removeFileCallback: this.remove.bind(this),
            progress: this.progress(),
            messages: this.msgs()
        };
    }

    get fileLabelTemplateContext(): FileUploadFileLabelTemplateContext {
        return {
            $implicit: this.files
        };
    }

    advancedFileInput = viewChild<ElementRef>('advancedfileinput');

    basicFileInput = viewChild<ElementRef>('basicfileinput');

    contentEl = viewChild<ElementRef>('content');

    /**
     * Files input.
     * @group Props
     */
    filesInput = input<File[]>([], { alias: 'files' });

    get files(): File[] {
        return this._files();
    }

    set files(value: File[]) {
        this._files.set(value);
    }

    public get basicButtonLabel(): string {
        if (this.auto() || !this.hasFiles()) {
            return this.chooseLabel() as string;
        }

        return this.uploadLabel() ?? this.files[0].name;
    }

    public _files = signal<File[]>([]);

    public progress = signal(0);

    public dragHighlight = signal(false);

    public msgs = signal<FileUploadMessage[]>([]);

    public uploadedFileCount: number = 0;

    focus = signal(false);

    uploading = signal(false);

    duplicateIEEvent: boolean | undefined; // flag to recognize duplicate onchange event for file input

    translationSubscription: Subscription | undefined;

    dragOverListener: VoidListener;

    public uploadedFiles = signal<File[]>([]);

    sanitizer = inject(DomSanitizer);

    http = inject(HttpClient);

    _componentStyle = inject(FileUploadStyle);

    constructor() {
        super();

        effect(() => {
            const inputFiles = this.filesInput();
            if (inputFiles && inputFiles.length > 0) {
                const newFiles: File[] = [];
                for (let i = 0; i < inputFiles.length; i++) {
                    let file = inputFiles[i];
                    if (this.validate(file)) {
                        if (this.isImage(file)) {
                            (file as any).objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(inputFiles[i]));
                        }
                        newFiles.push(inputFiles[i]);
                    }
                }
                this._files.set(newFiles);
            }
        });
    }

    onInit() {
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
    }

    onAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.mode() === 'advanced') {
                const contentEl = this.contentEl();
                if (contentEl) {
                    this.dragOverListener = this.renderer.listen(contentEl.nativeElement, 'dragover', this.onDragOver.bind(this));
                }
            }
        }
    }

    basicFileChosenLabel() {
        if (this.auto()) return this.chooseButtonLabel;
        else if (this.hasFiles()) {
            if (this.files && this.files.length === 1) return this.files[0].name;

            return this.translate('fileChosenMessage')?.replace('{0}', this.files.length.toString());
        }

        return this.translate('noFileChosenMessage') || '';
    }

    completedLabel() {
        return this.translate('completed') || '';
    }

    choose() {
        this.advancedFileInput()?.nativeElement.click();
    }

    onFileSelect(event: Event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }

        if (!this.multiple()) {
            this.files = [];
        }

        this.msgs.set([]);
        this.files = this.files || [];
        let files = (event as DragEvent).dataTransfer ? (event as DragEvent).dataTransfer!.files : (event.target as HTMLInputElement).files!;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        (file as any).objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                    }

                    this.files.push(files[i]);
                }
            }
        }

        this.files = [...this.files];
        this.onSelect.emit({ originalEvent: event, files: files, currentFiles: this.files });

        // this will check the fileLimit with the uploaded files
        this.checkFileLimit(files);

        if (this.hasFiles() && this.auto() && (this.mode() !== 'advanced' || !this.isFileLimitExceeded())) {
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
        const acceptVal = this.accept();
        if (acceptVal && !this.isFileTypeValid(file)) {
            const text = `${this.invalidFileTypeMessageSummary().replace('{0}', file.name)} ${this.invalidFileTypeMessageDetail().replace('{0}', acceptVal)}`;
            this.msgs.update((msgs) => [...msgs, { severity: 'error', text }]);
            return false;
        }

        const maxFileSizeVal = this.maxFileSize();
        if (maxFileSizeVal && file.size > maxFileSizeVal) {
            const text = `${this.invalidFileSizeMessageSummary().replace('{0}', file.name)} ${this.invalidFileSizeMessageDetail().replace('{0}', this.formatSize(maxFileSizeVal))}`;
            this.msgs.update((msgs) => [...msgs, { severity: 'error', text }]);
            return false;
        }

        return true;
    }

    private isFileTypeValid(file: File): boolean {
        const acceptVal = this.accept();
        let acceptableTypes = acceptVal?.split(',').map((type) => type.trim());
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

    onImageLoad(img: HTMLImageElement) {
        window.URL.revokeObjectURL(img.src);
    }
    /**
     * Uploads the selected files.
     * @group Method
     */
    uploader() {
        if (this.customUpload()) {
            const fileLimitVal = this.fileLimit();
            if (fileLimitVal) {
                this.uploadedFileCount += this.files.length;
            }

            this.uploadHandler.emit({
                files: this.files
            });
        } else {
            this.uploading.set(true);
            this.msgs.set([]);
            let formData = new FormData();

            this.onBeforeUpload.emit({
                formData: formData
            });

            const nameVal = this.name();
            for (let i = 0; i < this.files.length; i++) {
                formData.append(nameVal!, this.files[i], this.files[i].name);
            }

            this.http
                .request(this.method(), this.url() as string, {
                    body: formData,
                    headers: this.headers(),
                    reportProgress: true,
                    observe: 'events',
                    withCredentials: this.withCredentials()
                })
                .subscribe({
                    next: (event: HttpEvent<any>) => {
                        switch (event.type) {
                            case HttpEventType.Sent:
                                this.onSend.emit({
                                    originalEvent: event,
                                    formData: formData
                                });
                                break;
                            case HttpEventType.Response:
                                this.uploading.set(false);
                                this.progress.set(0);

                                if (event['status'] >= 200 && event['status'] < 300) {
                                    const fileLimitVal = this.fileLimit();
                                    if (fileLimitVal) {
                                        this.uploadedFileCount += this.files.length;
                                    }

                                    this.onUpload.emit({ originalEvent: event, files: this.files });
                                } else {
                                    this.onError.emit({ files: this.files });
                                }
                                this.uploadedFiles.update((files) => [...files, ...this.files]);
                                this.clear();
                                break;
                            case HttpEventType.UploadProgress: {
                                if (event['loaded']) {
                                    this.progress.set(Math.round((event['loaded'] * 100) / event['total']!));
                                }

                                this.onProgress.emit({ originalEvent: event, progress: this.progress() });
                                break;
                            }
                        }
                    },
                    error: (error: ErrorEvent) => {
                        this.uploading.set(false);
                        this.onError.emit({ files: this.files, error: error });
                    }
                });
        }
    }
    onRemoveClick(e: FileContentRemoveEvent) {
        const { event, index } = e;
        if (this.hasFiles()) {
            this.remove(event, index);
        }
    }
    onRemoveUploadedFileClick(e: Pick<FileContentRemoveEvent, 'index'>) {
        const { index } = e;
        if (this.hasUploadedFiles()) {
            this.removeUploadedFile(index);
        }
    }
    /**
     * Clears the files list.
     * @group Method
     */
    clear() {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
        this.msgs.set([]);
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
        this.files = [...this.files];
        this.checkFileLimit(this.files);
    }
    /**
     * Removes uploaded file.
     * @param {Number} index - Index of the file to be removed.
     * @group Method
     */
    removeUploadedFile(index: number) {
        const currentFiles = this.uploadedFiles();
        const removedFile = currentFiles[index];
        this.uploadedFiles.set(currentFiles.filter((_, i) => i !== index));
        this.onRemoveUploadedFile.emit({ file: removedFile, files: this.uploadedFiles() });
    }

    isFileLimitExceeded() {
        const isAutoMode = this.auto();
        const totalFileCount = isAutoMode ? this.files.length : this.files.length + this.uploadedFileCount;
        const fileLimitVal = this.fileLimit();

        if (fileLimitVal && fileLimitVal <= totalFileCount && this.focus()) {
            this.focus.set(false);
        }

        return fileLimitVal && fileLimitVal < totalFileCount;
    }

    isChooseDisabled() {
        const fileLimitVal = this.fileLimit();
        if (this.auto()) {
            return fileLimitVal && fileLimitVal <= this.files.length;
        } else {
            return fileLimitVal && fileLimitVal <= this.files.length + this.uploadedFileCount;
        }
    }

    checkFileLimit(files: FileList | File[]) {
        const fileLimitVal = this.fileLimit();
        const currentMsgs = this.msgs();
        const hasExistingValidationMessages = currentMsgs.length > 0 && fileLimitVal && fileLimitVal < files.length;

        if (this.isFileLimitExceeded() || hasExistingValidationMessages) {
            const text = `${this.invalidFileLimitMessageSummary().replace('{0}', (fileLimitVal as number).toString())} ${this.invalidFileLimitMessageDetail().replace('{0}', (fileLimitVal as number).toString())}`;
            this.msgs.update((msgs) => [...msgs, { severity: 'error', text }]);
        } else {
            this.msgs.update((msgs) => msgs.filter((msg) => !msg.text.includes(this.invalidFileLimitMessageSummary())));
        }
    }

    clearInputElement() {
        const advancedInput = this.advancedFileInput();
        if (advancedInput && advancedInput.nativeElement) {
            advancedInput.nativeElement.value = '';
        }

        const basicInput = this.basicFileInput();
        if (basicInput && basicInput.nativeElement) {
            basicInput.nativeElement.value = '';
        }
    }

    clearIEInput() {
        const advancedInput = this.advancedFileInput();
        if (advancedInput && advancedInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            advancedInput.nativeElement.value = '';
        }
    }

    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }

    hasUploadedFiles() {
        return this.uploadedFiles().length > 0;
    }

    getFileTemplateContext(file: File): FileUploadFileTemplateContext {
        return { $implicit: file };
    }

    onDragEnter(e: DragEvent) {
        if (!this.disabled()) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onDragOver(e: DragEvent) {
        if (!this.disabled()) {
            const contentEl = this.contentEl();
            !this.$unstyled() && addClass(contentEl?.nativeElement, 'p-fileupload-highlight');
            contentEl?.nativeElement.setAttribute('data-p-highlight', true);
            this.dragHighlight.set(true);
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onDragLeave(_event: DragEvent) {
        if (!this.disabled()) {
            const contentEl = this.contentEl();
            !this.$unstyled() && removeClass(contentEl?.nativeElement, 'p-fileupload-highlight');
            contentEl?.nativeElement.setAttribute('data-p-highlight', false);
        }
    }

    onDrop(event: DragEvent) {
        if (!this.disabled()) {
            const contentEl = this.contentEl();
            !this.$unstyled() && removeClass(contentEl?.nativeElement, 'p-fileupload-highlight');
            contentEl?.nativeElement.setAttribute('data-p-highlight', false);
            event.stopPropagation();
            event.preventDefault();

            let files = event.dataTransfer ? event.dataTransfer.files : (event.target as HTMLInputElement).files;
            let allowDrop = this.multiple() || (files && files.length === 1);

            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    }

    onFocus() {
        this.focus.set(true);
    }

    onBlur() {
        this.focus.set(false);
    }

    formatSize(bytes: number) {
        const k = 1024;
        const dm = 3;
        const sizes = this.translate(TranslationKeys.FILE_SIZE_TYPES);

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
        this.basicFileInput()?.nativeElement.click();
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
        return this.chooseLabel() || this.translate(TranslationKeys.CHOOSE);
    }

    get uploadButtonLabel(): string {
        return this.uploadLabel() || this.translate(TranslationKeys.UPLOAD);
    }

    get cancelButtonLabel(): string {
        return this.cancelLabel() || this.translate(TranslationKeys.CANCEL);
    }

    get browseFilesLabel(): string {
        return this.translate(TranslationKeys.ARIA, TranslationKeys.BROWSE_FILES);
    }

    get pendingLabel() {
        return this.translate(TranslationKeys.PENDING);
    }

    onDestroy() {
        const contentEl = this.contentEl();
        if (contentEl && contentEl.nativeElement) {
            if (this.dragOverListener) {
                this.dragOverListener();
                this.dragOverListener = null;
            }
        }

        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [FileUpload, SharedModule],
    exports: [FileUpload, SharedModule]
})
export class FileUploadModule {}
