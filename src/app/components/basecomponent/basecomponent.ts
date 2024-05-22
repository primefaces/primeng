// import { DOCUMENT } from '@angular/common';
// import { Input, ElementRef, Directive, SimpleChanges, effect, inject, ChangeDetectorRef, Renderer2, PLATFORM_ID, NgZone, computed, signal, afterRender, afterNextRender, ContentChildren, QueryList } from '@angular/core';
// import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
// import { PrimeNGConfig } from '../api/primengconfig';
// import { platformBrowser } from '@angular/platform-browser';
// import { useStyle } from 'primeng/usestyle';
// import { PrimeTemplate } from '../api/shared';
// @Directive({ standalone: true })
// export class BaseComponent {
//     public el: ElementRef = inject(ElementRef);

//     public renderer: Renderer2 = inject(Renderer2);

//     public cd: ChangeDetectorRef = inject(ChangeDetectorRef);

//     public config: PrimeNGConfig = inject(PrimeNGConfig);

//     public document: Document = inject(DOCUMENT);

//     public platformId: any = inject(PLATFORM_ID);

//     public componentId: string = UniqueComponentId();

//     public zone: NgZone = inject(NgZone);

//     public isPlatformBrowser() {
//         return platformBrowser(this.platformId);
//     }

//     public parentEl: ElementRef | undefined;

//     @Input() ptOptions: { [arg: string]: any } | undefined | null;

//     @Input() unstyled: boolean = false;

//     @Input() pt: { [arg: string]: any } | undefined | null;

//     @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

//     params: any = {
//         props: {},
//         state: {}
//     };

//     constructor() {
//         afterRender(() => {
//             // this._hook('afterRender');
//         });
//         afterNextRender(() => {
//             // this._hook('afterNextRender');
//         });
//     }

//     ngOnInit() {
//         this._loadGlobalStyles();
//         this.params = this['initParams']();
//         // this._hook('onInit');
//     }

//     ngAfterViewInit() {
//         // this._hook('afterViewInit');
//     }

//     ngAfterContentInit() {
//         // this._hook('afterContentInit');
//     }

//     ngAfterViewChecked() {
//         // this._hook('afterViewChecked');
//     }

//     ngAfterContentChecked() {
//         // this._hook('afterContentChecked');
//     }

//     ngOnDestroy() {
//         // this._hook('onDestroy');
//     }

//     ngOnChanges(changes: SimpleChanges) {
//         if (changes) {
//             Object.keys(changes).forEach((key) => {
//                 if (key !== 'pt') {
//                     if (this.params.props[key] !== changes[key].currentValue) {
//                         this.params.props[key] = changes[key].currentValue;
//                     }
//                 }
//             });
//         }

//         // this._hook('onChanges');
//     }

//     mergeClasses(...args) {
//         const classNames = args.map((arg) => {
//             if (typeof arg === 'object') {
//                 return Object.keys(arg)
//                     .filter((key) => arg[key])
//                     .join(' ');
//             } else {
//                 return arg;
//             }
//         });
//         return classNames.join(' ');
//     }

//     _hook(hookName) {
//         if (!this['hostName']) {
//             this._usePT(this._getPT(this.pt || this.config?.pt, this.name), this._getOptionValue.bind(this), `hooks.${hookName}`);
//             this._useDefaultPT(this._getOptionValue.bind(this), `hooks.${hookName}`);
//         }
//     }

//     ptm(key = '', params = {}) {
//         return this._getPTValue(this.pt, key, { ...this._params(), ...params });
//     }

//     _getPTDatasets(key = '') {
//         const datasetPrefix = 'data-pc-';
//         const isExtended = key === 'root' && ObjectUtils.isNotEmpty(this.pt?.['data-pc-section']);

//         return (
//             key !== 'transition' && {
//                 ...(key === 'root' && {
//                     [`${datasetPrefix}name`]: ObjectUtils.toFlatCase(isExtended ? this.pt?.['data-pc-section'] : this.name),
//                     ...(isExtended && { [`${datasetPrefix}extend`]: ObjectUtils.toFlatCase(this.name) })
//                 }),
//                 [`${datasetPrefix}section`]: ObjectUtils.toFlatCase(key)
//             }
//         );
//     }

//     defaultPT() {
//         return this._getPT(this.config?.pt, undefined, (value) => this._getOptionValue(value, this.name, { ...this._params() }) || ObjectUtils.getItemValue(value, { ...this._params() }));
//     }

//     _mergeProps(fn, ...args) {
//         return ObjectUtils.isFunction(fn) ? fn(...args) : ObjectUtils.mergeProps(...args);
//     }

//     _useDefaultPT(callback, key, params?) {
//         return this._usePT(this.defaultPT(), callback, key, params);
//     }

//     _getPT(pt, key = '', callback?) {
//         const getValue = (value, checkSameKey = false) => {
//             const computedValue = callback ? callback(value) : value;
//             const _key = ObjectUtils.toFlatCase(key);
//             const _cKey = ObjectUtils.toFlatCase(this.name);

