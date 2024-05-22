import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Stepper provides various templating options to customize the default UI design.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-stepper [(activeStep)]="active">
                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
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
                    <ng-template pTemplate="content" let-nextCallback="nextCallback">
                        <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
                            <div class="text-center mt-3 mb-3 text-xl font-semibold">Create your account</div>
                            <div class="field p-fluid">
                                <p-iconField>
                                    <p-inputIcon>
                                        <i class="pi pi-user"></i>
                                    </p-inputIcon>
                                    <input [(ngModel)]="name" pInputText id="input" type="text" placeholder="Name" />
                                </p-iconField>
                            </div>
                            <div class="field p-fluid">
                                <p-iconField>
                                    <p-inputIcon>
                                        <i class="pi pi-envelope"></i>
                                    </p-inputIcon>
                                    <input [(ngModel)]="email" pInputText id="email" type="email" placeholder="Email" />
                                </p-iconField>
                            </div>
                            <div class="field p-fluid">
                                <p-password [(ngModel)]="password" [toggleMask]="true" placeholder="Password" />
                            </div>
                        </div>
                        <div class="flex pt-4 justify-content-end">
                            <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                        </div>
                    </ng-template>
                </p-stepperPanel>
                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                            <span
                                class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                                [ngClass]="{
                                    'bg-primary border-primary': index <= active,
                                    'surface-border': index > active
                                }"
                            >
                                <i class="pi pi-star"></i>
                            </span>
                        </button>
                    </ng-template>
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback">
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
                            <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                            <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                        </div>
                    </ng-template>
                </p-stepperPanel>
                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                        <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                            <span
                                class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                                [ngClass]="{
                                    'bg-primary border-primary': index <= active,
                                    'surface-border': index > active
                                }"
                            >
                                <i class="pi pi-id-card"></i>
                            </span>
                        </button>
                    </ng-template>
                    <ng-template pTemplate="content" let-prevCallback="prevCallback">
                        <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                            <div class="text-center mt-3 mb-3 text-xl font-semibold">Account created successfully</div>
                            <div class="text-center">
                                <img alt="logo" src="https://primefaces.org/cdn/primeng/images/stepper/content.svg" />
                            </div>
                        </div>
                        <div class="flex pt-4 justify-content-start">
                            <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
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

    option1: boolean | undefined = false;

    option2: boolean | undefined = false;

    option3: boolean | undefined = false;

    option4: boolean | undefined = false;

    option5: boolean | undefined = false;

    option6: boolean | undefined = false;

    option7: boolean | undefined = false;

    option8: boolean | undefined = false;

    option9: boolean | undefined = false;

    option10: boolean | undefined = false;

    code: Code = {
        basic: `<p-stepper [(activeStep)]="active">
    <p-stepperPanel>
        <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
            <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
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
        <ng-template pTemplate="content" let-nextCallback="nextCallback">
            <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
                <div class="text-center mt-3 mb-3 text-xl font-semibold">Create your account</div>
                <div class="field p-fluid">
                    <p-iconField>
                        <p-inputIcon>
                            <i class="pi pi-user"></i>
                        </p-inputIcon>
                        <input [(ngModel)]="name" pInputText id="input" type="text" placeholder="Name" />
                    </p-iconField>
                </div>
                <div class="field p-fluid">
                    <p-iconField>
                        <p-inputIcon>
                            <i class="pi pi-envelope"></i>
                        </p-inputIcon>
                        <input [(ngModel)]="email" pInputText id="email" type="email" placeholder="Email" />
                    </p-iconField>
                </div>
                <div class="field p-fluid">
                    <p-password [(ngModel)]="password" [toggleMask]="true" placeholder="Password" />
                </div>
            </div>
            <div class="flex pt-4 justify-content-end">
                <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
            </div>
        </ng-template>
    </p-stepperPanel>
    <p-stepperPanel>
        <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
            <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                <span
                    class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                    [ngClass]="{
                        'bg-primary border-primary': index <= active,
                        'surface-border': index > active
                    }"
                >
                    <i class="pi pi-star"></i>
                </span>
            </button>
        </ng-template>
        <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback">
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
                <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
            </div>
        </ng-template>
    </p-stepperPanel>
    <p-stepperPanel>
        <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
            <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                <span
                    class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                    [ngClass]="{
                        'bg-primary border-primary': index <= active,
                        'surface-border': index > active
                    }"
                >
                    <i class="pi pi-id-card"></i>
                </span>
            </button>
        </ng-template>
        <ng-template pTemplate="content" let-prevCallback="prevCallback">
            <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                <div class="text-center mt-3 mb-3 text-xl font-semibold">Account created successfully</div>
                <div class="text-center">
                    <img alt="logo" src="https://primefaces.org/cdn/primeng/images/stepper/content.svg" />
                </div>
            </div>
            <div class="flex pt-4 justify-content-start">
                <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
            </div>
        </ng-template>
    </p-stepperPanel>
</p-stepper>`,

        html: `<div class="card flex justify-content-center">
    <p-stepper [(activeStep)]="active">
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
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
            <ng-template pTemplate="content" let-nextCallback="nextCallback">
                <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
                    <div class="text-center mt-3 mb-3 text-xl font-semibold">Create your account</div>
                    <div class="field p-fluid">
                        <p-iconField>
                            <p-inputIcon>
                                <i class="pi pi-user"></i>
                            </p-inputIcon>
                            <input [(ngModel)]="name" pInputText id="input" type="text" placeholder="Name" />
                        </p-iconField>
                    </div>
                    <div class="field p-fluid">
                        <p-iconField>
                            <p-inputIcon>
                                <i class="pi pi-envelope"></i>
                            </p-inputIcon>
                            <input [(ngModel)]="email" pInputText id="email" type="email" placeholder="Email" />
                        </p-iconField>
                    </div>
                    <div class="field p-fluid">
                        <p-password [(ngModel)]="password" [toggleMask]="true" placeholder="Password" />
                    </div>
                </div>
                <div class="flex pt-4 justify-content-end">
                    <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                    <span
                        class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                        [ngClass]="{
                            'bg-primary border-primary': index <= active,
                            'surface-border': index > active
                        }"
                    >
                        <i class="pi pi-star"></i>
                    </span>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback">
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
                    <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                    <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button class="bg-transparent border-none inline-flex flex-column gap-2" (click)="onClick.emit()">
                    <span
                        class="border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center"
                        [ngClass]="{
                            'bg-primary border-primary': index <= active,
                            'surface-border': index > active
                        }"
                    >
                        <i class="pi pi-id-card"></i>
                    </span>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-prevCallback="prevCallback">
                <div class="flex flex-column gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                    <div class="text-center mt-3 mb-3 text-xl font-semibold">Account created successfully</div>
                    <div class="text-center">
                        <img alt="logo" src="https://primefaces.org/cdn/primeng/images/stepper/content.svg" />
                    </div>
                </div>
                <div class="flex pt-4 justify-content-start">
                    <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                </div>
            </ng-template>
        </p-stepperPanel>
    </p-stepper>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'stepper-template-demo',
    templateUrl: './stepper-template-demo.html',
    standalone: true,
    imports: [
      StepperModule,
      ButtonModule,
      InputTextModule,
      ToggleButtonModule,
      IconFieldModule,
      InputIconModule,
      CommonModule
    ],
    styles: [
        \`.p-stepper {
            flex-basis: 40rem;
        } 
        \`
    ]
})
export class StepperTemplateDemo {
    active: number | undefined = 0;

    name: string | undefined = null;

    email: string | undefined = null;

    password: string | undefined = null;

    option1: boolean | undefined = false;

    option2: boolean | undefined = false;

    option3: boolean | undefined = false;

    option4: boolean | undefined = false;

    option5: boolean | undefined = false;

    option6: boolean | undefined = false;

    option7: boolean | undefined = false;

    option8: boolean | undefined = false;

    option9: boolean | undefined = false;

    option10: boolean | undefined = false;
}`
    };
}
