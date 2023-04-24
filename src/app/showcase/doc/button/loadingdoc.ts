import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-loading-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Busy state is controlled with the <i>loading</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button label="Submit" [loading]="loading" (click)="load()"></p-button>
        </div>
        <app-code [code]="code" selector="button-loading-demo"></app-code>
    </section>`
})
export class LoadingDoc {
    @Input() id: string;

    @Input() title: string;

    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }

    code: Code = {
        basic: `
<p-button label="Submit" [loading]="loading" (click)="load()"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-button label="Submit" [loading]="loading" (click)="load()"></p-button>
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
