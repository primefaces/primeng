import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/editor';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-editor',
        {
            'p-invalid': instance.invalid()
        }
    ],
    toolbar: 'p-editor-toolbar',
    content: 'p-editor-content'
};

@Injectable()
export class EditorStyle extends BaseStyle {
    name = 'editor';

    theme = style;

    classes = classes;
}

/**
 *
 * Editor groups a collection of contents in tabs.
 *
 * [Live Demo](https://www.primeng.org/editor/)
 *
 * @module editorstyle
 *
 */
export enum EditorClasses {
    /**
     * Class name of the root element
     */
    root = 'p-editor',
    /**
     * Class name of the toolbar element
     */
    toolbar = 'p-editor-toolbar',
    /**
     * Class name of the content element
     */
    content = 'p-editor-content'
}

export interface EditorStyle extends BaseStyle {}
