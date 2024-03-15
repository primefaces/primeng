import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                Stepper consists of one or more StepperPanel elements to encapsulate each step in the progress. The elements to navigate between the steps are not built-in for ease of customization, instead <i>onPrevClick</i> and
                <i>onNextClick</i> events should be bound to your custom UI elements.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-stepper>
                <p-stepperPanel header="Header I">
                    <ng-template pTemplate="content" let-onNextClick="onNextClick" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
                        </div>
                        <div class="flex pt-4 justify-content-end">
                            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (click)="onNextClick.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
                <p-stepperPanel header="Header II">
                    <ng-template pTemplate="content" let-onPrevClick="onPrevClick" let-onNextClick="onNextClick" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
                        </div>
                        <div class="flex pt-4 justify-content-between">
                            <p-button label="Back" icon="pi pi-arrow-left" (click)="onPrevClick.emit()" />
                            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (click)="onNextClick.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
                <p-stepperPanel header="Header III">
                    <ng-template pTemplate="content" let-onPrevClick="onPrevClick" let-index="index">
                        <div class="flex flex-column h-12rem">
                            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                        </div>
                        <div class="flex pt-4 justify-content-start">
                            <p-button label="Back" icon="pi pi-arrow-left" (click)="onPrevClick.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
            </p-stepper>
        </div>
        <app-code [code]="code" selector="stepper-basic-demo"></app-code>
    `,
    styles: [
        `
            .p-stepper {
                flex-basis: 50rem;
            }
        `
    ]
})
export class BasicDoc {
    code: Code = {
        basic: `<p-stepper>
<p-stepperPanel header="Header I">
    <ng-template pTemplate="content" let-onNextClick="onNextClick" let-index="index">
        <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
        </div>
        <div class="flex pt-4 justify-content-end">
            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (click)="onNextClick.emit()" /></div
    ></ng-template>
</p-stepperPanel>

<p-stepperPanel header="Header II">
    <ng-template pTemplate="content" let-onPrevClick="onPrevClick" let-onNextClick="onNextClick" let-index="index">
        <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
        </div>
        <div class="flex pt-4 justify-content-between">
            <p-button label="Back" icon="pi pi-arrow-left" (click)="onPrevClick.emit()" />
            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (click)="onNextClick.emit()" /></div
    ></ng-template>
</p-stepperPanel>

<p-stepperPanel header="Header III">
    <ng-template pTemplate="content" let-onPrevClick="onPrevClick" let-index="index">
        <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
        </div>
        <div class="flex pt-4 justify-content-start">
            <p-button label="Back" icon="pi pi-arrow-left" (click)="onPrevClick.emit()" /></div
    ></ng-template>
</p-stepperPanel>
</p-stepper>`,

        html: `<div class="card flex justify-content-center">
<p-stepper>
<p-stepperPanel header="Header I">
    <ng-template pTemplate="content" let-onNextClick="onNextClick" let-index="index">
        <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
        </div>
        <div class="flex pt-4 justify-content-end">
            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (click)="onNextClick.emit()" /></div
    ></ng-template>
</p-stepperPanel>

<p-stepperPanel header="Header II">
    <ng-template pTemplate="content" let-onPrevClick="onPrevClick" let-onNextClick="onNextClick" let-index="index">
        <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
        </div>
        <div class="flex pt-4 justify-content-between">
            <p-button label="Back" icon="pi pi-arrow-left" (click)="onPrevClick.emit()" />
            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (click)="onNextClick.emit()" /></div
    ></ng-template>
</p-stepperPanel>

<p-stepperPanel header="Header III">
    <ng-template pTemplate="content" let-onPrevClick="onPrevClick" let-index="index">
        <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
        </div>
        <div class="flex pt-4 justify-content-start">
            <p-button label="Back" icon="pi pi-arrow-left" (click)="onPrevClick.emit()" /></div
    ></ng-template>
</p-stepperPanel>
    </p-stepper>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'stepper-basic-demo',
    templateUrl: './stepper-basic-demo.html',
    styles: [
        \`
        .p-stepper {
            flex-basis: 50rem;
        } 
        \`
    ]
    
})
export class StepperBasicDemo {
}`
    };
}
