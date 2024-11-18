import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>Checkbox can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card">
            <form [formGroup]="formGroup" class="flex items-center justify-center gap-1">
                <p-checkbox formControlName="city" value="New York" inputId="ny" />
                <label for="ny" class="ml-2">New York</label>
            </form>
        </div>
        <app-code [code]="code" selector="checkbox-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            city: new FormControl<string | null>(null)
        });
    }

    code: Code = {
        basic: `<form class="flex items-center gap-1" [formGroup]="formGroup">
    <p-checkbox formControlName="city" value="New York" inputId="ny" />
    <label for="ny" class="ml-2">New York</label>
</form>`,

        html: `<div class="card">
    <form class="flex items-center gap-1" [formGroup]="formGroup">
        <p-checkbox formControlName="city" value="New York" inputId="ny" />
        <label for="ny" class="ml-2">New York</label>
    </form>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'checkbox-reactive-forms-demo',
    templateUrl: './checkbox-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, Checkbox]
})
export class CheckboxReactiveFormsDemo implements OnInit{
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            city: new FormControl<string | null>(null)
        });
    }
}`
    };
}
