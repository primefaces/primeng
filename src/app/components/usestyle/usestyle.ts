import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { DomHandler } from 'primeng/dom';

let _id = 0;

@Injectable({ providedIn: 'root' })
export class UseStyle {
    document: Document = inject(DOCUMENT);

    _(css, options: any = {}) {
        let isLoaded = false;
        let cssRef = css;
        let styleRef = null;

        const { immediate = true, manual = false, name = `style_${++_id}`, id = undefined, media = undefined, nonce = undefined, first = false, props = {} } = options;

        if (!this.document) return;
        styleRef = this.document.querySelector(`style[data-primeng-style-id="${name}"]`) || this.document.getElementById(id) || this.document.createElement('style');

        if (styleRef) {
            cssRef = css;
            DomHandler.setAttributes(styleRef, {
                type: 'text/css',
                media,
                nonce
            });

            styleRef.innerHTML = cssRef;

            first ? this.document.head.prepend(styleRef) : this.document.head.appendChild(styleRef);
            DomHandler.setAttribute(styleRef, 'data-primeng-style-id', name);
        }

        return {
            id,
            name,
            el: styleRef,
            css: cssRef
        };
    }
}
