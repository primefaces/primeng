import { HttpEvent } from '@angular/common/http';

export interface UploadEvent {
    /**
     * HTTP event.
     */
    originalEvent: HttpEvent<any>;
}

export interface FormDataEvent {
    /**
     * FormData object.
     */
    formData: FormData;
}

/**
 * An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.
 * @see {@link FileUpload.onSend}
 * @event
 */
export interface FileSendEvent extends UploadEvent, FormDataEvent {}
/**
 * Callback to invoke before file upload is initialized.
 * @see {@link FileUpload.onBeforeUpload}
 * @event
 */
export interface FileBeforeUploadEvent extends FormDataEvent {}
/**
 * Callback to invoke when file upload is complete.
 * @see {@link FileUpload.onUpload}
 * @event
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
 * @event
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
 * @event
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
 * @event
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
 * @event
 */
export interface FileUploadHandlerEvent {
    /**
     * List of selected files.
     */
    files: File[];
}

import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in FileUpload.
 * @group Templates
 */
export interface FileUploadTemplates {
    /**
     * Custom template of file.
     */
    file: TemplateRef<any> | null;
    /**
     * Custom template of content.
     */
    content: TemplateRef<any> | null;
    /**
     * Custom template of toolbar.
     */
    toolbar: TemplateRef<any> | null;
    /**
     * Custom template of chooseicon.
     */
    chooseicon: TemplateRef<any> | null;
    /**
     * Custom template of uploadicon.
     */
    uploadicon: TemplateRef<any> | null;
    /**
     * Custom template of cancelicon.
     */
    cancelicon: TemplateRef<any> | null;
}
