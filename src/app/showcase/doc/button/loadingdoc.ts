import { ChangeDetectorRef, Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-loading-demo',
    template: `
        <app-docsectiontext>
            <p>Busy state is controlled with the <i>loading</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button label="Submit" [loading]="loading" (onClick)="load()"></p-button>

            <p-button label="Loading custom icon" [loading]="loading" loadingIcon="pi pi-bell" (onClick)="load()"></p-button>
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
        basic: `
<p-button label="Submit" [loading]="loading" (onClick)="load()"></p-button>
<p-button label="Loading custom icon" [loading]="loading" loadingIcon="pi pi-bell" (onClick)="load()"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-button label="Submit" [loading]="loading" (onClick)="load()"></p-button>
    <p-button label="Loading custom icon" [loading]="loading" loadingIcon="pi pi-bell" (onClick)="load()"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-loading-demo',
    templateUrl: './button-loading-demo.html'
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
