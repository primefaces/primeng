import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'nested-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Splitters can be combined to create advanced layouts.</p>
        </app-docsectiontext>
        <div class="card">
            <p-splitter [style]="{ height: '300px' }" [panelSizes]="[20, 80]" [minSizes]="[10, 0]" styleClass="mb-5">
                <ng-template pTemplate>
                    <div class="col flex align-items-center justify-content-center">Panel 1</div>
                </ng-template>
                <ng-template pTemplate>
                    <p-splitter layout="vertical" [panelSizes]="[15, 85]">
                        <ng-template pTemplate>
                            <div style="flex-grow: 1;" class="flex align-items-center justify-content-center">Panel 2</div>
                        </ng-template>
                        <ng-template pTemplate>
                            <p-splitter [panelSizes]="[20, 80]">
                                <ng-template pTemplate>
                                    <div class="col flex align-items-center justify-content-center">Panel 3</div>
                                </ng-template>
                                <ng-template pTemplate>
                                    <div class="col flex align-items-center justify-content-center">Panel 4</div>
                                </ng-template>
                            </p-splitter>
                        </ng-template>
                    </p-splitter>
                </ng-template>
            </p-splitter>
        </div>
        <app-code [code]="code" selector="splitter-nested-demo"></app-code>
    </section>`
})
export class NestedDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-splitter [style]="{ height: '300px' }" [panelSizes]="[20, 80]" [minSizes]="[10, 0]" styleClass="mb-5">
    <ng-template pTemplate>
        <div class="col flex align-items-center justify-content-center">Panel 1</div>
    </ng-template>
    <ng-template pTemplate>
        <p-splitter layout="vertical" [panelSizes]="[15, 85]">
            <ng-template pTemplate>
                <div style="flex-grow: 1;" class="flex align-items-center justify-content-center">Panel 2</div>
            </ng-template>
            <ng-template pTemplate>
                <p-splitter [panelSizes]="[20, 80]">
                    <ng-template pTemplate>
                        <div class="col flex align-items-center justify-content-center">Panel 3</div>
                    </ng-template>
                    <ng-template pTemplate>
                        <div class="col flex align-items-center justify-content-center">Panel 4</div>
                    </ng-template>
                </p-splitter>
            </ng-template>
        </p-splitter>
    </ng-template>
</p-splitter>`,

        html: `
<div class="card">
    <p-splitter [style]="{ height: '300px' }" [panelSizes]="[20, 80]" [minSizes]="[10, 0]" styleClass="mb-5">
        <ng-template pTemplate>
            <div class="col flex align-items-center justify-content-center">Panel 1</div>
        </ng-template>
        <ng-template pTemplate>
            <p-splitter layout="vertical" [panelSizes]="[15, 85]">
                <ng-template pTemplate>
                    <div style="flex-grow: 1;" class="flex align-items-center justify-content-center">Panel 2</div>
                </ng-template>
                <ng-template pTemplate>
                    <p-splitter [panelSizes]="[20, 80]">
                        <ng-template pTemplate>
                            <div class="col flex align-items-center justify-content-center">Panel 3</div>
                        </ng-template>
                        <ng-template pTemplate>
                            <div class="col flex align-items-center justify-content-center">Panel 4</div>
                        </ng-template>
                    </p-splitter>
                </ng-template>
            </p-splitter>
        </ng-template>
    </p-splitter>
</div>
`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'splitter-nested-demo',
    templateUrl: './splitter-nested-demo.html'
})
export class SplitterNestedDemo {}`
    };
}
