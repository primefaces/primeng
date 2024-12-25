import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Image.
 * @group Templates
 */
export interface ImageTemplates {
    /**
     * Custom template of indicator.
     */
    indicator(): TemplateRef<any>;
    /**
     * Custom template of image.
     */
    image(context: {
        /**
         * Style class of the image element.
         */
        class: any;
        /**
         * Style of the image element.
         */
        style: any;
        /**
         * Image click function.
         */
        errorCallback: Function;
    }): TemplateRef<{ class: any; style: any; errorCallback: Function }>;
    /**
     * Custom preview template.
     */
    preview(context: {
        /**
         * Preview click function.
         */
        errorCallback: Function;
    }): TemplateRef<{ errorCallback: Function }>;
    /**
     * Custom template of rotaterighticon.
     */
    rotaterighticon(): TemplateRef<any>;
    /**
     * Custom template of rotatelefticon.
     */
    rotatelefticon(): TemplateRef<any>;
    /**
     * Custom template of zoomouticon.
     */
    zoomouticon(): TemplateRef<any>;
    /**
     * Custom template of zoominicon.
     */
    zoominicon(): TemplateRef<any>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
}
