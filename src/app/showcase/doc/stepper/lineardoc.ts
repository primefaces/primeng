import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'linear-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>linear</i> property is present, current step must be completed in order to move to the next step.</p>
        </app-docsectiontext>
        <div class="card">
            <!-- <p-stepper [linear]="true">
                <p-stepperPanel header="Header I">
                    <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
                        </div>
                        <div class="flex pt-4 justify-content-end">
                            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCallback.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
                <p-stepperPanel header="Header II">
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
                        </div>
                        <div class="flex pt-4 justify-content-between">
                            <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" />
                            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCallback.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
                <p-stepperPanel header="Header III">
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                        </div>
                        <div class="flex pt-4 justify-content-start">
                            <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
            </p-stepper> -->
        </div>
        <app-code [code]="code" selector="stepper-linear-demo"></app-code>
    `
})
export class LinearDoc {
    code: Code = {
        basic: `<p-stepper [linear]="true">
    <p-stepperPanel header="Header I">
        <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
            <div class="flex flex-column h-12rem">
                <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                    Content I
                </div>
            </div>
            <div class="flex pt-4 justify-content-end">
                <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCallback.emit()" />
            </div>
        </ng-template>
    </p-stepperPanel>
    <p-stepperPanel header="Header II">
        <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
            <div class="flex flex-column h-12rem">
                <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                    Content II
                </div>
            </div>
            <div class="flex pt-4 justify-content-between">
                <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" />
                <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCallback.emit()" />
            </div>
        </ng-template>
    </p-stepperPanel>
    <p-stepperPanel header="Header III">
        <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
            <div class="flex flex-column h-12rem">
                <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                    Content III
                </div>
            </div>
            <div class="flex pt-4 justify-content-start">
                <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" />
            </div>
        </ng-template>
    </p-stepperPanel>
</p-stepper>`,

        html: `<div class="card">
    <p-stepper [linear]="true">
        <p-stepperPanel header="Header I">
            <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-column h-12rem">
                    <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                        Content I
                    </div>
                </div>
                <div class="flex pt-4 justify-content-end">
                    <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCallback.emit()" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel header="Header II">
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-column h-12rem">
                    <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                        Content II
                    </div>
                </div>
                <div class="flex pt-4 justify-content-between">
                    <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" />
                    <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCallback.emit()" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel header="Header III">
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                <div class="flex flex-column h-12rem">
                    <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                        Content III
                    </div>
                </div>
                <div class="flex pt-4 justify-content-start">
                    <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" />
                </div>
            </ng-template>
        </p-stepperPanel>
    </p-stepper>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'stepper-linear-demo-demo',
    templateUrl: './stepper-linear-demo-demo.html',
    standalone: true,
    imports: [StepperModule, ButtonModule]
})
export class StepperLinearDemo {
}`
    };
}
