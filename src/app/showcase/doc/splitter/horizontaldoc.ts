import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'horizontal-doc',
    template: `
        <app-docsectiontext>
            <p>Splitter requires two SplitterPanel components as children which are displayed horizontally by default.</p>
        </app-docsectiontext>
        <div class="card">
            <p-splitter [style]="{ height: '300px' }" styleClass="mb-5">
                <ng-template pTemplate>
                    <div class="col flex align-items-center justify-content-center">Panel 1</div>
                </ng-template>
                <ng-template pTemplate>
                    <div class="col flex align-items-center justify-content-center">Panel 2</div>
                </ng-template>
            </p-splitter>
        </div>
        <app-code [code]="code" selector="splitter-horizontal-demo"></app-code>
    `
})
export class HorizontalDoc {
    code: Code = {
        basic: `<p-splitter [style]="{ height: '300px' }" styleClass="mb-5">
    <ng-template pTemplate>
        <div class="col flex align-items-center justify-content-center">Panel 1</div>
    </ng-template>
    <ng-template pTemplate>
        <div class="col flex align-items-center justify-content-center">Panel 2</div>
    </ng-template>
</p-splitter>`,

        html: `
<div class="card">
    <p-splitter [style]="{ height: '300px' }" styleClass="mb-5">
        <ng-template pTemplate>
            <div class="col flex align-items-center justify-content-center">Panel 1</div>
        </ng-template>
        <ng-template pTemplate>
            <div class="col flex align-items-center justify-content-center">Panel 2</div>
        </ng-template>
    </p-splitter>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'splitter-horizontal-demo',
    templateUrl: './splitter-horizontal-demo.html'
})
export class SplitterHorizontalDemo {}`
    };
}
