import { DOCUMENT, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, computed, Directive, effect, ElementRef, inject, InjectionToken, Injector, input, PLATFORM_ID, Renderer2, signal, SimpleChanges } from '@angular/core';
import { Theme, ThemeService } from '@primeuix/styled';
import { cn, getKeyValue, isArray, isFunction, isNotEmpty, isString, mergeProps, resolve, toFlatCase, uuid } from '@primeuix/utils';
import type { Lifecycle, PassThroughOptions } from 'primeng/api';
import { Base, BaseStyle } from 'primeng/base';
import { PrimeNG } from 'primeng/config';
import { BaseComponentStyle } from './style/basecomponentstyle';

export const PARENT_INSTANCE = new InjectionToken<BaseComponent>('PARENT_INSTANCE');

export interface BaseComponentPerformanceContext {
    themeReactive?: () => boolean | undefined;
    scopedTokens?: () => boolean | undefined;
}

export const PERFORMANCE_CONTEXT = new InjectionToken<BaseComponentPerformanceContext>('PERFORMANCE_CONTEXT');

@Directive({
    standalone: true,
    providers: [BaseComponentStyle, BaseStyle]
})
export class BaseComponent<PT = any> implements Lifecycle {
    public document: Document = inject(DOCUMENT);

    public platformId: any = inject(PLATFORM_ID);

    public el: ElementRef = inject(ElementRef);

    public readonly injector: Injector = inject(Injector);

    public readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

    public renderer: Renderer2 = inject(Renderer2);

    public config: PrimeNG = inject(PrimeNG);

