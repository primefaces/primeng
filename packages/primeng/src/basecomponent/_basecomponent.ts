/**
 *
 *
 *
 *
 * @todo - THIS ARCHIVE WILL BE REMOVED LATER
 * @deprecated - use BaseComponent instead
 *
 *
 *
 *
 */

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, computed, Directive, ElementRef, inject, InjectionToken, Injector, input, Input, OnDestroy, PLATFORM_ID, Renderer2, SimpleChanges } from '@angular/core';
import { Theme, ThemeService } from '@primeuix/styled';
import { cn, getKeyValue, mergeProps, uuid } from '@primeuix/utils';
import { Base, BaseStyle } from 'primeng/base';
import { PrimeNG } from 'primeng/config';
import { ObjectUtils } from 'primeng/utils';
import { BaseComponentStyle } from './style/basecomponentstyle';

export const PARENT_INSTANCE = new InjectionToken<_BaseComponent>('PARENT_INSTANCE');
@Directive({
    standalone: true,
    providers: [BaseComponentStyle, BaseStyle]
})
export class _BaseComponent implements OnDestroy {
    public document: Document = inject(DOCUMENT);

    public platformId: any = inject(PLATFORM_ID);

    public el: ElementRef = inject(ElementRef);

    public readonly injector: Injector = inject(Injector);

    public readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

    public renderer: Renderer2 = inject(Renderer2);

    public config: PrimeNG = inject(PrimeNG);

    public baseComponentStyle: BaseComponentStyle = inject(BaseComponentStyle);

    public baseStyle: BaseStyle = inject(BaseStyle);

    public scopedStyleEl: any;

    public rootEl: any;

    @Input() dt: Object | undefined;

    pt = input<any>();

    ptOptions = input<any>();

    private _pt = computed(() => this.pt() ?? this.config.pt());

    private _ptOptions = computed(() => this.ptOptions() ?? this.config.ptOptions());

    @Input() unstyled: boolean = false;

    parentInstance: _BaseComponent | undefined = inject(PARENT_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    params: any = {
        props: {},
        state: {}
    };

    get parent() {
        return this['parentInstance'];
    }

    get styleOptions() {
        return { nonce: this.config?.csp().nonce };
    }

    get _name() {
        return this.constructor.name.replace(/^_/, '').toLowerCase();
    }

    get componentStyle() {
        return this['_componentStyle'];
    }

    attrSelector = uuid('pc');

    private themeChangeListeners: Function[] = [];

    _getHostInstance(instance) {
        if (instance) {
            return instance ? (this['hostName'] ? (instance['name'] === this['hostName'] ? instance : this._getHostInstance(instance.parentInstance)) : instance.parentInstance) : undefined;
        }
    }

    _getOptionValue(options, key = '', params = {}) {
        return getKeyValue(options, key, params);
    }

    ngOnInit() {
        if (this.document) {
            this._loadCoreStyles();
            this._loadStyles();
        }

        this.params = this['initParams'] ? this['initParams']() : { props: {}, state: {} };
    }

    ngAfterViewInit() {
        this.rootEl = this.el?.nativeElement;

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
        // @ts-ignore
        this.themeChangeListeners.forEach((callback) => ThemeService.off('theme:change', callback));
    }

    _loadStyles() {
        const _load = () => {
            if (!Base.isStyleNameLoaded('base')) {
                this.baseStyle.loadBaseCSS(this.styleOptions);
                Base.setLoadedStyleName('base');
            }

            this._loadThemeStyles();
            // @todo update config.theme()
        };

        _load();
        this._themeChangeListener(() => _load());
    }

    _loadCoreStyles() {
        if (!Base.isStyleNameLoaded('base') && this.componentStyle?.name) {
            this.baseComponentStyle.loadCSS(this.styleOptions);
            this.componentStyle && this.componentStyle?.loadCSS(this.styleOptions);
            Base.setLoadedStyleName(this.componentStyle?.name);
        }
    }

    _loadThemeStyles() {
        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic, global, style } = this.componentStyle?.getCommonTheme?.() || {};

            this.baseStyle.load(primitive?.css, { name: 'primitive-variables', ...this.styleOptions });
            this.baseStyle.load(semantic?.css, { name: 'semantic-variables', ...this.styleOptions });
            this.baseStyle.load(global?.css, { name: 'global-variables', ...this.styleOptions });
            this.baseStyle.loadBaseStyle({ name: 'global-style', ...this.styleOptions }, style);

            Theme.setLoadedStyleName('common');
        }

        // component
        if (!Theme.isStyleNameLoaded(this.componentStyle?.name) && this.componentStyle?.name) {
            const { css, style } = this.componentStyle?.getComponentTheme?.() || {};

            this.componentStyle?.load(css, { name: `${this.componentStyle?.name}-variables`, ...this.styleOptions });
            this.componentStyle?.loadTheme({ name: `${this.componentStyle?.name}-style`, ...this.styleOptions }, style);

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
        const scopedStyle = this.componentStyle?.load(css, {
            name: `${this.attrSelector}-${this.componentStyle?.name}`,
            ...this.styleOptions
        });

        this.scopedStyleEl = scopedStyle?.el;
    }

    _unloadScopedThemeStyles() {
        this.scopedStyleEl?.remove();
    }

    _themeChangeListener(callback = () => {}) {
        Base.clearLoadedStyleNames();
        ThemeService.on('theme:change', callback);
        this.themeChangeListeners.push(callback);
    }

    cx(key: string, params = {}): string {
        return cn(this._getOptionValue(this.$style?.classes, key, { instance: this, ...params })) as string;
    }

    sx(key = '', when = true, params = {}) {
        if (when) {
            const self = this._getOptionValue(this.$style?.inlineStyles, key, { instance: this, ...params });
            //const base = this._getOptionValue(BaseComponentStyle.inlineStyles, key, { ...this.$params, ...params });

            return self;
        }

        return undefined;
    }

