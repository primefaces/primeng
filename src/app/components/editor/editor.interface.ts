import { TemplateRef } from '@angular/core';
import { Editor } from './editor';

/**
 * Custom text change event.
 * @see {@link Editor.onTextChange}
 */
export interface EditorTextChangeEvent {
    /**
     * Current value as html.
     */
    htmlValue: string;
    /**
     * Current value as text.
     */
    textValue: string;
    /**
     * Representation of the change.
     */
    delta: string;
    /**
     * Source of change. Will be either 'user' or 'api'.
     */
    source: string;
}
/**
 * Custom selection change event.
 * @see {@link Editor.onSelectionChange}
 */
export interface EditorSelectionChangeEvent {
    /**
     * Representation of the selection boundaries.
     */
    range: string;
    /**
     * Representation of the previous selection boundaries.
     */
    oldRange: string;
    /**
     * Source of change. Will be either 'user' or 'api'.
     */
    source: string;
}
/**
 * Custom load event.
 * @see {@link EditorEmits.onInit}
 */
export interface EditorInitEvent {
    /**
     * Text editor instance.
     */
    editor: any;
}
/**
 * Defines valid templates in Editor.
 * @group Templates
 */
export interface EditorTemplates {
    /**
     * Custom header template.
     */
    header: TemplateRef<any>;
}
