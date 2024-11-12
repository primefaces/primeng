import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-fileupload input[type="file"] {
    display: none;
}

.p-fileupload-advanced {
    border: 1px solid ${dt('fileupload.border.color')};
    border-radius: ${dt('fileupload.border.radius')};
    background: ${dt('fileupload.background')};
    color: ${dt('fileupload.color')};
}

.p-fileupload-header {
    display: flex;
    align-items: center;
    padding: ${dt('fileupload.header.padding')};
    background: ${dt('fileupload.header.background')};
    color: ${dt('fileupload.header.color')};
    border-style: solid;
    border-width: ${dt('fileupload.header.border.width')};
    border-color: ${dt('fileupload.header.border.color')};
    border-radius: ${dt('fileupload.header.border.radius')};
    gap: ${dt('fileupload.header.gap')};
}

.p-fileupload-content {
    border: 1px solid transparent;
    position: relative;
    display: flex;
    gap: ${dt('fileupload.content.gap')};
    transition: border-color ${dt('fileupload.transition.duration')};
    padding: ${dt('fileupload.content.padding')};
}

.p-fileupload-content .p-progressbar {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: ${dt('fileupload.progressbar.height')};
}

.p-fileupload-file-list {
    display: flex;
    flex-direction: column;
    gap: ${dt('fileupload.filelist.gap')};
}

.p-fileupload-file {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: ${dt('fileupload.file.padding')};
    border-bottom: 1px solid ${dt('fileupload.file.border.color')};
    gap: ${dt('fileupload.file.gap')};
}

.p-fileupload-file:last-child {
    border-bottom: 0;
}

.p-fileupload-file-info {
    display: flex;
    flex-direction: column;
    gap: ${dt('fileupload.file.info.gap')};
}

.p-fileupload-file-thumbnail {
    flex-shrink: 0;
}

.p-fileupload-file-actions {
    margin-left: auto;
}

.p-fileupload-highlight {
    border: 1px dashed ${dt('fileupload.content.highlight.border.color')};
}

.p-fileupload-advanced .p-message {
    margin-top: 0;
}

.p-fileupload-basic {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: ${dt('fileupload.basic.gap')};
}
`;

const classes = {
    root: ({ instance }) => `p-fileupload p-fileupload-${instance.mode} p-component`,
    header: 'p-fileupload-header',
    pcChooseButton: 'p-fileupload-choose-button',
    pcUploadButton: 'p-fileupload-upload-button',
    pcCancelButton: 'p-fileupload-cancel-button',
    content: 'p-fileupload-content',
    fileList: 'p-fileupload-file-list',
    file: 'p-fileupload-file',
    fileThumbnail: 'p-fileupload-file-thumbnail',
    fileInfo: 'p-fileupload-file-info',
    fileName: 'p-fileupload-file-name',
    fileSize: 'p-fileupload-file-size',
    pcFileBadge: 'p-fileupload-file-badge',
    fileActions: 'p-fileupload-file-actions',
    pcFileRemoveButton: 'p-fileupload-file-remove-button'
};

@Injectable()
export class FileUploadStyle extends BaseStyle {
    name = 'fileupload';

    theme = theme;

    classes = classes;
}

/**
 *
 * FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
 *
 * [Live Demo](https://www.primeng.org/fileupload/)
 *
 * @module fileuploadstyle
 *
 */

export enum FileUploadClasses {
    /**
     * Class name of the root element
     */
    root = 'p-fileupload',
    /**
     * Class name of the header element
     */
    header = 'p-fileupload-header',
    /**
     * Class name of the choose button element
     */
    pcChooseButton = 'p-fileupload-choose-button',
    /**
     * Class name of the upload button element
     */
    pcUploadButton = 'p-fileupload-upload-button',
    /**
     * Class name of the cancel button element
     */
    pcCancelButton = 'p-fileupload-cancel-button',
    /**
     * Class name of the content element
     */
    content = 'p-fileupload-content',
    /**
     * Class name of the file list element
     */
    fileList = 'p-fileupload-file-list',
    /**
     * Class name of the file element
     */
    file = 'p-fileupload-file',
    /**
     * Class name of the file thumbnail element
     */
    fileThumbnail = 'p-fileupload-file-thumbnail',
    /**
     * Class name of the file info element
     */
    fileInfo = 'p-fileupload-file-info',
    /**
     * Class name of the file name element
     */
    fileName = 'p-fileupload-file-name',
    /**
     * Class name of the file size element
     */
    fileSize = 'p-fileupload-file-size',
    /**
     * Class name of the file badge element
     */
    pcFileBadge = 'p-fileupload-file-badge',
    /**
     * Class name of the file actions element
     */
    fileActions = 'p-fileupload-file-actions',
    /**
     * Class name of the file remove button element
     */
    pcFileRemoveButton = 'p-fileupload-file-remove-button'
}

export interface FileUploadStyle extends BaseStyle {}
