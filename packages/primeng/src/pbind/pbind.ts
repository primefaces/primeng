import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';

@Directive({
    selector: '[pBind]',
    standalone: true,
    host: {
        '[class]': 'classes()'
    }
})
export class Bind {
    @Input('pBind') attrs: { [key: string]: any };

    host: HTMLElement;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        this.host = this.el.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.host) {
            if (changes.attrs.currentValue && ObjectUtils.equals(changes.attrs.currentValue, changes.attrs.previousValue) === false) {
                this.attrs = changes.attrs.currentValue;
                this.bind();
            }
        }

        // console.log(this.attributes())
    }

    bind() {
        // Clear existing style and cached attributes to prevent duplication
        if (this.host.hasAttribute('style')) {
            this.host.removeAttribute('style');
        }

        // Clear cached style attributes in DomHandler
        const hostWithAttrs = this.host as any;
        if (hostWithAttrs.$attrs && hostWithAttrs.$attrs.style) {
            delete hostWithAttrs.$attrs.style;
        }

        DomHandler.setAttributes(this.host, this.all());
        this.bindEventListeners();
    }

    classes() {
        if (this.attrs) {
            const classes =
                typeof this.attrs.class === 'string'
                    ? this.attrs.class.split(' ')
                    : ObjectUtils.isArray(this.attrs.class)
                      ? this.attrs.class
                      : ObjectUtils.isObject(this.attrs.class)
                        ? Object.keys(this.attrs.class).filter((key) => this.attrs.class[key] === true)
                        : [];
            return Array.from(new Set([...classes])).join(' ');
        }
        return '';
    }

    attributes() {
        const attrs: { [key: string]: string } = {};
        const existingAttrs: { [key: string]: string } = {};

        if (this.attrs) {
            Object.keys(this.attrs).forEach((key) => {
                if (key !== 'class' && key !== 'style' && !key.startsWith('on') && key !== 'listeners') {
                    existingAttrs[key] = this.attrs[key];
                }
            });
        }

        Array.from(this.host.attributes).forEach((attr: Attr) => {
            if (attr.name !== 'class' && attr.name !== 'style' && !attr.name.includes('ng-reflect') && !attr.name.includes('pbind')) {
                attrs[attr.name] = attr.value;
            }
        });

        return { ...attrs, ...existingAttrs };
    }

    styles() {
        // Only return the styles from attrs, not from existing element
        // This prevents duplication when bind() is called multiple times
        return this.attrs?.style || {};
    }

    bindEventListeners() {
        if (this.attrs) {
            Object.keys(this.attrs).forEach((key) => {
                if (typeof this.attrs[key] === 'function') {
                    // console.log('Binding event listener:', key);
                    // Remove existing listener if exists
                    this.host.removeEventListener(key, this.attrs[key]);
                    // Add new listener - function should already have correct context
                    this.host.addEventListener(key, this.attrs[key]);
                }
            });
        }
    }

    listeners() {
        const listeners: { [key: string]: Function } = {};
        const existingListeners: { [key: string]: Function } = {};
        const element = this.host;

        if (this.attrs) {
            Object.keys(this.attrs).forEach((key) => {
                if (key.startsWith('on')) {
                    existingListeners[key] = this.attrs[key];
                }
            });
        }

        for (const prop in element) {
            if (prop.startsWith('on')) {
                const eventName = prop.slice(2);
                listeners[eventName] = element[prop];
            }
        }

        return { ...listeners, ...existingListeners };
    }

    all() {
        // console.log('listeners - pBind', this.listeners());
        // console.log('attrs - pBind', this.attrs);
        return {
            style: this.styles(),
            ...this.attributes(),
            ...this.listeners()
        };
    }
}
