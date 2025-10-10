import { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import { Editor } from 'primeng/editor';

/**
 * Custom passthrough(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Editor.pt}
 * @group Interface
 */
export interface EditorPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the toolbar's DOM element.
     */
    toolbar?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the formats span's DOM element.
     */
    formats?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the header select's DOM element.
     */
    header?: PassThroughOption<HTMLSelectElement, I>;
    /**
     * Used to pass attributes to the option's DOM element.
     */
    option?: PassThroughOption<HTMLOptionElement, I>;
    /**
     * Used to pass attributes to the bold button's DOM element.
     */
    bold?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the italic button's DOM element.
     */
    italic?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the underline button's DOM element.
     */
    underline?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the color select's DOM element.
     */
    color?: PassThroughOption<HTMLSelectElement, I>;
    /**
     * Used to pass attributes to the background select's DOM element.
     */
    background?: PassThroughOption<HTMLSelectElement, I>;
    /**
     * Used to pass attributes to the list button's DOM element.
     */
    list?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the select's DOM element.
     */
    select?: PassThroughOption<HTMLSelectElement, I>;
    /**
     * Used to pass attributes to the link button's DOM element.
     */
    link?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the image button's DOM element.
     */
    image?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the code block button's DOM element.
     */
    codeBlock?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the clean button's DOM element.
     */
    clean?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Editor component.
 * @see {@link EditorPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type EditorPassThrough<I = unknown> = PassThrough<I, EditorPassThroughOptions<I>>;

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