//             return (checkSameKey ? (_key !== _cKey ? computedValue?.[_key] : undefined) : computedValue?.[_key]) ?? computedValue;
//         };
//         return pt?.hasOwnProperty('_usept')
//             ? {
//                   _usept: pt['_usept'],
//                   originalValue: getValue(pt.originalValue),
//                   value: getValue(pt.value)
//               }
//             : getValue(pt, true);
//     }

//     _usePT(pt, callback, key, params?) {
//         const fn = (value: any) => callback(value, key, params);
//         if (pt?.hasOwnProperty('_usept')) {
//             const { mergeSections = true, mergeProps: useMergeProps = false } = pt['_usept'] || this.config?.ptOptions || this.ptOptions || {};
//             const originalValue = fn(pt.originalValue);
//             const value = fn(pt.value);

//             if (originalValue === undefined && value === undefined) return undefined;
//             else if (ObjectUtils.isString(value)) return value;
//             else if (ObjectUtils.isString(originalValue)) return originalValue;

//             return mergeSections || (!mergeSections && value) ? (useMergeProps ? ObjectUtils.mergeProps(originalValue, value) : { ...originalValue, ...value }) : value;
//         }

//         return fn(pt);
//     }

//     _getPTValue(obj = {}, key = '', params = {}, searchInDefaultPT = true) {
//         const searchOut = /./g.test(key) && !!params[key.split('.')[0]];
//         const { mergeSections = true, mergeProps: useMergeProps = false } = this._getPropValue('ptOptions') || this.config?.ptOptions || this.ptOptions || {};
//         const global = searchInDefaultPT ? (searchOut ? this._useGlobalPT(this._getPTClassValue.bind(this), key, params) : this._useDefaultPT(this._getPTClassValue.bind(this), key, params)) : undefined;
//         const self = searchOut ? undefined : this._usePT(this._getPT(obj, this.name), this._getPTClassValue.bind(this), key, { ...params, global: {} });
//         const datasets = this._getPTDatasets(key);
//         return mergeSections || (!mergeSections && self) ? (useMergeProps ? this._mergeProps(useMergeProps, global, self, datasets) : { ...global, ...self, ...datasets }) : { ...self, ...datasets };
//     }

//     _useGlobalPT(callback, key, params) {
//         return this._usePT(
//             this._getPT(this.config?.pt, undefined, (value) => ObjectUtils.getItemValue(value, { instance: this })),
//             callback,
//             key,
//             params
//         );
//     }

//     _loadGlobalStyles() {
//         const globalCSS = this._useGlobalPT(this._getOptionValue.bind(this), 'global.css', this._params());
//         ObjectUtils.isNotEmpty(globalCSS) && useStyle(globalCSS, { name: 'global', nonce: this.config?.csp?.nonce });
//     }

//     _getPTClassValue(...args: any[]) {
//         const value = this._getOptionValue(...args);
//         return ObjectUtils.isString(value) || ObjectUtils.isArray(value) ? { class: value } : value;
//     }

//     _getOptionValue(...args) {
//         const [options, key = '', params = {}] = args;
//         const fKeys = ObjectUtils.toFlatCase(key).split('.');
//         const fKey = fKeys.shift();

//         return fKey
//             ? ObjectUtils.isObject(options)
//                 ? this._getOptionValue(ObjectUtils.getItemValue(options[Object.keys(options).find((k) => ObjectUtils.toFlatCase(k) === fKey) || ''], params), fKeys.join('.'), params)
//                 : undefined
//             : ObjectUtils.getItemValue(options, params);
//     }

//     _getPropValue(name) {
//         return this[name] || this._getHostInstance(this)?.[name];
//     }

//     _getHostInstance(instance) {
//         if (instance) {
//             return instance ? (this['hostName'] ? (instance['name'] === this['hostName'] ? instance : this._getHostInstance(instance.parentInstance)) : instance.parentInstance) : undefined;
//         }
//     }

//     _params() {
//         const parentInstance = this._getHostInstance(this) || this.parent;

//         return {
//             instance: this,
//             props: this?.params['props'],
//             state: this?.params['state'],
//             parent: {
//                 instance: parentInstance,
//                 props: parentInstance?.params['props'],
//                 state: parentInstance?.params['state']
//             }
//         };
//     }

//     get parent() {
//         return this['parentInstance'];
//     }

//     get name() {
//         return this.constructor.name.replace(/^_/, '').toLowerCase();
//         // return this._getHostInstance(this)?.constructor.name.replace(/^_/, '').toLowerCase();
//     }

//     cx(key = '', params = {}) {
//         const classes = this.parent ? this.parent['classes'] : this['classes'];
//         return this.unstyled ? undefined : this._getOptionValue(classes, key, { ...this._params(), ...params });
//     }

//     // sx(key = '', when = true, params = {}) {
//     //     if (when) {
//     //         const self = this._getOptionValue(this.$style.inlineStyles, key, { ...this.params, ...params });
//     //         const base = this._getOptionValue(BaseComponentStyle.inlineStyles, key, { ...this.params, ...params });

//     //         return [base, self];
//     //     }

//     //     return undefined;
//     // }

//     isUnstyled() {
//         return this.unstyled;
//     }
// }
