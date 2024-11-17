import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'vertical-doc',
    template: `
        <app-docsectiontext>
            <p>Layout of the Stepper is configured with the <i>orientation</i> property that accepts <i>horizontal</i> and <i>vertical</i> as available options.</p>
        </app-docsectiontext>
        <div class="card">
            <p-stepper [value]="1">
                <p-step-item [value]="1">
                    <p-step>Header I</p-step>
                    <p-step-panel>
                        <ng-template #content let-activateCallback="activateCallback">
                            <div class="flex flex-col h-48">
                                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                            </div>
                            <div class="py-6">
                                <p-button label="Next" (onClick)="activateCallback(2)" />
                            </div>
                        </ng-template>
                    </p-step-panel>
                </p-step-item>

                <p-step-item [value]="2">
                    <p-step>Header II</p-step>
                    <p-step-panel>
                        <ng-template #content let-activateCallback="activateCallback">
                            <div class="flex flex-col h-48">
                                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                            </div>
                            <div class="flex py-6 gap-2">
                                <p-button label="Back" severity="secondary" (onClick)="activateCallback(1)" />
                                <p-button label="Next" (onClick)="activateCallback(3)" />
                            </div>
                        </ng-template>
                    </p-step-panel>
                </p-step-item>

                <p-step-item [value]="3">
                    <p-step>Header III</p-step>
                    <p-step-panel>
                        <ng-template #content let-activateCallback="activateCallback">
                            <div class="flex flex-col h-48">
                                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                            </div>
                            <div class="py-6">
                                <p-button label="Back" severity="secondary" (onClick)="activateCallback(2)" />
                            </div>
                        </ng-template>
                    </p-step-panel>
                </p-step-item>
            </p-stepper>
        </div>
        <app-code [code]="code" selector="stepper-vertical-demo"></app-code>
    `
})
export class VerticalDoc {
    code: Code = {
        basic: `<p-stepper [value]="1">
    <p-step-item [value]="1">
        <p-step>Header I</p-step>
        <p-step-panel>
            <ng-template #content let-activateCallback="activateCallback">
                <div class="flex flex-col h-48">
                    <div
                        class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                    >
                        Content I
                    </div>
                </div>
                <div class="py-6">
                    <p-button label="Next" (onClick)="activateCallback(2)" />
                </div>
            </ng-template>
        </p-step-panel>
    </p-step-item>

    <p-step-item [value]="2">
        <p-step>Header II</p-step>
        <p-step-panel>
            <ng-template #content let-activateCallback="activateCallback">
                <div class="flex flex-col h-48">
                    <div
                        class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                    >
                        Content II
                    </div>
                </div>
                <div class="flex py-6 gap-2">
                    <p-button label="Back" severity="secondary" (onClick)="activateCallback(1)" />
                    <p-button label="Next" (onClick)="activateCallback(3)" />
                </div>
            </ng-template>
        </p-step-panel>
    </p-step-item>

    <p-step-item [value]="3">
        <p-step>Header III</p-step>
        <p-step-panel>
            <ng-template #content let-activateCallback="activateCallback">
                <div class="flex flex-col h-48">
                    <div
                        class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                    >
                        Content III
                    </div>
                </div>
                <div class="py-6">
                    <p-button label="Back" severity="secondary" (onClick)="activateCallback(2)" />
                </div>
            </ng-template>
        </p-step-panel>
    </p-step-item>
</p-stepper>`,

        html: `<div class="card">
    <p-stepper [value]="1">
        <p-step-item [value]="1">
            <p-step>Header I</p-step>
            <p-step-panel>
                <ng-template #content let-activateCallback="activateCallback">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                        >
                            Content I
                        </div>
                    </div>
                    <div class="py-6">
                        <p-button label="Next" (onClick)="activateCallback(2)" />
                    </div>
                </ng-template>
            </p-step-panel>
        </p-step-item>

        <p-step-item [value]="2">
            <p-step>Header II</p-step>
            <p-step-panel>
                <ng-template #content let-activateCallback="activateCallback">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                        >
                            Content II
                        </div>
                    </div>
                    <div class="flex py-6 gap-2">
                        <p-button label="Back" severity="secondary" (onClick)="activateCallback(1)" />
                        <p-button label="Next" (onClick)="activateCallback(3)" />
                    </div>
                </ng-template>
            </p-step-panel>
        </p-step-item>

        <p-step-item [value]="3">
            <p-step>Header III</p-step>
            <p-step-panel>
                <ng-template #content let-activateCallback="activateCallback">
                    <div class="flex flex-col h-48">
                        <div
                            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                        >
                            Content III
                        </div>
                    </div>
                    <div class="py-6">
                        <p-button label="Back" severity="secondary" (onClick)="activateCallback(2)" />
                    </div>
                </ng-template>
            </p-step-panel>
        </p-step-item>
    </p-stepper>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'stepper-vertical-demo',
    templateUrl: './stepper-vertical-demo.html',
    standalone: true,
    imports: [StepperModule, ButtonModule]
})
export class StepperVerticalDemo {
}`
    };
}
