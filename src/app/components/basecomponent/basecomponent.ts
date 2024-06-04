import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Directive, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { Theme, ThemeService } from 'primeng/themes';
import { Base, BaseStyle } from 'primeng/base';
import { BaseComponentStyle } from './public_api';
import { PrimeNGConfig } from 'primeng/api';

@Directive({ standalone: true })
export class BaseComponent {
    public document: Document = inject(DOCUMENT);

    public platformId: any = inject(PLATFORM_ID);

    public el: ElementRef = inject(ElementRef);

    public config: PrimeNGConfig = inject(PrimeNGConfig);

    private _isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    private _isPlatformServer() {
        return isPlatformServer(this.platformId);
    }

    get styleOptions() {
        return { nonce: this.config?.csp().nonce };
    }

    get theme() {
        return this['_theme'];
    }

    get name() {
        return this.constructor.name.replace(/^_/, '').toLowerCase();
    }

    get _style() {
        return { classes: undefined, inlineStyles: undefined, load: () => {}, loadCSS: () => {}, loadTheme: () => {}, ...(this._getHostInstance(this) || {}).componentStyle, ...this['componentStyle'] };
    }

    get componentStyle() {
        return this['_componentStyle'];
    }

    _getHostInstance(instance) {
        if (instance) {
            return instance ? (this['hostName'] ? (instance['name'] === this['hostName'] ? instance : this._getHostInstance(instance.parentInstance)) : instance.parentInstance) : undefined;
        }
    }

    ngOnInit() {
        if (this._isPlatformServer()) {
            this.document.head.innerHTML += `<style>${this.theme}</style>`;
        }
    }

    _loadStyles() {
        const _load = () => {
            if (!Base.isStyleNameLoaded('base')) {
                // BaseStyle.loadCSS(this.styleOptions);
                // Base.setLoadedStyleName('base');
            }

            this._loadThemeStyles();
        };

        _load();
        this._themeChangeListener(_load);
    }

    _loadCoreStyles() {
        if (!Base.isStyleNameLoaded('base') && this.name) {
            BaseComponentStyle.loadCSS(this.styleOptions);
        }
    }

    _loadThemeStyles() {}

    _loadScopedThemeStyles() {}

    _themeChangeListener(callback = () => {}) {
        Base.clearLoadedStyleNames();
        ThemeService.on('theme:change', callback);
    }
}
