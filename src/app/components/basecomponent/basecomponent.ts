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

    private _isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    private _isPlatformServer() {
        return isPlatformServer(this.platformId);
    }

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
        if (this._isPlatformServer()) {
            BaseStyle.document = this.document;
            this._loadStyles();
        }
    }

    _loadStyles() {
        const _load = () => {
            if (!Base.isStyleNameLoaded('base')) {
                BaseStyle.loadCSS(this.styleOptions);
                Base.setLoadedStyleName('base');
            }

            this._loadThemeStyles();
        };

        _load();
        this._themeChangeListener(_load);
    }

    _loadCoreStyles() {
        if (!Base.isStyleNameLoaded('base') && this.name) {
            BaseComponentStyle.loadCSS(this.styleOptions);
            this.componentStyle && this.componentStyle?.loadCSS(this.styleOptions);

            Base.setLoadedStyleName(this.componentStyle?.name);
        }
    }

    _loadThemeStyles() {
        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic } = this.componentStyle.getCommonTheme?.() || {};
            BaseStyle.load(primitive?.css, { name: 'primitive-variables', ...this.styleOptions });
            BaseStyle.load(semantic?.css, { name: 'semantic-variables', ...this.styleOptions });
            BaseStyle.loadTheme({ name: 'global-style', ...this.styleOptions });

            Theme.setLoadedStyleName('common');
        }

        // component
        if (!Theme.isStyleNameLoaded(this.componentStyle?.name) && this.componentStyle.name) {
            const { css } = this.componentStyle.getComponentTheme?.() || {};
            this.componentStyle.load(css, { name: `${this.componentStyle.name}-variables`, ...this.styleOptions });
            this.componentStyle.loadTheme({ name: `${this.componentStyle.name}-style`, ...this.styleOptions });

            Theme.setLoadedStyleName(this.componentStyle.name);
        }

        // layer order
        if (!Theme.isStyleNameLoaded('layer-order')) {
            const layerOrder = this.componentStyle?.getLayerOrderThemeCSS?.();

            BaseStyle.load(layerOrder, { name: 'layer-order', first: true, ...this.styleOptions });

            Theme.setLoadedStyleName('layer-order');
        }
    }

    _loadScopedThemeStyles(preset) {
        const { css } = this.componentStyle?.getPresetTheme?.(preset, `[${this.attrSelector}]`) || {};
        const scopedStyle = this.componentStyle?.load(css, { name: `${this.attrSelector}-${this.componentStyle.name}`, ...this.styleOptions });

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
