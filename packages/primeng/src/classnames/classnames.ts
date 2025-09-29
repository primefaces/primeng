import { Directive, ElementRef, NgModule, Renderer2, effect, input } from '@angular/core';
import { cn } from '@primeuix/utils';
/**
 * Represents the suitable value types of pClass directive.
 * @group Types
 */
export type PClassValue = string | number | boolean | undefined | null | { [key: string]: boolean | undefined | null } | any;

/**
 * PClass directive provides extends class binding functionality.
 * Supports strings, arrays, objects, and mixed combinations.
 * @group Components
 */
@Directive({
    selector: '[pClass]',
    standalone: true
})
export class ClassNames {
    /**
     * Class value(s) to be applied. Can be a string, array, object, or combination.
     * @group Props
     */
    pClass = input<PClassValue>();

    private initialClasses = '';
    private isInitialized = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        effect(() => {
            this.updateClasses();
        });
    }

    private updateClasses(): void {
        if (this.el?.nativeElement) {
            // Store initial classes only once
            if (!this.isInitialized) {
                this.initialClasses = this.el.nativeElement.className;
                this.isInitialized = true;
            }

            // Combine initial classes with pClass
            const classString = cn(this.initialClasses, this.pClass());

            // Apply the class to the element
            if (classString) {
                this.renderer.setAttribute(this.el.nativeElement, 'class', classString);
            } else {
                this.renderer.removeAttribute(this.el.nativeElement, 'class');
            }
        }
    }
}

@NgModule({
    imports: [ClassNames],
    exports: [ClassNames]
})
export class ClassNamesModule {}
