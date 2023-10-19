import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'size-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>When no panelSizes are defined, panels are split 50/50, use the <i>panelSizes</i> property to give relative widths e.g. [25, 75].</p>
        </app-docsectiontext>
        <div class="card">
            <p-splitter [panelSizes]="[25, 75]" [style]="{ height: '300px' }" styleClass="mb-5">
                <ng-template pTemplate>
                    <div class="col flex align-items-center justify-content-center">Panel 1</div>
                </ng-template>
                <ng-template pTemplate>
                    <div class="col flex align-items-center justify-content-center">Panel 2</div>
                </ng-template>
            </p-splitter>
        </div>
        <app-code [code]="code" selector="splitter-size-demo"></app-code>
    </section>`
})
export class SizeDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-splitter [panelSizes]="[25, 75]" [style]="{ height: '300px' }" styleClass="mb-5">
    <ng-template pTemplate>
        <div class="col flex align-items-center justify-content-center">Panel 1</div>
    </ng-template>
    <ng-template pTemplate>
        <div class="col flex align-items-center justify-content-center">Panel 2</div>
    </ng-template>
</p-splitter>`,

        html: `
<div class="card">
    <p-splitter [panelSizes]="[25, 75]" [style]="{ height: '300px' }" styleClass="mb-5">
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
    selector: 'splitter-size-demo',
    templateUrl: './splitter-size-demo.html'
})
export class SplitterSizeDemo {}`
    };
}