    get $style() {
        return this.componentStyle;
    }

    protected readonly cn = cn;

    // PASSTHROUGH FUNCTIONALITY

    ptm(key = '', params = {}) {
        return this._getPTValue(this._pt() || {}, key, { ...this._params(), ...params });
    }

    ptmo(obj = {}, key = '', params = {}) {
        return this._getPTValue(obj, key, { instance: this, ...params }, false);
    }

    ptms(keys: string[], params = {}) {
        return keys.reduce((acc, arg) => {
            acc = mergeProps(acc, this.ptm(arg, params)) || {};
            return acc;
        }, {});
    }

    _getPTDatasets(key = '') {
        const datasetPrefix = 'data-pc-';
        const isExtended = key === 'root' && ObjectUtils.isNotEmpty(this._pt()?.['data-pc-section']);

        return (
            key !== 'transition' && {
                ...(key === 'root' && {
                    [`${datasetPrefix}name`]: ObjectUtils.toFlatCase(isExtended ? this._pt()?.['data-pc-section'] : this._name),
                    ...(isExtended && { [`${datasetPrefix}extend`]: ObjectUtils.toFlatCase(this._name) })
                }),
                [`${datasetPrefix}section`]: ObjectUtils.toFlatCase(key)
            }
        );
    }

    defaultPT() {
        return this._getPT(this.config?.['pt'](), undefined, (value: any) => this._getOptionValue(value, this._name, { ...this._params() }) || ObjectUtils.getItemValue(value, { ...this._params() }));
    }

    _mergeProps(fn: any, ...args: any[]) {
        return ObjectUtils.isFunction(fn) ? fn(...args) : { ...args[0], ...args[1] };
    }

    _useDefaultPT(callback: any, key: any, params?: any) {
        return this._usePT(this.defaultPT(), callback, key, params);
    }

    _getPT(pt: any, key = '', callback?: any) {
        const getValue = (value: any, checkSameKey = false) => {
            const computedValue = callback ? callback(value) : value;
            const _key = ObjectUtils.toFlatCase(key);
            const _cKey = ObjectUtils.toFlatCase(this._name);

            return (checkSameKey ? (_key !== _cKey ? computedValue?.[_key] : undefined) : computedValue?.[_key]) ?? computedValue;
        };
        return pt?.hasOwnProperty('_usept')
            ? {
                  _usept: pt['_usept'],
                  originalValue: getValue(pt.originalValue),
                  value: getValue(pt.value)
              }
            : getValue(pt, true);
    }

    _usePT(pt: any, callback: any, key: any, params?: any) {
        const fn = (value: any) => callback(value, key, params);
        if (pt?.hasOwnProperty('_usept')) {
            const { mergeSections = true, mergeProps: useMergeProps = false } = pt['_usept'] || this.config?.['ptOptions']() || this._ptOptions() || {};
            const originalValue = fn(pt.originalValue);
            const value = fn(pt.value);

            if (originalValue === undefined && value === undefined) return undefined;
            else if (ObjectUtils.isString(value)) return value;
            else if (ObjectUtils.isString(originalValue)) return originalValue;

            return mergeSections || (!mergeSections && value) ? (useMergeProps ? { ...originalValue, ...value } : { ...originalValue, ...value }) : value;
        }

        return fn(pt);
    }

    _getPTValue(obj = {}, key = '', params = {}, searchInDefaultPT = true) {
        const searchOut = /./g.test(key) && !!params[key.split('.')[0]];
        const { mergeSections = true, mergeProps: useMergeProps = false } = this._getPropValue('_ptOptions')() || this.config?.['ptOptions']() || this._ptOptions() || {};
        const global = searchInDefaultPT ? (searchOut ? this._useGlobalPT(this._getPTClassValue.bind(this), key, params) : this._useDefaultPT(this._getPTClassValue.bind(this), key, params)) : undefined;
        const self = searchOut ? undefined : this._usePT(this._getPT(obj, this._name), this._getPTClassValue.bind(this), key, { ...params, global: {} });
        const datasets = this._getPTDatasets(key);
        return mergeSections || (!mergeSections && self) ? (useMergeProps ? { ...global, ...self, ...datasets } : { ...global, ...self, ...datasets }) : { ...self, ...datasets };
    }

    _useGlobalPT(callback: any, key: any, params: any) {
        return this._usePT(
            this._getPT(this.config?.['pt'](), undefined, (value: any) => ObjectUtils.getItemValue(value, { instance: this })),
            callback,
            key,
            params
        );
    }

    _getPTClassValue(options?: any, key?: any, params?: any) {
        const value = this._getOptionValue(options, key, params);
        return ObjectUtils.isString(value) || ObjectUtils.isArray(value) ? { class: value } : value;
    }

    _getPropValue(name: any) {
        return this[name] || this._getHostInstance(this)?.[name];
    }

    _params() {
        const parentInstance = this.parentInstance || this._getHostInstance(this) || this['parent'] || this['parentInstance'];

        const buildParentParams = (instance: any): any => {
            if (!instance) return undefined;

            const grandParentInstance = instance.parentInstance || instance._getHostInstance?.(instance) || instance['parent'] || instance['parentInstance'];

            return {
                instance: instance,
                props: instance.params?.props || instance,
                state: instance.params?.state || instance,
                ...(grandParentInstance && { parent: buildParentParams(grandParentInstance) })
            };
        };

        return {
            instance: this,
            props: this.params?.props || this,
            state: this.params?.state || this,
            ...(parentInstance && { parent: buildParentParams(parentInstance) })
        };
    }

    isUnstyled() {
        return this.unstyled;
    }
}
