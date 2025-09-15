import { TemplateRef } from '@angular/core';
import { Editor } from './editor';

/**
 * Quill Delta object interface for text changes.
 * @group Interfaces
 */
export interface QuillDelta {
    ops?: any[];
    retain?: number;
    delete?: number;
    insert?: string | object;
    attributes?: { [key: string]: any };
}

/**
 * Quill Range object interface for selection changes.
 * @group Interfaces
 */
export interface QuillRange {
    index: number;
    length: number;
}

/**
 * Custom text change event.
 * @see {@link Editor.onTextChange}
 * @group Events
 */
export interface EditorTextChangeEvent {
    /**
     * Current value as html.
     */
    htmlValue: string | null;
    /**
     * Current value as text.
     */
    textValue: string;
    /**
     * Representation of the change as Quill Delta.
     */
    delta: QuillDelta;
    /**
     * Source of change. Will be 'user', 'api', or 'silent'.
     */
    source: 'user' | 'api' | 'silent';
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
    range: QuillRange | null;
    /**
     * Representation of the previous selection boundaries.
     */
    oldRange: QuillRange | null;
    /**
     * Source of change. Will be 'user', 'api', or 'silent'.
     */
    source: 'user' | 'api' | 'silent';
}
/**
 * Custom editor change event.
 * @see {@link Editor.onEditorChange}
 * @group Events
 */
export interface EditorChangeEvent {
    /**
     * Type of change ('text-change' or 'selection-change').
     */
    eventName: 'text-change' | 'selection-change';
    /**
     * Arguments passed to the change event.
     */
    args: any[];
}
/**
 * Custom focus event.
 * @see {@link Editor.onFocus}
 * @group Events
 */
export interface EditorFocusEvent {
    /**
     * Source of the focus event.
     */
    source: 'user' | 'api' | 'silent';
}
/**
 * Custom blur event.
 * @see {@link Editor.onBlur}
 * @group Events
 */
export interface EditorBlurEvent {
    /**
     * Source of the blur event.
     */
    source: 'user' | 'api' | 'silent';
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
    header(): TemplateRef<any>;
}