    public $parentInstance: BaseComponent | undefined = inject(PARENT_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    public $performanceContext: BaseComponentPerformanceContext | undefined = inject(PERFORMANCE_CONTEXT, { optional: true, skipSelf: true }) ?? undefined;

    public baseComponentStyle: BaseComponentStyle = inject(BaseComponentStyle);

    public baseStyle: BaseStyle = inject(BaseStyle);

    public scopedStyleEl: any;

    public parent = this.$params.parent;

    protected readonly cn = cn;

    private _themeScopedListener: () => void;

    private themeChangeListenerMap: Map<string, any> = new Map();

    private ptmCache: Map<string, Record<string, any>> = new Map();

    private ptmsCache: Map<string, Record<string, any>> = new Map();

    private cxStaticCache: Map<string, string | undefined> = new Map();

    private sxStaticCache: Map<string, Record<string, any> | undefined> = new Map();

    private styleCache: any;

    private emptyPT: Record<string, any> = {};

    private paramsCache: any;

    private paramsCacheName: string | undefined;

    private paramsCacheHostName: any;

    private paramsCacheParentInstance: BaseComponent | undefined;

    /******************** Inputs ********************/

    /**
     * Defines scoped design tokens of the component.
     * @defaultValue undefined
     * @group Props
     */
    dt = input<Object | undefined>();
    /**
     * Indicates whether the component should be rendered without styles.
     * @defaultValue undefined
     * @group Props
     */
    unstyled = input<boolean | undefined>();
    /**
     * Used to pass attributes to DOM elements inside the component.
     * @defaultValue undefined
     * @group Props
     */
    pt = input<PT | undefined>();
    /**
     * Used to configure passthrough(pt) options of the component.
     * @group Props
     * @defaultValue undefined
     */
    ptOptions = input<PassThroughOptions | undefined>();
    /**
     * Enables per-instance theme change reactivity.
     * Set to `false` in performance-sensitive component subtrees when runtime theme changes are not needed.
     * @defaultValue undefined
     */
    themeReactive = input<boolean | undefined>();
    /**
     * Enables scoped design token handling through the `dt` input.
     * Set to `false` in performance-sensitive component subtrees when scoped tokens are not used.
     * @defaultValue undefined
     */
    scopedTokens = input<boolean | undefined>();

    /******************** Computed ********************/

    $attrSelector = uuid('pc');

    get $name() {
        return this['componentName'] || 'UnknownComponent';
    }

    private get $hostName() {
        return this['hostName'];
    }

    get $el() {
        return this.el?.nativeElement;
    }

    directivePT = signal<any>(undefined);

    directiveUnstyled = signal<boolean | undefined>(undefined);

    $unstyled = computed(() => {
        return this.unstyled() ?? this.directiveUnstyled() ?? this.config?.unstyled() ?? false;
    });

    $pt = computed(() => {
        return resolve(this.pt() || this.directivePT(), this.$params);
    });

    get $globalPT() {
        return this._getPT(this.config?.pt(), undefined, (value) => resolve(value, this.$params));
    }

    get $defaultPT() {
        return this._getPT(this.config?.pt(), undefined, (value) => this._getOptionValue(value, this.$hostName || this.$name, this.$params) || resolve(value, this.$params));
    }

    get $style() {
        if (this.styleCache) {
            return this.styleCache;
        }

        const hostStyle = (this._getHostInstance(this) || {}).$style;
        const componentStyle = this['_componentStyle'];
        const style = { theme: undefined, css: undefined, classes: undefined, inlineStyles: undefined, ...hostStyle, ...componentStyle };

        if (hostStyle || componentStyle) {
            this.styleCache = style;
        }

        return style;
    }

    get $styleOptions() {
        return { nonce: this.config?.csp().nonce };
    }

    get $params() {
        const name = this.$name;
        const hostName = this.$hostName;
        const parentInstance = this._getHostInstance(this) || this.$parentInstance;

        if (this.paramsCache && this.paramsCacheName === name && this.paramsCacheHostName === hostName && this.paramsCacheParentInstance === parentInstance) {
            return this.paramsCache;
        }

        this.paramsCacheName = name;
        this.paramsCacheHostName = hostName;
        this.paramsCacheParentInstance = parentInstance;
        this.paramsCache = {
            instance: this as any,
            parent: {
                instance: parentInstance
            }
        };

        return this.paramsCache;
    }

    /******************** Lifecycle Hooks ********************/

    onInit() {
        // NOOP - to be implemented by subclasses
    }

    onChanges(changes: SimpleChanges) {
        // NOOP - to be implemented by subclasses
    }

    onDoCheck() {
        // NOOP - to be implemented by subclasses
    }

    onAfterContentInit() {
        // NOOP - to be implemented by subclasses
    }

    onAfterContentChecked() {
        // NOOP - to be implemented by subclasses
    }

    onAfterViewInit() {
        // NOOP - to be implemented by subclasses
    }

    onAfterViewChecked() {
        // NOOP - to be implemented by subclasses
    }

    onDestroy() {
        // NOOP - to be implemented by subclasses
    }

    /******************** Angular Lifecycle Hooks ********************/

    constructor() {
        // watch _dt_ changes
        effect((onCleanup) => {
            if (this.document && !isPlatformServer(this.platformId)) {
                if (this._isScopedTokensEnabled() && this.dt()) {
                    this._loadScopedThemeStyles(this.dt());

                    if (this._isThemeReactive()) {
                        this._themeScopedListener = () => this._loadScopedThemeStyles(this.dt());
                        this._themeChangeListener('_themeScopedListener', this._themeScopedListener);
                    }
                } else {
                    this._unloadScopedThemeStyles();
                }
            }

            onCleanup(() => {
                this._offThemeChangeListener('_themeScopedListener');
            });
        });

        // watch _unstyled_ changes
        effect((onCleanup) => {
            if (this.document && !isPlatformServer(this.platformId)) {
                if (this._isThemeReactive() && !this.$unstyled() && this._hasCoreStyles()) {
                    this._loadCoreStyles();
                    this._themeChangeListener('_loadCoreStyles', this._loadCoreStyles); // Update styles with theme settings
                }
            }

            onCleanup(() => {
                this._offThemeChangeListener('_loadCoreStyles');
            });
        });

        this._hook('onBeforeInit');
    }

    /**
     * ⚠ Do not override ngOnInit!
     *
     * Use 'onInit()' in subclasses instead.
     */
    ngOnInit() {
        if (this._hasCoreStyles()) {
            this._loadCoreStyles();
        }

        this._loadStyles();

        this.onInit();
        this._hook('onInit');
    }

    /**
     * ⚠ Do not override ngOnChanges!
     *
     * Use 'onChanges(changes: SimpleChanges)' in subclasses instead.
     */
    ngOnChanges(changes: SimpleChanges) {
        this.onChanges(changes);
        this._hook('onChanges', changes);
    }

    /**
     * ⚠ Do not override ngDoCheck!
     *
     * Use 'onDoCheck()' in subclasses instead.
     */
    ngDoCheck() {
        this.onDoCheck();
        this._hook('onDoCheck');
    }

    /**
     * ⚠ Do not override ngAfterContentInit!
     *
     * Use 'onAfterContentInit()' in subclasses instead.
     */
    ngAfterContentInit() {
        this.onAfterContentInit();
        this._hook('onAfterContentInit');
    }

    /**
     * ⚠ Do not override ngAfterContentChecked!
     *
     * Use 'onAfterContentChecked()' in subclasses instead.
     */
    ngAfterContentChecked() {
        this.onAfterContentChecked();
        this._hook('onAfterContentChecked');
    }

    /**
     * ⚠ Do not override ngAfterViewInit!
     *
     * Use 'onAfterViewInit()' in subclasses instead.
     */
    ngAfterViewInit() {
        // @todo - remove this after implementing pt for root
        if (this.config?.ptMetadata()) {
            this.$el?.setAttribute(this.$attrSelector, '');
        }

        this.onAfterViewInit();
        this._hook('onAfterViewInit');
    }

    /**
     * ⚠ Do not override ngAfterViewChecked!
     *
     * Use 'onAfterViewChecked()' in subclasses instead.
     */
    ngAfterViewChecked() {
        this.onAfterViewChecked();
        this._hook('onAfterViewChecked');
    }

    /**
     * ⚠ Do not override ngOnDestroy!
     *
     * Use 'onDestroy()' in subclasses instead.
     */
    ngOnDestroy() {
        this._removeThemeListeners();
        this._unloadScopedThemeStyles();

        this.onDestroy();
        this._hook('onDestroy');
    }

    /******************** Methods ********************/

    private _mergeProps(fn: any, ...args: any[]) {
        return isFunction(fn) ? fn(...args) : mergeProps(...args);
    }

    private _getHostInstance(instance: any) {
        return instance ? (this.$hostName ? (this.$name === this.$hostName ? instance : this._getHostInstance(instance.$parentInstance)) : instance.$parentInstance) : undefined;
    }

    private _getPropValue(name: string) {
        return this[name] || this._getHostInstance(this)?.[name];
    }

    private _getOptionValue(options: any, key = '', params = {}) {
        return getKeyValue(options, key, params);
    }

    private _getRawOptionValue(options: any, key = '') {
        if (!key || !options) {
            return options;
        }

        return key.split('.').reduce((acc, part) => acc?.[part], options);
    }

    private _isStaticClassValue(value: any) {
        return isString(value) || (isArray(value) && value.every((item) => isString(item)));
    }

    private _isStaticStyleValue(value: any) {
        return !isFunction(value);
    }

    private _getInheritedBooleanOption(name: string, defaultValue = true) {
        const ownValue = this[name]?.();

        if (ownValue !== undefined) {
            return ownValue;
        }

        const parentInstance = this._getHostInstance(this) || this.$parentInstance;
        const parentValue = parentInstance?.[name];
        const contextValue = this.$performanceContext?.[name];

        return (isFunction(parentValue) ? parentValue.call(parentInstance) : parentValue) ?? (isFunction(contextValue) ? contextValue.call(this.$performanceContext) : contextValue) ?? defaultValue;
    }

    private _isThemeReactive() {
        return this._getInheritedBooleanOption('themeReactive');
    }

    private _isScopedTokensEnabled() {
        return this._getInheritedBooleanOption('scopedTokens');
    }

    private _hook(hookName: string, ...args: any[]) {
        if (this.config?.ptBinding() && !this.$hostName && this._hasPTConfig()) {
            const selfHook = this._usePT(this._getPT(this.$pt(), this.$name), this._getOptionValue, `hooks.${hookName}`);
            const defaultHook = this._useDefaultPT(this._getOptionValue, `hooks.${hookName}`);

            selfHook?.(...args);
            defaultHook?.(...args);
        }
    }

    /********** Load Styles **********/

    private _load() {
        if (!Base.isStyleNameLoaded('base')) {
            this.baseStyle.loadBaseCSS(this.$styleOptions);
            this._loadGlobalStyles();

            Base.setLoadedStyleName('base');
        }

        this._loadThemeStyles();
    }

    private _loadStyles() {
        this._load();

        if (this._isThemeReactive()) {
            this._themeChangeListener('_load', () => this._load());
        }
    }

    private _loadGlobalStyles() {
        const globalCSS = this._useGlobalPT(this._getOptionValue, 'global.css', this.$params);

        isNotEmpty(globalCSS) && this.baseStyle.load(globalCSS, { name: 'global', ...this.$styleOptions });
    }

    private _loadCoreStyles() {
        if (!Base.isStyleNameLoaded(this.$style?.name) && this.$style?.name) {
            this.baseComponentStyle.loadCSS(this.$styleOptions);
            this.$style.loadCSS(this.$styleOptions);

            Base.setLoadedStyleName(this.$style.name);
        }
    }

    private _hasCoreStyles() {
        return !!(this.baseComponentStyle?.css || this.$style?.css);
    }

    private _loadThemeStyles() {
        if (this.$unstyled() || this.config?.theme() === 'none') return;

        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic, global, style } = this.$style?.getCommonTheme?.() || {};

            this.baseStyle.load(primitive?.css, { name: 'primitive-variables', ...this.$styleOptions });
            this.baseStyle.load(semantic?.css, { name: 'semantic-variables', ...this.$styleOptions });
            this.baseStyle.load(global?.css, { name: 'global-variables', ...this.$styleOptions });
            this.baseStyle.loadBaseStyle({ name: 'global-style', ...this.$styleOptions }, style);

            Theme.setLoadedStyleName('common');
        }

