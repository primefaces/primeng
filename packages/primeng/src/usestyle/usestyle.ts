import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { setAttributes } from '@primeuix/utils';

let _id = 0;

export type StyleContainerType = HTMLElement | ShadowRoot | null | undefined;

export interface UseStyleOptions {
    immediate?: boolean;
    manual?: boolean;
    name?: string;
    id?: string;
    media?: string;
    nonce?: string;
    first?: boolean;
    props?: Record<string, unknown>;
    styleContainer?: StyleContainerType;
}

@Injectable({ providedIn: 'root' })
export class UseStyle {
    document: Document = inject(DOCUMENT);

    use(css: string | undefined, options: UseStyleOptions = {}) {
        let isLoaded = false;
        let cssRef = css ?? '';
        let styleRef: HTMLStyleElement | null = null;

        const { immediate = true, manual = false, name = `style_${++_id}`, id = undefined, media = undefined, nonce = undefined, first = false, props = {}, styleContainer = undefined } = options;
        const styleContainerRef = styleContainer || this.document.head;

        if (!this.document || !styleContainerRef) return;
        styleRef = (styleContainerRef.querySelector(`style[data-primeng-style-id="${name}"]`) || (id && styleContainerRef.querySelector(`style[id="${id}"]`)) || this.document.createElement('style')) as HTMLStyleElement;

        if (styleRef) {
            if (!styleRef.isConnected) {
                cssRef = css ?? '';

                setAttributes(styleRef, {
                    type: 'text/css',
                    id,
                    media,
                    nonce,
                    ...props,
                    'data-primeng-style-id': name
                });

                first && styleContainerRef.firstChild ? styleContainerRef.insertBefore(styleRef, styleContainerRef.firstChild) : styleContainerRef.appendChild(styleRef);
            }

            if (styleRef.textContent !== cssRef) {
                styleRef.textContent = cssRef;
            }
        }

        return {
            id,
            name,
            el: styleRef,
            css: cssRef
        };
    }
}
