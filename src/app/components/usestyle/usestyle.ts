import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { DomHandler } from 'primeng/dom';

let _id = 0;

@Injectable({ providedIn: 'root' })
export class UseStyle {
    document: Document = inject(DOCUMENT);

    use(css, options: any = {}) {
        let isLoaded = false;
        let cssRef = css;
        let styleRef = null;

        const {
            immediate = true,
            manual = false,
            name = `style_${++_id}`,
            id = undefined,
            media = undefined,
            nonce = undefined,
            first = false,
            props = {},
        } = options;

        if (!this.document) return;
        styleRef =
            this.document.querySelector(`style[data-primeng-style-id="${name}"]`) ||
            this.document.getElementById(id) ||
            this.document.createElement('style');

        if (!styleRef.isConnected) {
            cssRef = css;
            DomHandler.setAttributes(styleRef, {
                type: 'text/css',
                media,
                nonce,
            });

            const head = this.document.head || this.document.getElementsByTagName('head')[0];
            if (first) {
                head.insertBefore(styleRef, head.firstChild);
            } else {
                head.appendChild(styleRef);
            }
            DomHandler.setAttribute(styleRef, 'data-primeng-style-id', name);
        }

        if (styleRef.textContent !== cssRef) {
            styleRef.textContent = cssRef;
        }

        return {
            id,
            name,
            el: styleRef,
            css: cssRef,
        };
    }
}
