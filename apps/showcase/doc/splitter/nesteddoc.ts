import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'nested-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Splitters can be combined to create advanced layouts.</p>
        </app-docsectiontext>
        <div class="card">
            <p-splitter [style]="{ height: '300px' }" [panelSizes]="[20, 80]" [minSizes]="[10, 0]" class="mb-8">
                <ng-template #panel>
                    <div class="col flex w-full items-center justify-center">Panel 1</div>
                </ng-template>
                <ng-template #panel>
                    <p-splitter layout="vertical" [panelSizes]="[50, 50]">
                        <ng-template #panel>
                            <div style="flex-grow: 1;" class="flex items-center justify-center">Panel 2</div>
                        </ng-template>
                        <ng-template #panel>
                            <p-splitter [panelSizes]="[20, 80]">
                                <ng-template #panel>
                                    <div class="col h-full flex items-center justify-center">Panel 3</div>
                                </ng-template>
                                <ng-template #panel>
                                    <div class="col h-full flex items-center justify-center">Panel 4</div>
                                </ng-template>
                            </p-splitter>
                        </ng-template>
                    </p-splitter>
                </ng-template>
            </p-splitter>
        </div>
        <app-code [code]="code" selector="splitter-nested-demo"></app-code>
    `
})
export class NestedDoc {
    code: Code = {
        basic: `<p-splitter [style]="{ height: '300px' }" [panelSizes]="[20, 80]" [minSizes]="[10, 0]" class="mb-8">
    <ng-template #panel>
        <div class="col flex w-full items-center justify-center">Panel 1</div>
    </ng-template>
    <ng-template #panel>
        <p-splitter layout="vertical" [panelSizes]="[50, 50]">
            <ng-template #panel>
                <div style="flex-grow: 1;" class="flex items-center justify-center">Panel 2</div>
            </ng-template>
            <ng-template #panel>
                <p-splitter [panelSizes]="[20, 80]">
                    <ng-template #panel>
                        <div class="col h-full flex items-center justify-center">Panel 3</div>
                    </ng-template>
                    <ng-template #panel>
                        <div class="col h-full flex items-center justify-center">Panel 4</div>
                    </ng-template>
                </p-splitter>
            </ng-template>
        </p-splitter>
    </ng-template>
</p-splitter>`,

        html: `<div class="card">
    <p-splitter [style]="{ height: '300px' }" [panelSizes]="[20, 80]" [minSizes]="[10, 0]" class="mb-8">
        <ng-template #panel>
            <div class="col flex w-full items-center justify-center">Panel 1</div>
        </ng-template>
        <ng-template #panel>
            <p-splitter layout="vertical" [panelSizes]="[50, 50]">
                <ng-template #panel>
                    <div style="flex-grow: 1;" class="flex items-center justify-center">Panel 2</div>
                </ng-template>
                <ng-template #panel>
                    <p-splitter [panelSizes]="[20, 80]">
                        <ng-template #panel>
                            <div class="col h-full flex items-center justify-center">Panel 3</div>
                        </ng-template>
                        <ng-template #panel>
                            <div class="col h-full flex items-center justify-center">Panel 4</div>
                        </ng-template>
                    </p-splitter>
                </ng-template>
            </p-splitter>
        </ng-template>
    </p-splitter>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'splitter-nested-demo',
    templateUrl: './splitter-nested-demo.html',
    standalone: true,
    imports: [SplitterModule]
})
export class SplitterNestedDemo {}`
    };
}
