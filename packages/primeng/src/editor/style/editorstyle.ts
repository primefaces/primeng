import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { style } from '@primeuix/styles/editor';
import { css } from '@primeuix/styled';

const theme = css`
    ${style}

    /* For PrimeNG */
    .p-editor {
        display: block;
    }
`;

const classes = {
    root: ({ instance }) => ['p-editor', instance.styleClass],
    toolbar: 'p-editor-toolbar',
    content: 'p-editor-content'
};

@Injectable()
export class EditorStyle extends BaseStyle {
    name = 'editor';

    theme = theme;

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
