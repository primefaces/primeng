import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'vertical-doc',
    template: `
        <app-docsectiontext>
            <p>Layout of the Stepper is configured with the <i>orientation</i> property that accepts <i>horizontal</i> and <i>vertical</i> as available options.</p>
        </app-docsectiontext>
        <div class="card">
            <p-stepper orientation="vertical">
                <p-stepperPanel header="Header I">
                    <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
                        </div>
                        <div class="flex py-4">
                            <p-button label="Next" (onClick)="nextCallback.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
                <p-stepperPanel header="Header II">
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
                        </div>
                        <div class="flex py-4 gap-2">
                            <p-button label="Back" severity="secondary" (onClick)="prevCallback.emit()" />
                            <p-button label="Next" (onClick)="nextCallback.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
                <p-stepperPanel header="Header III">
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                        </div>
                        <div class="flex py-4">
                            <p-button label="Back" (onClick)="prevCallback.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
            </p-stepper>
        </div>
        <app-code [code]="code" selector="stepper-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    code: Code = {
        basic: `<p-stepper orientation="vertical">
    <p-stepperPanel header="Header I">
        <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
            <div class="flex flex-column h-12rem">
                <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
            </div>
            <div class="flex py-4">
                <p-button label="Next" (onClick)="nextCallback.emit()" /></div
        ></ng-template>
    </p-stepperPanel>
    <p-stepperPanel header="Header II">
        <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
            <div class="flex flex-column h-12rem">
                <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
            </div>
            <div class="flex py-4 gap-2">
                <p-button label="Back" severity="secondary" (onClick)="prevCallback.emit()" />
                <p-button label="Next" (onClick)="nextCallback.emit()" /></div
        ></ng-template>
    </p-stepperPanel>
    <p-stepperPanel header="Header III">
        <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
            <div class="flex flex-column h-12rem">
                <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
            </div>
            <div class="flex py-4">
                <p-button label="Back" (onClick)="prevCallback.emit()" /></div
        ></ng-template>
    </p-stepperPanel>
</p-stepper>`,

        html: `<div class="card">
    <p-stepper orientation="vertical">
        <p-stepperPanel header="Header I">
            <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-column h-12rem">
                    <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
                </div>
                <div class="flex py-4">
                    <p-button label="Next" (onClick)="nextCallback.emit()" /></div
            ></ng-template>
        </p-stepperPanel>
        <p-stepperPanel header="Header II">
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-column h-12rem">
                    <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
                </div>
                <div class="flex py-4 gap-2">
                    <p-button label="Back" severity="secondary" (onClick)="prevCallback.emit()" />
                    <p-button label="Next" (onClick)="nextCallback.emit()" /></div
            ></ng-template>
        </p-stepperPanel>
        <p-stepperPanel header="Header III">
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                <div class="flex flex-column h-12rem">
                    <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                </div>
                <div class="flex py-4">
                    <p-button label="Back" (onClick)="prevCallback.emit()" /></div
            ></ng-template>
        </p-stepperPanel>
    </p-stepper>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'stepper-vertical-demo',
    templateUrl: './stepper-vertical-demo.html'
})
export class StepperVerticalDemo {
}`
    };
}
