import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>SelectButton requires a value to bind and a collection of options.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-stepper>
                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index" let-active="active">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="clickCallback.emit()">
                            <span
                                class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                                [ngClass]="{
                                    'bg-primary border-primary': index <= active,
                                    'surface-border': index > active
                                }"
                            >
                                <i class="pi pi-user"></i>
                            </span>
                        </button>
                    </ng-template>
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
        <app-code [code]="code" selector="stepper-template-demo"></app-code>
    `,
    styles: [
        `
            .p-stepper {
                flex-basis: 50rem;
            }
        `
    ]
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value"></p-selectButton>`,

        html: `
<div class="card flex justify-content-center">
    <p-selectButton [options]="stateOptions" [(ngModel)]="value" optionLabel="label" optionValue="value"></p-selectButton>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'select-button-basic-demo',
    templateUrl: './select-button-basic-demo.html'
})
export class SelectButtonBasicDemo {
    stateOptions: any[] = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];

    value: string = 'off';
}`
    };
}
