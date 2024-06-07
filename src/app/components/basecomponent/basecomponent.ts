import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Directive, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { Theme, ThemeService } from 'primeng/themes';
import { Base, BaseStyle } from 'primeng/base';
import BaseComponentStyle from './style/basecomponentstyle';
import { PrimeNGConfig } from 'primeng/api';
import { UniqueComponentId } from 'primeng/utils';

@Directive({ standalone: true })
export class BaseComponent {
    public document: Document = inject(DOCUMENT);

    public platformId: any = inject(PLATFORM_ID);

    public el: ElementRef = inject(ElementRef);

    public config: PrimeNGConfig = inject(PrimeNGConfig);

    public scopedStyleEl: any;

    get styleOptions() {
        return { nonce: this.config?.csp().nonce };
    }

    get name() {
        return this.constructor.name.replace(/^_/, '').toLowerCase();
    }

    get componentStyle() {
        return this['_componentStyle'];
    }

    get attrSelector() {
        return UniqueComponentId('pc');
    }

    _getHostInstance(instance) {
        if (instance) {
            return instance ? (this['hostName'] ? (instance['name'] === this['hostName'] ? instance : this._getHostInstance(instance.parentInstance)) : instance.parentInstance) : undefined;
        }
    }

    ngOnInit() {
        if (this.document) {
            this._loadStyles();
        }
    }

    _loadStyles() {
        const _load = () => {
            if (!Base.isStyleNameLoaded('base')) {
                BaseStyle.loadCSS(this.document, this.styleOptions);
                Base.setLoadedStyleName('base');
            }

            this._loadThemeStyles();
        };

        _load();
        // @todo: theme change listener
        // this._themeChangeListener(_load);
    }

    _loadCoreStyles() {
        if (!Base.isStyleNameLoaded('base') && this.name) {
            BaseComponentStyle.loadCSS(this.document, this.styleOptions);
            this.componentStyle && this.componentStyle?.loadCSS(this.document, this.styleOptions);

            Base.setLoadedStyleName(this.componentStyle?.name);
        }
    }

    ngOnDestroy() {
        Theme.clearLoadedStyleNames();
    }

    _loadThemeStyles() {
        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic } = this.componentStyle.getCommonTheme?.() || {};
            BaseStyle.load(this.document, primitive?.css, { name: 'primitive-variables', ...this.styleOptions });
            BaseStyle.load(this.document, semantic?.css, { name: 'semantic-variables', ...this.styleOptions });
            BaseStyle.loadTheme(this.document, { name: 'global-style', ...this.styleOptions });
            Theme.setLoadedStyleName('common');
        }

        // component
        if (!Theme.isStyleNameLoaded(this.componentStyle?.name) && this.componentStyle?.name) {
            const { css } = this.componentStyle.getComponentTheme?.() || {};
            this.componentStyle.load(this.document, css, { name: `${this.componentStyle?.name}-variables`, ...this.styleOptions });
            this.componentStyle.loadTheme(this.document, { name: `${this.componentStyle?.name}-style`, ...this.styleOptions });

            Theme.setLoadedStyleName(this.componentStyle.name);
        }

        // layer order
        if (!Theme.isStyleNameLoaded('layer-order')) {
            const layerOrder = this.componentStyle?.getLayerOrderThemeCSS?.();

            BaseStyle.load(this.document, layerOrder, { name: 'layer-order', first: true, ...this.styleOptions });
            Theme.setLoadedStyleName('layer-order');
        }
    }

    _loadScopedThemeStyles(preset) {
        const { css } = this.componentStyle?.getPresetTheme?.(preset, `[${this.attrSelector}]`) || {};
        const scopedStyle = this.componentStyle?.load(this.document, css, { name: `${this.attrSelector}-${this.componentStyle.name}`, ...this.styleOptions });

        this.scopedStyleEl = scopedStyle.el;
    }

    _unloadScopedThemeStyles() {
        this.scopedStyleEl?.value?.remove();
    }

    _themeChangeListener(callback = () => {}) {
        Base.clearLoadedStyleNames();
        ThemeService.on('theme:change', callback);
    }
}
