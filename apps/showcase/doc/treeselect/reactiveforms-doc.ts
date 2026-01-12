import { NodeService } from '@/service/nodeservice';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'reactiveforms-doc',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TreeSelectModule, ButtonModule, ToastModule, MessageModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>TreeSelect can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <p-toast />
        <div class="card flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-full md:w-80">
                <div class="flex flex-col gap-1">
                    <p-treeselect class="md:w-80 w-full" formControlName="selectedNodes" [options]="nodes" placeholder="Select Item" [invalid]="isInvalid('selectedNodes')" />

                    @if (isInvalid('selectedNodes')) {
                        <p-message severity="error" size="small" variant="simple">Selection is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
        <app-code></app-code>
    `
})
export class ReactiveFormsDoc {
    messageService = inject(MessageService);

    nodes!: any[];

    exampleForm: FormGroup | undefined;

    formSubmitted: boolean = false;

    constructor(
        private fb: FormBuilder,
        private nodeService: NodeService
    ) {
        this.nodeService.getFiles().then((files) => (this.nodes = files));
        this.exampleForm = this.fb.group({
            selectedNodes: ['', Validators.required]
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && this.formSubmitted;
    }
}
