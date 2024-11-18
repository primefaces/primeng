import { inject, Injectable } from '@angular/core';
import { dt, Theme } from '@primeuix/styled';
import { minifyCSS, resolve } from '@primeuix/utils';
import { UseStyle } from 'primeng/usestyle';

const theme = ({ dt }) => `
* {
    box-sizing: border-box;
}

/* Non vue overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* Vue based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-disabled,
.p-disabled * {
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.p-disabled,
.p-component:disabled {
    opacity: ${dt('disabled.opacity')};
}

.pi {
    font-size: ${dt('icon.size')};
}

.p-icon {
    width: ${dt('icon.size')};
    height: ${dt('icon.size')};
}

.p-overlay-mask {
    background: ${dt('mask.background')};
    color: ${dt('mask.color')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation ${dt('mask.transition.duration')} forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation ${dt('mask.transition.duration')} forwards;
}
/* Temporarily disabled, distrupts PrimeNG overlay animations */
/* @keyframes p-overlay-mask-enter-animation {
    from {
        background: transparent;
    }
    to {
        background: ${dt('mask.background')};
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background: ${dt('mask.background')};
    }
    to {
        background: transparent;
    }
}*/

.p-iconwrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
`;

const css = ({ dt }) => `
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
    padding-right: ${dt('scrollbar.width')};
}

/* @todo move to baseiconstyle.ts */

.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`;

@Injectable({ providedIn: 'root' })
export class BaseStyle {
    name = 'base';

    useStyle: UseStyle = inject(UseStyle);

    theme = theme;

    css = css;

    classes = {};

    inlineStyles = {};

    load = (style, options = {}, transform = (cs) => cs) => {
        const computedStyle = transform(resolve(style, { dt }));
        return computedStyle ? this.useStyle.use(minifyCSS(computedStyle), { name: this.name, ...options }) : {};
    };

    loadCSS = (options = {}) => {
        return this.load(this.css, options);
    };

    loadTheme = (options: any = {}, style: string = '') => {
        return this.load(this.theme, options, (computedStyle = '') => Theme.transformCSS(options.name || this.name, `${computedStyle}${style}`));
    };

    getCommonTheme = (params?) => {
        return Theme.getCommon(this.name, params);
    };

    getComponentTheme = (params) => {
        return Theme.getComponent(this.name, params);
    };

    getDirectiveTheme = (params) => {
        return Theme.getDirective(this.name, params);
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
            const _style = minifyCSS(`${_css}${extendedCSS}`);
            const _props = Object.entries(props)
                .reduce((acc, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
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

        if (this.theme) {
            const name = this.name === 'base' ? 'global-style' : `${this.name}-style`;
            const _css = resolve(this.theme, { dt });
            const _style = minifyCSS(Theme.transformCSS(name, _css));
            const _props = Object.entries(props)
                .reduce((acc, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
                .join(' ');

            css.push(`<style type="text/css" data-primeng-style-id="${name}" ${_props}>${_style}</style>`);
        }

        return css.join('');
    };
}
