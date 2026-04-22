import { HttpEvent } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { BadgePassThrough } from 'primeng/types/badge';
import type { ButtonPassThrough } from 'primeng/types/button';
import type { MessagePassThrough } from 'primeng/types/message';
import type { ProgressBarPassThrough } from 'primeng/types/progressbar';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link FileUpload.pt}
 * @group Interface
 */
export interface FileUploadPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the input's DOM element.
     */
    input?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the choose button component.
     */
    pcChooseButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the upload button component.
     */
    pcUploadButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the cancel button component.
     */
    pcCancelButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the progress bar component.
     */
    pcProgressBar?: ProgressBarPassThrough;
    /**
     * Used to pass attributes to the message component.
     */
    pcMessage?: MessagePassThrough;
    /**
     * Used to pass attributes to the file list's DOM element.
     */
    fileList?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the file's DOM element.
     */
    file?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the file thumbnail's DOM element.
     */
    fileThumbnail?: PassThroughOption<HTMLImageElement, I>;
    /**
     * Used to pass attributes to the file info's DOM element.
     */
    fileInfo?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the file name's DOM element.
     */
    fileName?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the file size's DOM element.
     */
    fileSize?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the file badge component.
     */
    pcFileBadge?: BadgePassThrough;
    /**
     * Used to pass attributes to the file actions's DOM element.
     */
    fileActions?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the file remove button component.
     */
    pcFileRemoveButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the basic content's DOM element.
     */
    basicContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the empty's DOM element.
     */
    empty?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in FileUpload.
 * @see {@link FileUploadPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type FileUploadPassThrough<I = unknown> = PassThrough<I, FileUploadPassThroughOptions<I>>;

/**
 * Upload event.
 * @group Events
 */
export interface UploadEvent {
    /**
     * HTTP event.
     */
    originalEvent: HttpEvent<any>;
}
/**
 * Remove uploaded file event.
 * @group Events
 */
export interface RemoveUploadedFileEvent {
    /**
     * Removed file.
     */
    file: any;
    /**
     * Uploaded files.
     */
    files: any[];
}
/**
 * Form data event.
 * @group Events
 */
export interface FormDataEvent {
    /**
     * FormData object.
     */
    formData: FormData;
}

/**
 * An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.
 * @see {@link FileUpload.onSend}
 * @group Events
 */
export interface FileSendEvent extends UploadEvent, FormDataEvent {}
/**
 * Callback to invoke before file upload is initialized.
 * @see {@link FileUpload.onBeforeUpload}
 * @group Events
 */
export interface FileBeforeUploadEvent extends FormDataEvent {}
/**
 * Callback to invoke when file upload is complete.
 * @see {@link FileUpload.onUpload}
 * @group Events
 */
export interface FileUploadEvent extends UploadEvent {
    /**
     * Uploaded files.
     */
    files: File[];
}
/**
 * Callback to invoke when a file is removed without uploading using clear button of a file.
 * @see {@link FileUpload.onRemove}
 * @group Events
 */
export interface FileRemoveEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected file
     */
    file: File;
}
/**
 * Callback to invoke when files are selected.
 * @see {@link FileUpload.onSelect}
 * @group Events
 */
export interface FileSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Uploaded files.
     */
    files: File[];
    /**
     * All files to be uploaded.
     */
    currentFiles: File[];
}
/**
 * Callback to invoke when files are being uploaded.
 * @see {@link FileUpload.onProgress}
 * @extends {UploadEvent}
 * @group Events
 */
export interface FileProgressEvent extends UploadEvent {
    /**
     * Calculated progress value.
     */
    progress: number;
}
/**
 * Callback to invoke in custom upload mode to upload the files manually.
 * @see {@link FileUpload.uploadHandler}
 * @group Events
 */
export interface FileUploadHandlerEvent {
    /**
     * List of selected files.
     */
    files: File[];
}
/**
 * Callback to invoke on upload error.
 * @see {@link FileUpload.onError}
 * @group Events
 */
export interface FileUploadErrorEvent {
    /**
     * List of selected files.
     */
    error?: ErrorEvent;
    /**
     * List of selected files.
     */
    files: File[];
}

/**
 * Custom header template context.
 * @group Interface
 */
export interface FileUploadHeaderTemplateContext {
    /**
     * File list.
     */
    $implicit: File[];
    /**
     * Uploaded files list.
     */
    uploadedFiles: File[];
    /**
     * Callback to invoke on choose button click.
     */
    chooseCallback: () => void;
    /**
     * Callback to invoke on clear button click.
     */
    clearCallback: () => void;
    /**
     * Callback to invoke on upload.
     */
    uploadCallback: () => void;
}

/**
 * Custom content template context.
 * @group Interface
 */
export interface FileUploadContentTemplateContext {
    /**
     * File list.
     */
    $implicit: File[];
    /**
     * Uploaded files list.
     */
    uploadedFiles: File[];
    /**
     * Upload progress value (0-100).
     */
    progress: number;
    /**
     * Status messages about upload process.
     */
    messages: any[];
    /**
     * Callback to invoke on choose button click.
     */
    chooseCallback: () => void;
    /**
     * Callback to invoke to remove a file from the list.
     */
    removeFileCallback: (event: Event, index: number) => void;
    /**
     * Callback to invoke on clear button click.
     */
    clearCallback: () => void;
    /**
     * Callback to invoke on remove uploaded file.
     */
    removeUploadedFileCallback: (index: number) => void;
}

/**
 * Custom file label template context.
 * @group Interface
 */
export interface FileUploadFileLabelTemplateContext {
    /**
     * File list.
     */
    $implicit: File[];
}

/**
 * Defines valid templates in FileUpload.
 * @group Templates
 */
export interface FileUploadTemplates {
    /**
     * Custom file template.
     */
    file(): TemplateRef<void>;
    /**
     * Custom file label template.
     * @param {Object} context - file label template context.
     */
    filelabel(context: FileUploadFileLabelTemplateContext): TemplateRef<FileUploadFileLabelTemplateContext>;
    /**
     * Custom header template.
     * @param {Object} context - header template context.
     */
    header(context: FileUploadHeaderTemplateContext): TemplateRef<FileUploadHeaderTemplateContext>;
    /**
     * Custom content template.
     * @param {Object} context - content template context.
     */
    content(context: FileUploadContentTemplateContext): TemplateRef<FileUploadContentTemplateContext>;
    /**
     * Custom toolbar template.
     */
    toolbar(): TemplateRef<void>;
    /**
     * Custom choose icon template.
     */
    chooseicon(): TemplateRef<void>;
    /**
     * Custom upload icon template.
     */
    uploadicon(): TemplateRef<void>;
    /**
     * Custom cancel icon template.
     */
    cancelicon(): TemplateRef<void>;
    /**
     * Custom empty state template.
     */
    empty(): TemplateRef<void>;
}
