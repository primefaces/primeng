import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>SelectButton requires a value to bind and a collection of options.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-stepper [(ngModel)]="active">
                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index" let-activeStep="activeStep">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                            <span
                                class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                                [ngClass]="{
                                    'bg-primary border-primary': index <= activeStep,
                                    'surface-border': index > activeStep
                                }"
                            >
                                <i class="pi pi-user"></i>
                            </span>
                        </button>
                    </ng-template>

                    <ng-template pTemplate="content" let-onNextClick="onNextClick">
                        <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
                            <div class="text-center mt-3 mb-3 text-xl font-semibold">Create your account</div>
                            <div class="field p-fluid">
                                <p-iconField>
                                    <p-inputIcon>
                                        <i class="pi pi-user"></i>
                                    </p-inputIcon>
                                    <input pInputText id="input" type="text" placeholder="Name" />
                                </p-iconField>
                            </div>
                            <div class="field p-fluid">
                                <p-iconField>
                                    <p-inputIcon>
                                        <i class="pi pi-envelope"></i>
                                    </p-inputIcon>
                                    <input pInputText id="email" type="email" placeholder="Email" />
                                </p-iconField>
                            </div>
                            <div class="field p-fluid">
                                <p-password [toggleMask]="true" placeholder="Password" />
                            </div>
                        </div>
                        <div class="flex pt-4 justify-content-end">
                            <p-button (click)="onNextClick.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                        </div>
                    </ng-template>
                </p-stepperPanel>

                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index" let-activeStep="activeStep">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                            <span
                                class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                                [ngClass]="{
                                    'bg-primary border-primary': index <= activeStep,
                                    'surface-border': index > activeStep
                                }"
                            >
                                <i class="pi pi-star"></i>
                            </span>
                        </button>
                    </ng-template>

                    <ng-template pTemplate="content" let-onPrevClick="onPrevClick" let-onNextClick="onNextClick">
                        <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                            <div class="text-center mt-3 mb-3 text-xl font-semibold">Choose your interests</div>
                            <div class="flex flex-wrap justify-content-center gap-3">
                                <p-toggleButton [(ngModel)]="option1" onLabel="Nature" offLabel="Nature" />
                                <p-toggleButton [(ngModel)]="option2" onLabel="Art" offLabel="Art" />
                                <p-toggleButton [(ngModel)]="option3" onLabel="Music" offLabel="Music" />
                                <p-toggleButton [(ngModel)]="option4" onLabel="Design" offLabel="Design" />
                                <p-toggleButton [(ngModel)]="option5" onLabel="Photography" offLabel="Photography" />
                                <p-toggleButton [(ngModel)]="option6" onLabel="Movies" offLabel="Movies" />
                                <p-toggleButton [(ngModel)]="option7" onLabel="Sports" offLabel="Sports" />
                                <p-toggleButton [(ngModel)]="option8" onLabel="Gaming" offLabel="Gaming" />
                                <p-toggleButton [(ngModel)]="option9" onLabel="Traveling" offLabel="Traveling" />
                                <p-toggleButton [(ngModel)]="option10" onLabel="Dancing" offLabel="Dancing" />
                            </div>
                        </div>
                        <div class="flex pt-4 justify-content-between">
                            <p-button (click)="onPrevClick.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                            <p-button (click)="onNextClick.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                        </div>
                    </ng-template>
                </p-stepperPanel>

                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index" let-activeStep="activeStep">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                            <span
                                class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                                [ngClass]="{
                                    'bg-primary border-primary': index <= activeStep,
                                    'surface-border': index > activeStep
                                }"
                            >
                                <i class="pi pi-id-card"></i>
                            </span>
                        </button>
                    </ng-template>

                    <ng-template pTemplate="content" let-onPrevClick="onPrevClick">
                        <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                            <div class="text-center mt-3 mb-3 text-xl font-semibold">Account created successfully</div>
                            <div class="text-center">
                                <img alt="logo" src="https://primefaces.org/cdn/primevue/images/stepper/content.svg" />
                            </div>
                        </div>
                        <div class="flex pt-4 justify-content-start">
                            <p-button (click)="onPrevClick.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                        </div>
                    </ng-template>
                </p-stepperPanel>
            </p-stepper>
        </div>
        <app-code [code]="code" selector="stepper-template-demo"></app-code>
    `,
    styles: [
        `
            .p-stepper {
                flex-basis: 40rem;
            }
        `
    ]
})
export class TemplateDoc {
    active: number | undefined = 0;
    name: string | undefined = null;
    email: string | undefined = null;
    password: string | undefined = null;
    option1 = false;
    option2 = false;
    option3 = false;
    option4 = false;
    option5 = false;
    option6 = false;
    option7 = false;
    option8 = false;
    option9 = false;
    option10 = false;

    ngDoCheck(){
        console.log(this.active)
    }

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
