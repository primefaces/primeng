import type { ElementRef, TemplateRef } from '@angular/core';

/**
 * Target element to attach the overlay.
 * Valid values are "body", "self" or a local ng-template variable of another element.
 * @group Types
 */
export type AppendTo = HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined;

// @todo: discuss naming

/**
 * Style object type for inline styles.
 * Uses CSSStyleDeclaration for strict type checking and autocomplete support.
 * @group Types
 */
export type Style = Partial<CSSStyleDeclaration> | null | undefined;
