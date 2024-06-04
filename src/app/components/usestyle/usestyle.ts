import { DomHandler } from 'primeng/dom';

let _id = 0;

export function useStyle(css, options: any = {}) {
    let isLoaded = false;
    const defaultDocument = DomHandler.isClient() ? window.document : undefined;
    const { document = defaultDocument, immediate = true, manual = false, name = `style_${++_id}`, id = undefined, media = undefined, nonce = undefined, props = {} } = options;

    if (!document) return;

    const styleRef = document.querySelector(`style[data-primeng-style-id="${name}"]`) || document.getElementById(id) || document.createElement('style');

    if (styleRef) {
        const cssRef = css;
        DomHandler.setAttributes(styleRef, {
            type: 'text/css',
            id,
            media,
            nonce
        });
        styleRef.textContent = cssRef;
        document.head.appendChild(styleRef);
        DomHandler.setAttribute(styleRef, 'data-primeng-style-id', name);
        DomHandler.setAttributes(styleRef, props);

        isLoaded = true;
    }

    const unload = () => {
        if (!document || !isLoaded) return;
        stop();
        DomHandler.isExist(styleRef) && document.head.removeChild(styleRef);
    };
}
