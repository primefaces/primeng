import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'focus-trap-basic-demo',
    template: `
        <app-docsectiontext>
            <p>FocusTrap is applied to a container element with the <i>pFocusTrap</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div pFocusTrap class="w-full sm:w-80 flex flex-col gap-6">
                <p-iconfield>
                    <p-inputicon>
                        <i class="pi pi-user"></i>
                    </p-inputicon>
                    <input type="text" pInputText id="input" [(ngModel)]="name" type="text" placeholder="Name" [pAutoFocus]="true" [fluid]="true" />
                </p-iconfield>

                <p-iconfield>
                    <p-inputicon>
                        <i class="pi pi-envelope"> </i>
                    </p-inputicon>
                    <input type="text" pInputText id="email" [(ngModel)]="email" type="email" placeholder="Email" [fluid]="true" />
                </p-iconfield>

                <div class="flex items-center gap-2">
                    <p-checkbox id="accept" [(ngModel)]="accept" name="accept" value="Accept" />
                    <label for="accept">I agree to the terms and conditions.</label>
                </div>

                <p-button type="submit" label="Submit" class="mt-2" styleClass="w-full" />
            </div>
        </div>
        <app-code [code]="code" selector="focus-trap-basic-demo"></app-code>
    `
})
export class BasicDoc {
    name: string = '';

    email: string = '';

    accept: boolean = false;

    code: Code = {
        basic: `<div pFocusTrap class="w-full sm:w-80 flex flex-col gap-6">
    <p-iconfield>
        <p-inputicon>
            <i class="pi pi-user"></i>
        </p-inputicon>
        <input type="text" pInputText id="input" [(ngModel)]="name" type="text" placeholder="Name" [pAutoFocus]="true" [fluid]="true" />
    </p-iconfield>

    <p-iconfield>
        <p-inputicon>
            <i class="pi pi-envelope"> </i>
        </p-inputicon>
        <input type="text" pInputText id="email" [(ngModel)]="email" type="email" placeholder="Email" [fluid]="true" />
    </p-iconfield>

    <div class="flex items-center gap-2">
        <p-checkbox id="accept" [(ngModel)]="accept" name="accept" value="Accept" />
        <label for="accept">I agree to the terms and conditions.</label>
    </div>

    <p-button type="submit" label="Submit" class="mt-2" styleClass="w-full" />
</div>`,
        html: ` <div class="card flex justify-center">
    <div pFocusTrap class="w-full sm:w-80 flex flex-col gap-6">
        <p-iconfield>
            <p-inputicon>
                <i class="pi pi-user"></i>
            </p-inputicon>
            <input type="text" pInputText id="input" [(ngModel)]="name" type="text" placeholder="Name" [pAutoFocus]="true" [fluid]="true" />
        </p-iconfield>

        <p-iconfield>
            <p-inputicon>
                <i class="pi pi-envelope"> </i>
            </p-inputicon>
            <input type="text" pInputText id="email" [(ngModel)]="email" type="email" placeholder="Email" [fluid]="true" />
        </p-iconfield>

        <div class="flex items-center gap-2">
            <p-checkbox id="accept" [(ngModel)]="accept" name="accept" value="Accept" />
            <label for="accept">I agree to the terms and conditions.</label>
        </div>

        <p-button type="submit" label="Submit" class="mt-2" styleClass="w-full" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
    selector: 'focus-trap-basic-demo',
    templateUrl: './focus-trap-basic-demo.html',
    standalone: true,
    imports: [FocusTrapModule, ButtonModule, FormsModule, InputTextModule, CheckboxModule, IconFieldModule, InputIconModule, AutoFocusModule]
})
export class FocusTrapBasicDemo {
    name: string = '';

    email: string = '';

    accept: boolean = false;
}`
    };
}
