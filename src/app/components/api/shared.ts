import { Component, Directive, Input, NgModule, TemplateRef } from '@angular/core';

@Component({
    selector: 'p-header',
    standalone: true,
    template: '<ng-content></ng-content>'
})
export class Header {}

@Component({
    selector: 'p-footer',
    standalone: true,
    template: '<ng-content></ng-content>'
})
export class Footer {}

@Directive({
    selector: '[pTemplate]',
    standalone: true,
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
    imports: [Header, Footer, PrimeTemplate],
    exports: [Header, Footer, PrimeTemplate]
})
export class SharedModule {}
