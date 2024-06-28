import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, computed, Directive, effect, ElementRef, inject, Injector, Input, PLATFORM_ID, SimpleChanges, untracked } from '@angular/core';
import { Theme, ThemeService } from 'primeng/themes';
import { Base, BaseStyle } from 'primeng/base';
import BaseComponentStyle from './style/basecomponentstyle';
import { PrimeNGConfig } from 'primeng/api';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { AppConfigService } from '@service/appconfigservice';
import { DomHandler } from 'primeng/dom';

@Directive({ standalone: true })
export class BaseComponent {
    public document: Document = inject(DOCUMENT);

    public configService = inject(AppConfigService);

    public platformId: any = inject(PLATFORM_ID);

    public el: ElementRef = inject(ElementRef);

    public readonly injector: Injector = inject(Injector);

    public readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

    public config: PrimeNGConfig = inject(PrimeNGConfig);

    public scopedStyleEl: any;

    public rootEl: any;

    @Input() dt: Object | undefined;

    get styleOptions() {
        return { nonce: this.config?.csp().nonce };
    }

    get _name() {
        return this.constructor.name.replace(/^_/, '').toLowerCase();
    }

    get componentStyle() {
        return this['_componentStyle'];
    }

    attrSelector = UniqueComponentId('pc');

    constructor() {}

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

    ngAfterViewInit() {
        this.rootEl = DomHandler.findSingle(this.el.nativeElement, `[data-pc-name="${ObjectUtils.toFlatCase(this._name)}"]`);
        if (this.rootEl) {
            this.rootEl?.setAttribute(this.attrSelector, '');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.document && !isPlatformServer(this.platformId)) {
            const { dt } = changes;
            if (dt && dt.currentValue) {
                this._loadScopedThemeStyles(dt.currentValue);
                this._themeChangeListener(() => this._loadScopedThemeStyles(dt.currentValue));
            }
        }
    }

    ngOnDestroy() {
        this._unloadScopedThemeStyles();
    }

    _loadStyles() {
        const _load = () => {
            if (!Base.isStyleNameLoaded('base')) {
                BaseStyle.loadCSS(this.document, this.styleOptions);
                Base.setLoadedStyleName('base');
            }

            this._loadThemeStyles();
            // @todo update config.theme()
        };

        _load();
        this._themeChangeListener(() => _load());
    }

    _loadCoreStyles() {
        if (!Base.isStyleNameLoaded('base') && this._name) {
            BaseComponentStyle.loadCSS(this.document, this.styleOptions);
            this.componentStyle && this.componentStyle?.loadCSS(this.document, this.styleOptions);

            Base.setLoadedStyleName(this.componentStyle?.name);
        }
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

            Theme.setLoadedStyleName(this.componentStyle?.name);
        }

        // layer order
        if (!Theme.isStyleNameLoaded('layer-order')) {
            const layerOrder = this.componentStyle?.getLayerOrderThemeCSS?.();

            BaseStyle.load(this.document, layerOrder, { name: 'layer-order', first: true, ...this.styleOptions });
            Theme.setLoadedStyleName('layer-order');
        }

        if (this.dt) {
            this._loadScopedThemeStyles(this.dt);
            this._themeChangeListener(() => this._loadScopedThemeStyles(this.dt));
        }
    }

    _loadScopedThemeStyles(preset) {
        const { css } = this.componentStyle?.getPresetTheme?.(preset, `[${this.attrSelector}]`) || {};
        const scopedStyle = this.componentStyle?.load(this.document, css, { name: `${this.attrSelector}-${this.componentStyle?.name}`, ...this.styleOptions });

        this.scopedStyleEl = scopedStyle.el;
    }

    _unloadScopedThemeStyles() {
        this.scopedStyleEl?.remove();
    }

    _themeChangeListener(callback = () => {}) {
        Base.clearLoadedStyleNames();
        ThemeService.on('theme:change', callback);
    }
}
