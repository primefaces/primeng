import { Directive, ElementRef, NgModule, Renderer2, effect, input } from '@angular/core';
import { cn } from '@primeuix/utils';

export type PClassValue = string | number | boolean | undefined | null | PClassObject | PClassArray;
export interface PClassObject {
    [key: string]: boolean | undefined | null;
}
export interface PClassArray extends Array<PClassValue> {}

/**
 * PClass directive provides Vue.js-style class binding functionality.
 * Supports strings, arrays, objects, and mixed combinations.
 * @group Directives
 */
@Directive({
    selector: '[pClass]',
    standalone: true
})
export class PClass {
    /**
     * Class value(s) to be applied. Can be a string, array, object, or combination.
     * @group Props
     */
    pClass = input<PClassValue>();

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        effect(() => {
            this.updateClasses();
        });
    }

    private updateClasses(): void {
        // Get computed class string using cn function
        const classString = cn(this.pClass());

        // Apply the class to the element
        if (classString) {
            this.renderer.setAttribute(this.el.nativeElement, 'class', classString);
        } else {
            this.renderer.removeAttribute(this.el.nativeElement, 'class');
        }
    }
}

@NgModule({
    imports: [PClass],
    exports: [PClass]
})
export class PClassModule {}
