import { inject, Injectable } from '@angular/core';
import { css as Css, dt, Theme } from '@primeuix/styled';
import { style as base_style } from '@primeuix/styles/base';
import { minifyCSS, resolve } from '@primeuix/utils';
import { UseStyle } from 'primeng/usestyle';

const css = /*css*/ `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: dt('scrollbar.width');
}
`;

const extendedStyle = /*css*/ `
    ${base_style}

    /********** Collapsible Animations **********/
    .p-collapsible-enter-from,
    .p-collapsible-leave-to {
        max-height: 0;
    }

    .p-collapsible-enter-to,
    .p-collapsible-leave-from {
        max-height: var(--pui-motion-height, 1000px);
    }

    .p-collapsible-leave-active {
        overflow: hidden;
        transition: max-height 400ms cubic-bezier(0.86, 0, 0.07, 1);
    }

    .p-collapsible-enter-active {
        overflow: hidden;
        transition: max-height 400ms cubic-bezier(0.86, 0, 0.07, 1);
    }
    /***************************** */

   .p-collapsible {
        max-height: 0;
        overflow: hidden;
        will-change: max-height, overflow;
        transition: max-height 450ms cubic-bezier(0, 1, 0, 1);
    }

    .p-collapsible-open {
        max-height: 1000px;
        overflow: visible;
        transition: max-height 1s ease-in-out, overflow 1s ease-in-out;
        transition-behavior: allow-discrete;
    }

    .p-collapsible-enter {
        animation-name: p-animate-collapsible-enter;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
    }

    .p-collapsible-leave {
        animation-name: p-animate-collapsible-leave;
        animation-duration: 450ms;
        animation-timing-function: cubic-bezier(0, 1, 0, 1);
    }

    @keyframes p-animate-collapsible-enter {
        from {
            max-height: 0;
            overflow: hidden
        }
        to {
            max-height: 1000px;
        }
    }

    @keyframes p-animate-collapsible-leave {
        from {
            max-height: 1000px;
        }
        to {
            overflow: hidden;
            max-height: 0;
        }
    }

    .p-modal-enter {
        animation: p-animate-modal-enter 300ms forwards;
    }

    .p-modal-leave {
        animation: p-animate-modal-leave 300ms forwards;
    }

    @keyframes p-animate-modal-enter {
        from {
            background: transparent;
        }
        to {
            background: dt('mask.background');
        }
    }
    @keyframes p-animate-modal-leave {
        from {
            background: dt('mask.background');
        }
        to {
            background: transparent;
        }
    }
`;

@Injectable({ providedIn: 'root' })
export class BaseStyle {
    name = 'base';

    useStyle: UseStyle = inject(UseStyle);

    css: string | undefined = undefined;

    style: any = undefined;

    classes = {};

    inlineStyles = {};

    load = (style, options = {}, transform = (cs) => cs) => {
        const computedStyle = transform(Css`${resolve(style, { dt })}`);

        return computedStyle ? this.useStyle.use(minifyCSS(computedStyle), { name: this.name, ...options }) : {};
    };

    loadCSS = (options = {}) => {
        return this.load(this.css, options);
    };

    loadStyle = (options: any = {}, style: string = '') => {
        return this.load(this.style, options, (computedStyle = '') => Theme.transformCSS(options.name || this.name, `${computedStyle}${Css`${style}`}`));
    };

    loadBaseCSS = (options = {}) => {
        return this.load(css, options);
    };

    loadBaseStyle = (options: any = {}, style: string = '') => {
        return this.load(extendedStyle, options, (computedStyle = '') => Theme.transformCSS(options.name || this.name, `${computedStyle}${Css`${style}`}`));
    };

    getCommonTheme = (params?) => {
        return Theme.getCommon(this.name, params);
    };

    getComponentTheme = (params) => {
        return Theme.getComponent(this.name, params);
    };

    getPresetTheme = (preset, selector, params) => {
        return Theme.getCustomPreset(this.name, preset, selector, params);
    };

    getLayerOrderThemeCSS = () => {
        return Theme.getLayerOrderCSS(this.name);
    };

    getStyleSheet = (extendedCSS = '', props = {}) => {
        if (this.css) {
            const _css = resolve(this.css, { dt });
            const _style = minifyCSS(Css`${_css}${extendedCSS}`);
            const _props = Object.entries(props)
                .reduce<any>((acc, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
                .join(' ');

            return `<style type="text/css" data-primeng-style-id="${this.name}" ${_props}>${_style}</style>`;
        }

        return '';
    };

    getCommonThemeStyleSheet = (params, props = {}) => {
        return Theme.getCommonStyleSheet(this.name, params, props);
    };

    getThemeStyleSheet = (params, props = {}) => {
        let css = [Theme.getStyleSheet(this.name, params, props)];

        if (this.style) {
            const name = this.name === 'base' ? 'global-style' : `${this.name}-style`;
            const _css = Css`${resolve(this.style, { dt })}`;
            const _style = minifyCSS(Theme.transformCSS(name, _css as string));
            const _props = Object.entries(props)
                .reduce<any>((acc, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
                .join(' ');

            css.push(`<style type="text/css" data-primeng-style-id="${name}" ${_props}>${_style}</style>`);
        }

        return css.join('');
    };
}
