import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, computed, Directive, effect, ElementRef, inject, Injector, Input, PLATFORM_ID, Renderer2, SimpleChanges, untracked } from '@angular/core';
import { Theme, ThemeService } from 'primeng/themes';
import { Base, BaseStyle } from 'primeng/base';
import { BaseComponentStyle } from './style/basecomponentstyle';
import { PrimeNGConfig } from 'primeng/api';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { AppConfigService } from '@service/appconfigservice';
import { DomHandler } from 'primeng/dom';

@Directive({ standalone: true, providers: [BaseComponentStyle, BaseStyle] })
export class BaseComponent {
    public document: Document = inject(DOCUMENT);

    public configService = inject(AppConfigService);

    public platformId: any = inject(PLATFORM_ID);

    public el: ElementRef = inject(ElementRef);

    public readonly injector: Injector = inject(Injector);

    public readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

    public renderer: Renderer2 = inject(Renderer2);

    public config: PrimeNGConfig = inject(PrimeNGConfig);

    public baseComponentStyle: BaseComponentStyle = inject(BaseComponentStyle);

    public baseStyle: BaseStyle = inject(BaseStyle);

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

    _getHostInstance(instance) {
        if (instance) {
            return instance ? (this['hostName'] ? (instance['name'] === this['hostName'] ? instance : this._getHostInstance(instance.parentInstance)) : instance.parentInstance) : undefined;
        }
    }

    ngOnInit() {
        if (this.document) {
            this._loadStyles();
            console.log(this.componentStyle);
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
                this.baseStyle.loadCSS(this.styleOptions);
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
            this.baseComponentStyle.loadCSS(this.styleOptions);
            this.componentStyle && this.componentStyle?.loadCSS(this.styleOptions);
            Base.setLoadedStyleName(this.componentStyle?.name);
        }
    }

    _loadThemeStyles() {
        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic } = this.componentStyle.getCommonTheme?.() || {};
            this.baseStyle.load(primitive?.css, { name: 'primitive-variables', ...this.styleOptions });
            this.baseStyle.load(semantic?.css, { name: 'semantic-variables', ...this.styleOptions });
            this.baseStyle.loadTheme({ name: 'global-style', ...this.styleOptions });
            Theme.setLoadedStyleName('common');
        }

        // component
        if (!Theme.isStyleNameLoaded(this.componentStyle?.name) && this.componentStyle?.name) {
            const { css } = this.componentStyle.getComponentTheme?.() || {};
            this.componentStyle.load(css, { name: `${this.componentStyle?.name}-variables`, ...this.styleOptions });
            this.componentStyle.loadTheme({ name: `${this.componentStyle?.name}-style`, ...this.styleOptions });
            Theme.setLoadedStyleName(this.componentStyle?.name);
        }

        // layer order
        if (!Theme.isStyleNameLoaded('layer-order')) {
            const layerOrder = this.componentStyle?.getLayerOrderThemeCSS?.();

            this.baseStyle.load(layerOrder, { name: 'layer-order', first: true, ...this.styleOptions });
            Theme.setLoadedStyleName('layer-order');
        }

        if (this.dt) {
            this._loadScopedThemeStyles(this.dt);
            this._themeChangeListener(() => this._loadScopedThemeStyles(this.dt));
        }
    }

    _loadScopedThemeStyles(preset) {
        const { css } = this.componentStyle?.getPresetTheme?.(preset, `[${this.attrSelector}]`) || {};
        const scopedStyle = this.componentStyle?.load(css, { name: `${this.attrSelector}-${this.componentStyle?.name}`, ...this.styleOptions });

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
