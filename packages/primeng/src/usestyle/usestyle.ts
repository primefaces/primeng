import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { setAttribute, setAttributes } from '@primeuix/utils';

let _id = 0;

@Injectable({ providedIn: 'root' })
export class UseStyle {
    document: Document = inject(DOCUMENT);

    use(css, options: any = {}) {
        let isLoaded = false;
        let cssRef = css;
        let styleRef: HTMLStyleElement | null = null;

        const { immediate = true, manual = false, name = `style_${++_id}`, id = undefined, media = undefined, nonce = undefined, first = false, props = {} } = options;

        if (!this.document) return;
        styleRef = (this.document.querySelector(`style[data-primeng-style-id="${name}"]`) || (id && this.document.getElementById(id)) || this.document.createElement('style')) as HTMLStyleElement;

        if (styleRef) {
            if (!styleRef.isConnected) {
                cssRef = css;

                const HEAD = this.document.head;

                setAttribute(styleRef, 'nonce', nonce);

                first && HEAD.firstChild ? HEAD.insertBefore(styleRef, HEAD.firstChild) : HEAD.appendChild(styleRef);
                setAttributes(styleRef, {
                    type: 'text/css',
                    media,
                    nonce,
                    'data-primeng-style-id': name
                });
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
