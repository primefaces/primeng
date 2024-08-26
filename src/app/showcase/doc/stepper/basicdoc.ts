import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                Stepper consists of one or more StepperPanel elements to encapsulate each step in the progress. The elements to navigate between the steps are not built-in for ease of customization, instead <i>prevCallback</i> and
                <i>nextCallback</i> events should be bound to your custom UI elements.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-stepper>
                <p-stepperPanel header="Header I">
                    <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                        </div>
                        <div class="flex pt-6 justify-end">
                            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCallback.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
                <p-stepperPanel header="Header II">
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                        </div>
                        <div class="flex pt-6 justify-between">
                            <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" />
                            <p-button label="Next" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCallback.emit()" /></div
                    ></ng-template>
                </p-stepperPanel>
                <p-stepperPanel header="Header III">
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                        <div class="flex flex-col h-48">
                            <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                        </div>
                        <div class="flex pt-6 justify-start">
                            <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" /></div
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
        <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
            <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                    Content I
                </div>
            </div>
            <div class="flex pt-6 justify-end">
                <p-button 
                    label="Next" 
                    icon="pi pi-arrow-right" 
                    iconPos="right" 
                    (onClick)="nextCallback.emit()" />
            </div>
        </ng-template>
    </p-stepperPanel>
    <p-stepperPanel header="Header II">
        <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
            <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                    Content II
                </div>
            </div>
            <div class="flex pt-6 justify-between">
                <p-button 
                    label="Back" 
                    icon="pi pi-arrow-left" 
                    (onClick)="prevCallback.emit()" />
                <p-button 
                    label="Next" 
                    icon="pi pi-arrow-right" 
                    iconPos="right" 
                    (onClick)="nextCallback.emit()" />
            </div>
        </ng-template>
    </p-stepperPanel>
    <p-stepperPanel header="Header III">
        <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
            <div class="flex flex-col h-48">
                <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                    Content III
                </div>
            </div>
            <div class="flex pt-6 justify-start">
                <p-button label="Back" icon="pi pi-arrow-left" (onClick)="prevCallback.emit()" />
            </div>
        </ng-template>
    </p-stepperPanel>
</p-stepper>`,

        html: `<div class="card flex justify-center">
    <p-stepper>
        <p-stepperPanel header="Header I">
            <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-col h-48">
                    <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                        Content I
                    </div>
                </div>
                <div class="flex pt-6 justify-end">
                    <p-button 
                        label="Next" 
                        icon="pi pi-arrow-right" 
                        iconPos="right" 
                        (onClick)="nextCallback.emit()" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel header="Header II">
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-col h-48">
                    <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                        Content II
                    </div>
                </div>
                <div class="flex pt-6 justify-between">
                    <p-button 
                        label="Back" 
                        icon="pi pi-arrow-left" 
                        (onClick)="prevCallback.emit()" />
                    <p-button 
                        label="Next" 
                        icon="pi pi-arrow-right" 
                        iconPos="right" 
                        (onClick)="nextCallback.emit()" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel header="Header III">
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                <div class="flex flex-col h-48">
                    <div class="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                        Content III
                    </div>
                </div>
                <div class="flex pt-6 justify-start">
                    <p-button 
                        label="Back" 
                        icon="pi pi-arrow-left" 
                        (onClick)="prevCallback.emit()" />
                </div>
            </ng-template>
        </p-stepperPanel>
    </p-stepper>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

@Component({
    selector: 'stepper-basic-demo',
    templateUrl: './stepper-basic-demo.html',
    standalone: true,
    imports: [ButtonModule, StepperModule],
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