import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'steps-only-doc',
    template: `
        <app-docsectiontext>
            <p>Use Stepper with a <i>StepList</i> only for custom requirements where a progress indicator is needed.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-stepper [value]="1" class="basis-[50rem]">
                <p-step-list>
                    <p-step [value]="1">Design</p-step>
                    <p-step [value]="2">Development</p-step>
                    <p-step [value]="3">QA</p-step>
                </p-step-list>
            </p-stepper>
        </div>
        <app-code [code]="code" selector="stepper-steps-only-demo"></app-code>
    `
})
export class StepsOnlyDoc {
    code: Code = {
        basic: `<p-stepper [value]="1" class="basis-[50rem]">
    <p-step-list>
        <p-step [value]="1">Design</p-step>
        <p-step [value]="2">Development</p-step>
        <p-step [value]="3">QA</p-step>
    </p-step-list>
</p-stepper>`,
        html: `<div class="card flex justify-center">
    <p-stepper [value]="1" class="basis-[50rem]">
        <p-step-list>
            <p-step [value]="1">Design</p-step>
            <p-step [value]="2">Development</p-step>
            <p-step [value]="3">QA</p-step>
        </p-step-list>
    </p-stepper>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

@Component({
    selector: 'stepper-steps-only-demo',
    templateUrl: './stepper-steps-only-demo.html',
    standalone: true,
    imports: [ButtonModule, StepperModule]
})
export class StepperStepsOnlyDemo {
}`
    };
}
