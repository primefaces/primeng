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
        let styleRef = null;

        const { immediate = true, manual = false, name = `style_${++_id}`, id = undefined, media = undefined, nonce = undefined, first = false, props = {} } = options;

        if (!this.document) return;
        styleRef = this.document.querySelector(`style[data-primeng-style-id="${name}"]`) || this.document.getElementById(id) || this.document.createElement('style');

        if (!styleRef.isConnected) {
            cssRef = css;
            setAttributes(styleRef, {
                type: 'text/css',
                media,
                nonce
            });

            first ? this.document.head.prepend(styleRef) : this.document.head.appendChild(styleRef);
            setAttribute(styleRef, 'data-primeng-style-id', name);
        }

        if (styleRef.textContent !== cssRef) {
            styleRef.textContent = cssRef;
        }

        return {
            id,
            name,
            el: styleRef,
            css: cssRef
        };
    }
}
