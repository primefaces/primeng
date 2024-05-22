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

    // let stop = () => {};

    // const load = (_css, _props: any = {}) => {
    //     const _styleProps = { ...props, ..._props };
    //     const [_name, _id, _nonce] = [_styleProps.name || name, _styleProps.id || id, _styleProps.nonce || nonce];
    //     styleRef = document.querySelector(`style[data-primeng-style-id="${_name}"]`) || document.getElementById(_id) || document.createElement('style');
    //     console.log('load', styleRef);
    //     if (styleRef) {
    //         cssRef = _css | css;

    //         DomHandler.setAttributes(styleRef, {
    //             type: 'text/css',
    //             id: _id,
    //             media,
    //             nonce: _nonce
    //         });

    //         document.head.appendChild(styleRef);
    //         DomHandler.setAttribute(styleRef, 'data-primeng-style-id', name);
    //         DomHandler.setAttributes(styleRef, _styleProps);

    //         if (isLoaded) return;

    //         // stop = watch(cssRef, (value) => {
    //         //     styleRef.textContent = value;
    //         // }, {immediate: true})

    //         isLoaded = true;
    //     }
    // };

    const unload = () => {
        if (!document || !isLoaded) return;
        stop();
        DomHandler.isExist(styleRef) && document.head.removeChild(styleRef);
    };

    // TODO: add this line
    // if (immediate && !manual) load();

    // TODO: return them
    // return {
    //     id,
    //     name,
    //     css: cssRef,
    //     unload,
    //     load,
    //     isLoaded
    // };
}
