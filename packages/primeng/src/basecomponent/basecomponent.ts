import { DOCUMENT, isPlatformServer } from '@angular/common';
import { ChangeDetectorRef, computed, Directive, effect, ElementRef, inject, InjectionToken, Injector, input, PLATFORM_ID, Renderer2, signal, SimpleChanges } from '@angular/core';
import { Theme, ThemeService } from '@primeuix/styled';
import { cn, getKeyValue, isArray, isFunction, isNotEmpty, isString, mergeProps, resolve, toFlatCase, uuid } from '@primeuix/utils';
import type { Lifecycle, PassThroughOptions } from 'primeng/api';
import { Base, BaseStyle } from 'primeng/base';
import { PrimeNG } from 'primeng/config';
import { BaseComponentStyle } from './style/basecomponentstyle';

export const PARENT_INSTANCE = new InjectionToken<BaseComponent>('PARENT_INSTANCE');

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

    public baseComponentStyle: BaseComponentStyle = inject(BaseComponentStyle);

    public baseStyle: BaseStyle = inject(BaseStyle);

    public scopedStyleEl: any;

    public parent = this.$params.parent;

    protected readonly cn = cn;

    private _themeScopedListener: () => void;

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

    /******************** Computed ********************/

    $attrSelector = uuid('pc');

    get $name() {
        return this['componentName'] || this.constructor?.name?.replace(/^_/, '') || 'UnknownComponent';
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
        return { theme: undefined, css: undefined, classes: undefined, inlineStyles: undefined, ...(this._getHostInstance(this) || {}).$style, ...this['_componentStyle'] };
    }

    get $styleOptions() {
        return { nonce: this.config?.csp().nonce };
    }

    get $params() {
        const parentInstance = this._getHostInstance(this) || this.$parentInstance;

        return {
            instance: this as any,
            parent: {
                instance: parentInstance
            }
        };
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
                ThemeService.off('theme:change', this._themeScopedListener);

                if (this.dt()) {
                    this._loadScopedThemeStyles(this.dt());
                    this._themeScopedListener = () => this._loadScopedThemeStyles(this.dt());
                    this._themeChangeListener(this._themeScopedListener);
                } else {
                    this._unloadScopedThemeStyles();
                }
            }

            onCleanup(() => {
                ThemeService.off('theme:change', this._themeScopedListener);
            });
        });

        // watch _unstyled_ changes
        effect((onCleanup) => {
            if (this.document && !isPlatformServer(this.platformId)) {
                ThemeService.off('theme:change', this._loadCoreStyles);

                if (!this.$unstyled()) {
                    this._loadCoreStyles();
                    this._themeChangeListener(this._loadCoreStyles); // Update styles with theme settings
                }
            }

            onCleanup(() => {
                ThemeService.off('theme:change', this._loadCoreStyles);
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
        this._loadCoreStyles();
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
        this.$el?.setAttribute(this.$attrSelector, '');

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

    private _hook(hookName: string, ...args: any[]) {
        if (!this.$hostName) {
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
        this._themeChangeListener(() => this._load());
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

    private _themeChangeListener(callback = () => {}) {
        Base.clearLoadedStyleNames();
        ThemeService.on('theme:change', callback.bind(this));
    }

    private _removeThemeListeners() {
        ThemeService.off('theme:change', this._loadCoreStyles);
        ThemeService.off('theme:change', this._load);
        ThemeService.off('theme:change', this._themeScopedListener);
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

    public ptm(key = '', params = {}) {
        return this._getPTValue(this.$pt() as any, key, { ...this.$params, ...params });
    }

    public ptms(keys: string[], params = {}) {
        return keys.reduce((acc, arg) => {
            acc = mergeProps(acc, this.ptm(arg, params)) || {};
            return acc;
        }, {});
    }

    public ptmo(obj = {}, key = '', params = {}) {
        return this._getPTValue(obj, key, { instance: this, ...params }, false);
    }

    public cx(key: string, params = {}) {
        return !this.$unstyled() ? cn(this._getOptionValue(this.$style.classes, key, { ...this.$params, ...params })) : undefined;
    }

    public sx(key = '', when = true, params = {}) {
        if (when) {
            const self = this._getOptionValue(this.$style.inlineStyles, key, { ...this.$params, ...params }) as Record<string, any>;
            const base = this._getOptionValue(this.baseComponentStyle.inlineStyles, key, { ...this.$params, ...params }) as Record<string, any>;

            return { ...base, ...self };
        }

        return undefined;
    }
}
