import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Stepper provides various templating options to customize the default UI design.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-stepper [(activeStep)]="active">
                <p-stepper-panel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                        <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                            <span
                                class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                                [ngClass]="{
                                    'bg-primary text-primary-contrast border-primary': index <= active,
                                    'border-surface': index > active,
                                }"
                            >
                                <i class="pi pi-user"></i>
                            </span>
                        </button>
                    </ng-template>
                    <ng-template pTemplate="content" let-nextCallback="nextCallback">
                        <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
                            <div class="text-center mt-4 mb-4 text-xl font-semibold">Create your account</div>
                            <div class="field p-fluid">
                                <p-iconfield>
                                    <p-inputicon>
                                        <i class="pi pi-user"></i>
                                    </p-inputicon>
                                    <input [(ngModel)]="name" pInputText id="input" type="text" placeholder="Name" />
                                </p-iconfield>
                            </div>
                            <div class="field p-fluid">
                                <p-iconfield>
                                    <p-inputicon>
                                        <i class="pi pi-envelope"></i>
                                    </p-inputicon>
                                    <input [(ngModel)]="email" pInputText id="email" type="email" placeholder="Email" />
                                </p-iconfield>
                            </div>
                            <div class="field p-fluid">
                                <p-password [(ngModel)]="password" [toggleMask]="true" placeholder="Password" />
                            </div>
                        </div>
                        <div class="flex pt-6 justify-end">
                            <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                        </div>
                    </ng-template>
                </p-stepper-panel>
                <p-stepper-panel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                        <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                            <span
                                class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                                [ngClass]="{
                                    'bg-primary text-primary-contrast border-primary': index <= active,
                                    'border-surface': index > active,
                                }"
                            >
                                <i class="pi pi-star"></i>
                            </span>
                        </button>
                    </ng-template>
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback">
                        <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                            <div class="text-center mt-4 mb-4 text-xl font-semibold">Choose your interests</div>
                            <div class="flex flex-wrap justify-center gap-4">
                                <button p-toggleButton [(ngModel)]="option1" onLabel="Nature" offLabel="Nature"></button>
                                <button p-toggleButton [(ngModel)]="option2" onLabel="Art" offLabel="Art"></button>
                                <button p-toggleButton [(ngModel)]="option3" onLabel="Music" offLabel="Music"></button>
                                <button p-toggleButton [(ngModel)]="option4" onLabel="Design" offLabel="Design"></button>
                                <button p-toggleButton [(ngModel)]="option5" onLabel="Photography" offLabel="Photography"></button>
                                <button p-toggleButton [(ngModel)]="option6" onLabel="Movies" offLabel="Movies"></button>
                                <button p-toggleButton [(ngModel)]="option7" onLabel="Sports" offLabel="Sports"></button>
                                <button p-toggleButton [(ngModel)]="option8" onLabel="Gaming" offLabel="Gaming"></button>
                                <button p-toggleButton [(ngModel)]="option9" onLabel="Traveling" offLabel="Traveling"></button>
                                <button p-toggleButton [(ngModel)]="option10" onLabel="Dancing" offLabel="Dancing"></button>
                            </div>
                        </div>
                        <div class="flex pt-6 justify-between">
                            <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                            <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                        </div>
                    </ng-template>
                </p-stepper-panel>
                <p-stepper-panel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                        <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                            <span
                                class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                                [ngClass]="{
                                    'bg-primary text-primary-contrast border-primary': index <= active,
                                    'border-surface': index > active,
                                }"
                            >
                                <i class="pi pi-id-card"></i>
                            </span>
                        </button>
                    </ng-template>
                    <ng-template pTemplate="content" let-prevCallback="prevCallback">
                        <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                            <div class="text-center mt-4 mb-4 text-xl font-semibold">Account created successfully</div>
                            <div class="text-center">
                                <img alt="logo" src="https://primefaces.org/cdn/primeng/images/stepper/content.svg" />
                            </div>
                        </div>
                        <div class="flex pt-6 justify-start">
                            <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                        </div>
                    </ng-template>
                </p-stepper-panel>
            </p-stepper>
        </div>
        <app-code [code]="code" selector="stepper-template-demo"></app-code>
    `,
    styles: [
        `
            .p-stepper {
                flex-basis: 40rem;
            }
        `,
    ],
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
    <p-stepper-panel>
        <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
            <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                <span
                    class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                    [ngClass]="{
                        'bg-primary text-primary-contrast border-primary': index <= active,
                        'border-surface': index > active
                    }"
                >
                    <i class="pi pi-user"></i>
                </span>
            </button>
        </ng-template>
        <ng-template pTemplate="content" let-nextCallback="nextCallback">
            <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
                <div class="text-center mt-4 mb-4 text-xl font-semibold">Create your account</div>
                <div class="field p-fluid">
                    <p-iconfield>
                        <p-inputicon>
                            <i class="pi pi-user"></i>
                        </p-inputicon>
                        <input [(ngModel)]="name" pInputText id="input" type="text" placeholder="Name" />
                    </p-iconfield>
                </div>
                <div class="field p-fluid">
                    <p-iconfield>
                        <p-inputicon>
                            <i class="pi pi-envelope"></i>
                        </p-inputicon>
                        <input [(ngModel)]="email" pInputText id="email" type="email" placeholder="Email" />
                    </p-iconfield>
                </div>
                <div class="field p-fluid">
                    <p-password [(ngModel)]="password" [toggleMask]="true" placeholder="Password" />
                </div>
            </div>
            <div class="flex pt-6 justify-end">
                <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
            </div>
        </ng-template>
    </p-stepper-panel>
    <p-stepper-panel>
        <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
            <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                <span
                    class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                    [ngClass]="{
                        'bg-primary text-primary-contrast border-primary': index <= active,
                        'border-surface': index > active
                    }"
                >
                    <i class="pi pi-star"></i>
                </span>
            </button>
        </ng-template>
        <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback">
            <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                <div class="text-center mt-4 mb-4 text-xl font-semibold">Choose your interests</div>
                <div class="flex flex-wrap justify-center gap-4">
                    <p-togglebutton [(ngModel)]="option1" onLabel="Nature" offLabel="Nature" />
                    <p-togglebutton [(ngModel)]="option2" onLabel="Art" offLabel="Art" />
                    <p-togglebutton [(ngModel)]="option3" onLabel="Music" offLabel="Music" />
                    <p-togglebutton [(ngModel)]="option4" onLabel="Design" offLabel="Design" />
                    <p-togglebutton [(ngModel)]="option5" onLabel="Photography" offLabel="Photography" />
                    <p-togglebutton [(ngModel)]="option6" onLabel="Movies" offLabel="Movies" />
                    <p-togglebutton [(ngModel)]="option7" onLabel="Sports" offLabel="Sports" />
                    <p-togglebutton [(ngModel)]="option8" onLabel="Gaming" offLabel="Gaming" />
                    <p-togglebutton [(ngModel)]="option9" onLabel="Traveling" offLabel="Traveling" />
                    <p-togglebutton [(ngModel)]="option10" onLabel="Dancing" offLabel="Dancing" />
                </div>
            </div>
            <div class="flex pt-6 justify-between">
                <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
            </div>
        </ng-template>
    </p-stepper-panel>
    <p-stepper-panel>
        <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
            <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                <span
                    class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                    [ngClass]="{
                        'bg-primary text-primary-contrast border-primary': index <= active,
                        'border-surface': index > active
                    }"
                >
                    <i class="pi pi-id-card"></i>
                </span>
            </button>
        </ng-template>
        <ng-template pTemplate="content" let-prevCallback="prevCallback">
            <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                <div class="text-center mt-4 mb-4 text-xl font-semibold">Account created successfully</div>
                <div class="text-center">
                    <img alt="logo" src="https://primefaces.org/cdn/primeng/images/stepper/content.svg" />
                </div>
            </div>
            <div class="flex pt-6 justify-start">
                <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
            </div>
        </ng-template>
    </p-stepper-panel>
</p-stepper>`,

        html: `<div class="card flex justify-center">
    <p-stepper [(activeStep)]="active">
        <p-stepper-panel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                    <span
                        class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                        [ngClass]="{
                            'bg-primary text-primary-contrast border-primary': index <= active,
                            'border-surface': index > active
                        }"
                    >
                        <i class="pi pi-user"></i>
                    </span>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-nextCallback="nextCallback">
                <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 20rem">
                    <div class="text-center mt-4 mb-4 text-xl font-semibold">Create your account</div>
                    <div class="field p-fluid">
                        <p-iconfield>
                            <p-inputicon>
                                <i class="pi pi-user"></i>
                            </p-inputicon>
                            <input [(ngModel)]="name" pInputText id="input" type="text" placeholder="Name" />
                        </p-iconfield>
                    </div>
                    <div class="field p-fluid">
                        <p-iconfield>
                            <p-inputicon>
                                <i class="pi pi-envelope"></i>
                            </p-inputicon>
                            <input [(ngModel)]="email" pInputText id="email" type="email" placeholder="Email" />
                        </p-iconfield>
                    </div>
                    <div class="field p-fluid">
                        <p-password [(ngModel)]="password" [toggleMask]="true" placeholder="Password" />
                    </div>
                </div>
                <div class="flex pt-6 justify-end">
                    <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </ng-template>
        </p-stepper-panel>
        <p-stepper-panel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                    <span
                        class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                        [ngClass]="{
                            'bg-primary text-primary-contrast border-primary': index <= active,
                            'border-surface': index > active
                        }"
                    >
                        <i class="pi pi-star"></i>
                    </span>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback">
                <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                    <div class="text-center mt-4 mb-4 text-xl font-semibold">Choose your interests</div>
                    <div class="flex flex-wrap justify-center gap-4">
                        <p-togglebutton [(ngModel)]="option1" onLabel="Nature" offLabel="Nature" />
                        <p-togglebutton [(ngModel)]="option2" onLabel="Art" offLabel="Art" />
                        <p-togglebutton [(ngModel)]="option3" onLabel="Music" offLabel="Music" />
                        <p-togglebutton [(ngModel)]="option4" onLabel="Design" offLabel="Design" />
                        <p-togglebutton [(ngModel)]="option5" onLabel="Photography" offLabel="Photography" />
                        <p-togglebutton [(ngModel)]="option6" onLabel="Movies" offLabel="Movies" />
                        <p-togglebutton [(ngModel)]="option7" onLabel="Sports" offLabel="Sports" />
                        <p-togglebutton [(ngModel)]="option8" onLabel="Gaming" offLabel="Gaming" />
                        <p-togglebutton [(ngModel)]="option9" onLabel="Traveling" offLabel="Traveling" />
                        <p-togglebutton [(ngModel)]="option10" onLabel="Dancing" offLabel="Dancing" />
                    </div>
                </div>
                <div class="flex pt-6 justify-between">
                    <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                    <p-button (onClick)="nextCallback.emit()" label="Next" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </ng-template>
        </p-stepper-panel>
        <p-stepper-panel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button class="bg-transparent border-0 inline-flex flex-col gap-2" (click)="onClick.emit()">
                    <span
                        class="rounded-border border-2 w-12 h-12 inline-flex items-center justify-center"
                        [ngClass]="{
                            'bg-primary text-primary-contrast border-primary': index <= active,
                            'border-surface': index > active
                        }"
                    >
                        <i class="pi pi-id-card"></i>
                    </span>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-prevCallback="prevCallback">
                <div class="flex flex-col gap-2 mx-auto" style="min-height: 16rem; max-width: 24rem">
                    <div class="text-center mt-4 mb-4 text-xl font-semibold">Account created successfully</div>
                    <div class="text-center">
                        <img alt="logo" src="https://primefaces.org/cdn/primeng/images/stepper/content.svg" />
                    </div>
                </div>
                <div class="flex pt-6 justify-start">
                    <p-button (onClick)="prevCallback.emit()" label="Back" severity="secondary" icon="pi pi-arrow-left" />
                </div>
            </ng-template>
        </p-stepper-panel>
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
}`,
    };
}
