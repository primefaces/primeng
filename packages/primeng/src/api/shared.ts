import { CommonModule } from '@angular/common';
import { Component, Directive, Input, NgModule, TemplateRef } from '@angular/core';

/**
 * @deprecated Use ng-template #header instead.
 */
@Component({
    selector: 'p-header',
    template: '<ng-content></ng-content>',
    standalone: false
})
export class Header {}

/**
 * @deprecated Use ng-template #footer instead.
 */
@Component({
    selector: 'p-footer',
    template: '<ng-content></ng-content>',
    standalone: false
})
export class Footer {}

/**
 * @deprecated Use ng-template #templateName instead.
 */
@Directive({
    selector: '[pTemplate]',
    standalone: true
})
export class PrimeTemplate {
    @Input() type: string | undefined;

    @Input('pTemplate') name: string | undefined;

    constructor(public template: TemplateRef<any>) {}

    getType(): string {
        return this.name!;
    }
}

@NgModule({
    imports: [CommonModule, PrimeTemplate],
    exports: [Header, Footer, PrimeTemplate],
    declarations: [Header, Footer]
})
export class SharedModule {}
