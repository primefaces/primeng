import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { setAttribute, setAttributes } from '@primeuix/utils';

let _id = 0;

@Injectable({ providedIn: 'root' })
export class UseStyle {
    document: Document = inject(DOCUMENT);
    findInsertionPoint(element: Element) {
        if (!element) return undefined;
        if (element.shadowRoot) return element.shadowRoot;
        if (element.getRootNode?.().constructor.name === 'ShadowRoot') {
            return element.getRootNode() as Document;
        }
        return undefined;
    }

    use(css, options: any = {}) {
        let isLoaded = false;
        let cssRef = css;
        let styleRef = null;

        const { immediate = true, manual = false, name = `style_${++_id}`, id = undefined, media = undefined, nonce = undefined, first = false, props = {} } = options;

        const shadowDomElement = this.findInsertionPoint(options.element?.nativeElement);
        const insertionPoint = name.endsWith('-variables') ? this.document : shadowDomElement || this.document;

        if (!insertionPoint) return;
        styleRef = insertionPoint.querySelector(`style[data-primeng-style-id="${name}"]`) || (id && insertionPoint.getElementById(id)) || this.document.createElement('style');

        if (!styleRef.isConnected) {
            cssRef = css;
            setAttributes(styleRef, {
                type: 'text/css',
                media,
                nonce
            });

            const HEAD = shadowDomElement ? insertionPoint : this.document.head;

            first && HEAD.firstChild ? HEAD.insertBefore(styleRef, HEAD.firstChild) : HEAD.appendChild(styleRef);
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
