import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'vertical-doc',
    template: `
        <app-docsectiontext>
            <p>Panels are displayed as stacked by setting the <i>layout</i> to <i>vertical</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-splitter [style]="{ height: '300px' }" styleClass="mb-5" layout="vertical">
                <ng-template pTemplate>
                    <div class="col flex align-items-center justify-content-center">Panel 1</div>
                </ng-template>
                <ng-template pTemplate>
                    <div class="col flex align-items-center justify-content-center">Panel 2</div>
                </ng-template>
            </p-splitter>
        </div>
        <app-code [code]="code" selector="splitter-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    code: Code = {
        basic: `
<p-splitter [style]="{ height: '300px' }" styleClass="mb-5" layout="vertical">
    <ng-template pTemplate>
        <div class="col flex align-items-center justify-content-center">Panel 1</div>
    </ng-template>
    <ng-template pTemplate>
        <div class="col flex align-items-center justify-content-center">Panel 2</div>
    </ng-template>
</p-splitter>`,

        html: `
div class="card">
    <p-splitter [style]="{ height: '300px' }" styleClass="mb-5" layout="vertical">
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
    selector: 'splitter-vertical-demo',
    templateUrl: './splitter-vertical-demo.html'
})
export class SplitterVerticalDemo {}`
    };
}
