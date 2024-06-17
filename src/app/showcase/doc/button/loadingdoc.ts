import { ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-loading-demo',
    template: `
        <app-docsectiontext>
            <p>Busy state is controlled with the <i>loading</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-3">
            <p-button label="Search" icon="pi pi-check" [loading]="loading" (onClick)="load()" />
        </div>
        <app-code [code]="code" selector="button-loading-demo"></app-code>
    `
})
export class LoadingDoc {
    loading: boolean = false;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            this.cdr.markForCheck();
        }, 2000);
    }

    code: Code = {
        basic: `<p-button 
    label="Search" 
    icon="pi pi-check" 
    [loading]="loading" 
    (onClick)="load()" />`,

        html: `<div class="card flex justify-content-center gap-3">
    <p-button 
        label="Search" 
        icon="pi pi-check" 
        [loading]="loading" 
        (onClick)="load()" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-loading-demo',
    templateUrl: './button-loading-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonLoadingDemo {
    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }
}`
    };
}