        // component
        if (!Theme.isStyleNameLoaded(this.$style?.name) && this.$style?.name) {
            const { css, style } = this.$style?.getComponentTheme?.() || {};

            this.$style?.load(css, { name: `${this.$style?.name}-variables`, ...this.$styleOptions });
            this.$style?.loadStyle({ name: `${this.$style?.name}-style`, ...this.$styleOptions }, style);

            Theme.setLoadedStyleName(this.$style?.name);
        }

        // layer order
        if (!Theme.isStyleNameLoaded('layer-order')) {
            const layerOrder = this.$style?.getLayerOrderThemeCSS?.();

            this.baseStyle.load(layerOrder, { name: 'layer-order', first: true, ...this.$styleOptions });
            Theme.setLoadedStyleName('layer-order');
        }
    }

    private _loadScopedThemeStyles(preset) {
        const { css } = this.$style?.getPresetTheme?.(preset, `[${this.$attrSelector}]`) || {};
        const scopedStyle = this.$style?.load(css, { name: `${this.$attrSelector}-${this.$style?.name}`, ...this.$styleOptions });

        this.scopedStyleEl = scopedStyle?.el;
    }

    private _unloadScopedThemeStyles() {
        this.scopedStyleEl?.remove();
    }

    private _themeChangeListener(id: string, callback = () => {}) {
        Base._ensureThemeChangeWired();
        this._offThemeChangeListener(id);
        const hold = callback.bind(this);
        const styleName = this.$style?.name;

        if ((id === '_load' || id === '_loadCoreStyles') && styleName) {
            this.themeChangeListenerMap.set(id, Base._registerGroupedThemeChangeListener(`${id}:${styleName}`, hold));
        } else {
            this.themeChangeListenerMap.set(id, () => ThemeService.off('theme:change', hold));
            ThemeService.on('theme:change', hold);
        }
    }

    private _removeThemeListeners() {
        this._offThemeChangeListener('_themeScopedListener');
        this._offThemeChangeListener('_loadCoreStyles');
        this._offThemeChangeListener('_load');
    }

    private _offThemeChangeListener(id: string) {
        if (this.themeChangeListenerMap.has(id)) {
            this.themeChangeListenerMap.get(id)?.();
            this.themeChangeListenerMap.delete(id);
        }
    }

    /********** Passthrough **********/

    private _getPTValue(obj = {}, key = '', params = {}, searchInDefaultPT = true) {
        const searchOut = /./g.test(key) && !!params[key.split('.')[0]];
        const { mergeSections = true, mergeProps: useMergeProps = false } = this._getPropValue('ptOptions')?.() || this.config?.['ptOptions']?.() || {};
        const global = searchInDefaultPT ? (searchOut ? this._useGlobalPT(this._getPTClassValue, key, params) : this._useDefaultPT(this._getPTClassValue, key, params)) : undefined;
        const self = searchOut ? undefined : this._usePT(this._getPT(obj, this.$hostName || this.$name), this._getPTClassValue, key, { ...params, global: global || {} });
        const datasets = this._getPTDatasets(key);

        return mergeSections || (!mergeSections && self) ? (useMergeProps ? this._mergeProps(useMergeProps, global, self, datasets) : { ...global, ...self, ...datasets }) : { ...self, ...datasets };
    }

    private _getPTDatasets(key = '') {
        if (!this.config?.ptBinding() || !this.config?.ptMetadata()) {
            return undefined;
        }

        const datasetPrefix = 'data-pc-';
        const isExtended = key === 'root' && isNotEmpty(this.$pt()?.['data-pc-section']);

        return (
            key !== 'transition' && {
                ...(key === 'root' && {
                    [`${datasetPrefix}name`]: toFlatCase(isExtended ? this.$pt()?.['data-pc-section'] : this.$name),
                    ...(isExtended && { [`${datasetPrefix}extend`]: toFlatCase(this.$name) }),
                    [`${this.$attrSelector}`]: '' // @todo - use `data-pc-id: this.$attrSelector` instead.
                }),
                [`${datasetPrefix}section`]: toFlatCase(key.includes('.') ? (key.split('.').at(-1) ?? '') : key)
            }
        );
    }

    private _hasPTConfig() {
        return !!(this.pt() || this.directivePT() || this.config?.pt());
    }

    private _hasPTParams(params: Record<string, any> | undefined) {
        return params ? Object.keys(params).length > 0 : false;
    }

    private _getCachedPTMDatasets(key = '') {
        let cached = this.ptmCache.get(key);

        if (!cached) {
            const datasets = this._getPTDatasets(key);
            cached = datasets ? { ...datasets } : {};
            this.ptmCache.set(key, cached);
        }

        return cached;
    }

    private _getPTClassValue(options?: any, key?: any, params?: any) {
        const value = this._getOptionValue(options, key, params);

        return isString(value) || isArray(value) ? { class: value } : value;
    }

    private _getPT(pt: any, key = '', callback?: any) {
        const getValue = (value, checkSameKey = false) => {
            const computedValue = callback ? callback(value) : value;
            const _key = toFlatCase(key);
            const _cKey = toFlatCase(this.$hostName || this.$name);

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

    private _usePT(pt: any, callback: any, key: any, params?: any) {
        const fn = (value) => callback?.call(this, value, key, params);

        if (pt?.hasOwnProperty('_usept')) {
            const { mergeSections = true, mergeProps: useMergeProps = false } = pt['_usept'] || this.config?.['ptOptions']() || {};
            const originalValue = fn(pt.originalValue);
            const value = fn(pt.value);

            if (originalValue === undefined && value === undefined) return undefined;
            else if (isString(value)) return value;
            else if (isString(originalValue)) return originalValue;

            return mergeSections || (!mergeSections && value) ? (useMergeProps ? this._mergeProps(useMergeProps, originalValue, value) : { ...originalValue, ...value }) : value;
        }

        return fn(pt);
    }

    private _useGlobalPT(callback: any, key: any, params?: any) {
        return this._usePT(this.$globalPT, callback, key, params);
    }

    private _useDefaultPT(callback: any, key: any, params?: any) {
        return this._usePT(this.$defaultPT, callback, key, params);
    }

    /******************** Exposed API ********************/

    public ptm(key = '', params?: Record<string, any>) {
        if (!this.config?.ptBinding()) {
            return this.emptyPT;
        }

        if (!this._hasPTConfig() && !this._hasPTParams(params)) {
            return this._getCachedPTMDatasets(key);
        }

        return this._getPTValue(this.$pt() as any, key, { ...this.$params, ...params });
    }

    public ptms(keys: string[], params?: Record<string, any>) {
        if (!this.config?.ptBinding()) {
            return this.emptyPT;
        }

        if (!this._hasPTConfig() && !this._hasPTParams(params)) {
            const cacheKey = keys.join('|');
            let cached = this.ptmsCache.get(cacheKey);

            if (!cached) {
                cached =
                    keys.reduce((acc, arg) => {
                        acc = mergeProps(acc, this._getCachedPTMDatasets(arg)) || {};
                        return acc;
                    }, {}) || {};
                this.ptmsCache.set(cacheKey, cached);
            }

            return cached;
        }

        return (
            keys.reduce((acc, arg) => {
                acc = mergeProps(acc, this.ptm(arg, params)) || {};
                return acc;
            }, {}) || {}
        );
    }

    public ptmo(obj = {}, key = '', params = {}) {
        if (!this.config?.ptBinding()) {
            return this.emptyPT;
        }

        return this._getPTValue(obj, key, { instance: this, ...params }, false);
    }

    public cx(key: string, params = {}) {
        if (this.$unstyled()) {
            return undefined;
        }

        if (!this._hasPTParams(params)) {
            if (this.cxStaticCache.has(key)) {
                return this.cxStaticCache.get(key);
            }

            const rawValue = this._getRawOptionValue(this.$style.classes, key);

            if (this._isStaticClassValue(rawValue)) {
                const className = cn(rawValue);

                this.cxStaticCache.set(key, className);

                return className;
            }
        }

        return cn(this._getOptionValue(this.$style.classes, key, { ...this.$params, ...params }));
    }

    public sx(key = '', when = true, params = {}) {
        if (when) {
            if (!this._hasPTParams(params)) {
                const rawSelf = this._getRawOptionValue(this.$style.inlineStyles, key);
                const rawBase = this._getRawOptionValue(this.baseComponentStyle.inlineStyles, key);

                if (this._isStaticStyleValue(rawSelf) && this._isStaticStyleValue(rawBase)) {
                    const cacheKey = key || '$root';

                    if (this.sxStaticCache.has(cacheKey)) {
                        return this.sxStaticCache.get(cacheKey);
                    }

                    const style = { ...rawBase, ...rawSelf };
                    const cached = isNotEmpty(style) ? style : undefined;

                    this.sxStaticCache.set(cacheKey, cached);

                    return cached;
                }
            }

            const self = this._getOptionValue(this.$style.inlineStyles, key, { ...this.$params, ...params }) as Record<string, any>;
            const base = this._getOptionValue(this.baseComponentStyle.inlineStyles, key, { ...this.$params, ...params }) as Record<string, any>;

            if (!isNotEmpty(base) && !isNotEmpty(self)) {
                return undefined;
            }

            return { ...base, ...self };
        }

        return undefined;
    }
}
