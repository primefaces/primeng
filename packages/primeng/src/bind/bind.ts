import { computed, Directive, effect, ElementRef, inject, input, NgModule, Renderer2, signal } from '@angular/core';
import { cn, equals } from '@primeuix/utils';
import { PrimeNG } from 'primeng/config';

/**
 * Bind directive provides dynamic attribute, property, and event listener binding functionality.
 * @group Components
 */
@Directive({
    selector: '[pBind]',
    standalone: true,
    host: {
        '[style]': 'styles()',
        '[class]': 'classes()'
    }
})
export class Bind {
    private config = inject(PrimeNG);

    /**
     * Dynamic attributes, properties, and event listeners to be applied to the host element.
     * @group Props
     */
    pBind = input<{ [key: string]: any } | undefined>(undefined);

    private _attrs = signal<{ [key: string]: any } | undefined>(undefined);
    private attrs = computed(() => this._attrs() || this.pBind());

    styles = computed(() => (this.config.ptBinding() ? this.attrs()?.style : undefined));
    classes = computed(() => (this.config.ptBinding() ? cn(this.attrs()?.class) : undefined));

    private appliedAttrs: { [key: string]: any } = {};

    private listeners: { eventName: string; unlisten: () => void }[] = [];

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        effect(() => {
            if (!this.config.ptBinding()) {
                this.clearAppliedAttrs();
                this.clearListeners();
                return;
            }

            const attrs = this.attrs();

            if (!attrs) {
                return;
            }

            const { style, class: className, ...rest } = attrs;

            for (const [key, value] of Object.entries(rest)) {
                if (key.startsWith('on') && typeof value === 'function') {
                    const eventName = key.slice(2).toLowerCase();

                    // add listener if not already added
                    if (!this.listeners.some((l) => l.eventName === eventName)) {
                        const unlisten = this.renderer.listen(this.el.nativeElement, eventName, value);
                        this.listeners.push({ eventName, unlisten });
                    }
                } else if (value === null || value === undefined) {
                    // remove attr
                    this.renderer.removeAttribute(this.el.nativeElement, key);
                    delete this.appliedAttrs[key];
                } else if (this.appliedAttrs[key] !== value) {
                    const attrValue = value.toString();

                    this.appliedAttrs[key] = value;
                    this.renderer.setAttribute(this.el.nativeElement, key, attrValue);

                    if (key in this.el.nativeElement) {
                        (this.el.nativeElement as any)[key] = value;
                    }
                } else {
                    continue;
                }
            }
        });
    }

    ngOnDestroy() {
        this.clearListeners();
    }

    public setAttrs(attrs: { [key: string]: any } | undefined) {
        if (this._attrs() !== attrs && !equals(this._attrs(), attrs)) {
            this._attrs.set(attrs);
        }
    }

    private clearListeners() {
        this.listeners.forEach(({ unlisten }) => unlisten());
        this.listeners = [];
    }

    private clearAppliedAttrs() {
        for (const key of Object.keys(this.appliedAttrs)) {
            this.renderer.removeAttribute(this.el.nativeElement, key);
        }

        this.appliedAttrs = {};
    }
}

@NgModule({
    imports: [Bind],
    exports: [Bind]
})
export class BindModule {}
