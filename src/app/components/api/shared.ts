import { CommonModule } from '@angular/common';
import { Component, Directive, Input, NgModule, TemplateRef } from '@angular/core';

@Component({
    selector: 'p-header',
    template: '<ng-content></ng-content>'
})
export class Header {}

@Component({
    selector: 'p-footer',
    template: '<ng-content></ng-content>'
})
export class Footer {}

@Directive({
    selector: '[pTemplate]',
    host: {}
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
    imports: [CommonModule],
    exports: [Header, Footer, PrimeTemplate],
    declarations: [Header, Footer, PrimeTemplate]
})
export class SharedModule {}
