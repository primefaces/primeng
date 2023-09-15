import { TemplateRef } from '@angular/core';
import { Editor } from './editor';
import Quill, { RangeStatic } from 'quill';

/**
 * Custom text change event.
 * @see {@link Editor.onTextChange}
 * @group Events
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
 * @group Events
 */
export interface EditorSelectionChangeEvent {
    /**
     * Representation of the selection boundaries.
     */
    range: RangeStatic;
    /**
     * Representation of the previous selection boundaries.
     */
    oldRange: RangeStatic;
    /**
     * Source of change. Will be either 'user' or 'api'.
     */
    source: string;
}
/**
 * Custom load event.
 * @see {@link Editor.onInit}
 * @group Events
 */
export interface EditorInitEvent {
    /**
     * Text editor instance.
     */
    editor: Quill;
}
/**
 * Defines valid templates in Editor.
 * @group Templates
 */
export interface EditorTemplates {
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
}
