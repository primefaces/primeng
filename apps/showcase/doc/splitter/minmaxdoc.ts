import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'min-max-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>When no panelSizes are defined, panels are split 50/50, use the <i>panelSizes</i> property to give relative widths e.g. [25, 75].</p>
        </app-docsectiontext>
        <div class="card">
            <p-splitter [panelSizes]="[15, 70, 15]" [minSizes]="[5, 30, 5]" [maxSizes]="[25, 90, 25]" [style]="{ height: '300px' }" styleClass="mb-8">
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 1</div>
                </ng-template>
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 2</div>
                </ng-template>
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 3</div>
                </ng-template>
            </p-splitter>
        </div>
        <app-code [code]="code" selector="splitter-size-demo"></app-code>
    `
})
export class MinMaxDoc {
    code: Code = {
        basic: `<p-splitter [panelSizes]="[15, 70, 15]" [minSizes]="[5, 30, 5]" [maxSizes]="[25, 50, 25]" [style]="{ height: '300px' }" styleClass="mb-8">
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 1</div>
    </ng-template>
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 2</div>
    </ng-template>
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 3</div>
    </ng-template>
</p-splitter>`,

        html: `<div class="card">
    <p-splitter [panelSizes]="[15, 70, 15]" [minSizes]="[5, 30, 5]" [maxSizes]="[25, 50, 25]" [style]="{ height: '300px' }" styleClass="mb-8">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full">Panel 1</div>
        </ng-template>
        <ng-template #panel>
            <div class="flex items-center justify-center h-full">Panel 2</div>
        </ng-template>
        <ng-template #panel>
            <div class="flex items-center justify-center h-full">Panel 3</div>
        </ng-template>
    </p-splitter>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'splitter-min-max-demo',
    templateUrl: './splitter-min-max-demo.html',
    standalone: true,
    imports: [SplitterModule]
})
export class SplitterMinMaxDemo {}`
    };
}
