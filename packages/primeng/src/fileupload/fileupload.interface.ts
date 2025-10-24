import { TemplateRef } from '@angular/core';

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
     * Custom file label template.
     */
    filelabel(context: {
        /**
         * File list.
         */
        $implicit: any;
    }): TemplateRef<any>;

    /**
     * Custom template of file.
     */
    header(context: {
        /**
         * File list.
         */
        $implicit: any;
        /**
         * Uploaded files list.
         */
        uploadedFiles: any;
        /**
         * Callback to invoke on choose button click.
         */
        chooseCallback: VoidFunction;
        /**
         * Callback to invoke on clear button click.
         */
        clearCallback: VoidFunction;
        /**
         * Callback to invoke on upload.
         */
        uploadCallback: VoidFunction;
    }): TemplateRef<any>;
    /**
     * Custom template of content.
     */
    content(context: {
        /**
         * File list.
         */
        $implicit: any;
        /**
         * Uploaded files list.
         */
        uploadedFiles: any;
        /**
         * Upload progress.
         */
        progress: any;
        /**
         * Status messages about upload process.
         */
        messages: any;
        /**
         * Callback to invoke on choose button click.
         */
        chooseCallback: VoidFunction;
        /**
         * Callback to invoke on clear button click.
         */
        removeFileCallback: VoidFunction;
        /**
         * Callback to invoke on clear button click.
         */
        clearCallback: VoidFunction;
        /**
         * Callback to invoke on upload.
         */
        uploadCallback: VoidFunction;
        /**
         * Callback to invoke on remove uploaded file, accepts index as a parameter.
         * @param index Index of the file to remove.
         */
        removeUploadedFileCallback: VoidFunction;
    }): TemplateRef<any>;
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
