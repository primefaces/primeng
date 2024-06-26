import { DomHandler } from 'primeng/dom';

let _id = 0;

export function useStyle(document: Document, css, options: any = {}) {
    let isLoaded = false;
    let cssRef = css;
    let styleRef = null;

    const { immediate = true, manual = false, name = `style_${++_id}`, id = undefined, media = undefined, nonce = undefined, first = false, props = {} } = options;

    if (!document) return;
    styleRef = document.querySelector(`style[data-primeng-style-id="${name}"]`) || document.getElementById(id) || document.createElement('style');

    if (styleRef) {
        cssRef = css;
        DomHandler.setAttributes(styleRef, {
            type: 'text/css',
            media,
            nonce
        });

        styleRef.innerHTML = cssRef;

        first ? document.head.prepend(styleRef) : document.head.appendChild(styleRef);
        DomHandler.setAttribute(styleRef, 'data-primeng-style-id', name);
    }

    return {
        id,
        name,
        el: styleRef,
        css: cssRef
    };
}
