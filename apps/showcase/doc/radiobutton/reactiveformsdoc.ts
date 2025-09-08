import { Code } from '@/domain/code';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'reactive-forms-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>RadioButton can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>

        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-4">
                    @for (category of categories; track category.key) {
                        <div class="flex items-center gap-2">
                            <p-radiobutton formControlName="selectedCategory" name="selectedCategory" [inputId]="category.key" [value]="category" [invalid]="isInvalid('selectedCategory')" />
                            <label [for]="category.key"> {{ category.name }} </label>
                        </div>
                    }
                </div>
                @if (isInvalid('selectedCategory')) {
                    <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
                }
                <button pButton severity="secondary" type="submit">
                    <span pButtonLabel>Submit</span>
                </button>
            </form>
        </div>

        <app-code [code]="code" selector="radio-button-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc {
    messageService = inject(MessageService);

    formSubmitted: boolean = false;

    exampleForm: FormGroup;

    categories: any[] = [
        { name: 'Cheese', key: 'C' },
        { name: 'Mushroom', key: 'M' },
        { name: 'Pepper', key: 'P' },
        { name: 'Onion', key: 'O' }
    ];

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            selectedCategory: ['', Validators.required]
        });
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && this.formSubmitted;
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.exampleForm.valid) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            this.exampleForm.reset();

            this.formSubmitted = false;
        }
    }

    code: Code = {
        basic: `<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
        @for (category of categories; track category) {
            <div class="flex items-center gap-2">
                <p-radiobutton formControlName="selectedCategory" name="selectedCategory" [inputId]="category.key" [value]="category" [invalid]="isInvalid('selectedCategory')" />
                <label [for]="category.key"> {{ category.name }} </label>
            </div>
        }
    </div>
    @if (isInvalid('selectedCategory')) {
        <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
    }
    <button pButton severity="secondary" type="submit">
        <span pButtonLabel>Submit</span>
    </button>
</form>`,

        html: `<div class="card flex justify-center">
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4">
            @for (category of categories; track category) {
                <div class="flex items-center gap-2">
                    <p-radiobutton formControlName="selectedCategory" name="selectedCategory" [inputId]="category.key" [value]="category" [invalid]="isInvalid('selectedCategory')" />
                    <label [for]="category.key"> {{ category.name }} </label>
                </div>
            }
        </div>
        @if (isInvalid('selectedCategory')) {
            <p-message severity="error" size="small" variant="simple"> At least one ingredient must be selected. </p-message>
        }
        <button pButton severity="secondary" type="submit">
            <span pButtonLabel>Submit</span>
        </button>
    </form>
</div>`,

        typescript: `import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'radio-button-reactive-forms-demo',
    templateUrl: './radio-button-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, RadioButtonModule],
})
export class RadioButtonReactiveFormsDemo implements OnInit {
    messageService = inject(MessageService);

    formSubmitted: boolean = false;

    exampleForm: FormGroup;

    categories: any[] = [
        { name: 'Cheese', key: 'C' },
        { name: 'Mushroom', key: 'M' },
        { name: 'Pepper', key: 'P' },
        { name: 'Onion', key: 'O' }
    ];

    constructor(private fb: FormBuilder) {
        this.exampleForm = this.fb.group({
            selectedCategory: ['', Validators.required]
        });
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid &&  this.formSubmitted;
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.exampleForm.valid) {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Form is submitted',
                life: 3000
            });

            this.exampleForm.reset();

            this.formSubmitted = false;
        }
    }
}`
    };
}
