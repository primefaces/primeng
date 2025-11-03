import { computed, Directive, effect, ElementRef, input, NgModule, Renderer2, signal } from '@angular/core';
import { cn, equals } from '@primeuix/utils';

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
    /**
     * Dynamic attributes, properties, and event listeners to be applied to the host element.
     * @group Props
     */
    pBind = input<{ [key: string]: any } | undefined>(undefined);

    private _attrs = signal<{ [key: string]: any } | undefined>(undefined);
    private attrs = computed(() => this._attrs() || this.pBind());

    private styles = computed(() => this.attrs()?.style);
    private classes = computed(() => cn(this.attrs()?.class));

    private listeners: { eventName: string; unlisten: () => void }[] = [];

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        effect(() => {
            const { style, class: className, ...rest } = this.attrs() || {};

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
                } else {
                    // attr & prop fallback
                    this.renderer.setAttribute(this.el.nativeElement, key, value.toString());
                    if (key in this.el.nativeElement) {
                        (this.el.nativeElement as any)[key] = value;
                    }
                }
            }
        });
    }

    ngOnDestroy() {
        this.clearListeners();
    }

    public setAttrs(attrs: { [key: string]: any } | undefined) {
        if (!equals(this._attrs(), attrs)) {
            this._attrs.set(attrs);
        }
    }

    private clearListeners() {
        this.listeners.forEach(({ unlisten }) => unlisten());
        this.listeners = [];
    }
}

@NgModule({
    imports: [Bind],
    exports: [Bind]
})
export class BindModule {}
