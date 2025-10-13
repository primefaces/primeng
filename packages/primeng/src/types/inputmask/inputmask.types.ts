import type { PassThrough, PassThroughOption } from 'primeng/api';
import { InputMask } from 'primeng/inputmask';
import { TemplateRef } from '@angular/core';
import { InputTextPassThrough } from '../inputtext/inputtext.types';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link InputMask.pt}
 * @group Interface
 */
export interface InputMaskPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the InputText component.
     */
    pcInputText?: InputTextPassThrough;
    /**
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputMask.
 * @see {@link InputMaskPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type InputMaskPassThrough<I = unknown> = PassThrough<I, InputMaskPassThroughOptions<I>>;

/**
 * Caret positions.
 * @group Types
 */
export type Caret = { begin: number; end: number };
/**
 * Defines valid templates in InputMask.
 * @group Templates
 */
export interface InputMaskTemplates {
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
}
