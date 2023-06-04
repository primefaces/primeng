import { HttpEvent } from '@angular/common/http';
import { FileUpload } from './fileupload';
import { TemplateRef } from '@angular/core';

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
 * Defines valid templates in FileUpload.
 * @group Templates
 */
export interface FileUploadTemplates {
    /**
     * Custom template of file.
     */
    file(): TemplateRef<any>;
    /**
     * Custom template of content.
     */
    content(context: {
        /**
         * File list.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom template of toolbar.
     */
    toolbar(): TemplateRef<any>;
    /**
     * Custom template of chooseicon.
     */
    chooseicon(): TemplateRef<any>;
    /**
     * Custom template of uploadicon.
     */
    uploadicon(): TemplateRef<any>;
    /**
     * Custom template of cancelicon.
     */
    cancelicon(): TemplateRef<any>;
}
