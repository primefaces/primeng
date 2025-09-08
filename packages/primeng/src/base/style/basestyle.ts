import { inject, Injectable } from '@angular/core';
import { css as Css, dt, Theme } from '@primeuix/styled';
import { style as theme } from '@primeuix/styles/base';
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

@Injectable({ providedIn: 'root' })
export class BaseStyle {
    name = 'base';

    useStyle: UseStyle = inject(UseStyle);

    theme = undefined;

    css = undefined;

    classes = {};

    inlineStyles = {};

    load = (style, options = {}, transform = (cs) => cs) => {
        const computedStyle = transform(Css`${resolve(style, { dt })}`);
        return computedStyle ? this.useStyle.use(minifyCSS(computedStyle), { name: this.name, ...options }) : {};
    };

    loadCSS = (options = {}) => {
        return this.load(this.css, options);
    };

    loadTheme = (options: any = {}, style: string = '') => {
        return this.load(this.theme, options, (computedStyle = '') => Theme.transformCSS(options.name || this.name, `${computedStyle}${Css`${style}`}`));
    };

    loadGlobalCSS = (options = {}) => {
        return this.load(css, options);
    };

    loadGlobalTheme = (options: any = {}, style: string = '') => {
        return this.load(theme, options, (computedStyle = '') => Theme.transformCSS(options.name || this.name, `${computedStyle}${Css`${style}`}`));
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
            const _style = minifyCSS(Css`${_css}${extendedCSS}`);
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
            const _css = Css`${resolve(this.theme, { dt })}`;
            const _style = minifyCSS(Theme.transformCSS(name, _css));
            const _props = Object.entries(props)
                .reduce((acc, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
                .join(' ');

            css.push(`<style type="text/css" data-primeng-style-id="${name}" ${_props}>${_style}</style>`);
        }

        return css.join('');
    };
}
