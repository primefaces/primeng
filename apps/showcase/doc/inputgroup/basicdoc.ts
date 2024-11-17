import { Code } from '@/domain/code';
import { Component } from '@angular/core';

interface City {
    name: string;
    code: string;
}
@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>A group is created by wrapping the input and add-ons with the <i>p-inputgroup</i> component. Each add-on element is defined as a child of <i>p-inputgroup-addon</i> component.</p>
        </app-docsectiontext>
        <div class="card grid grid-cols-1 md:grid-cols-2 gap-4">
            <p-inputgroup>
                <p-inputgroup-addon>
                    <i class="pi pi-user"></i>
                </p-inputgroup-addon>
                <input pInputText [(ngModel)]="text1" placeholder="Username" />
            </p-inputgroup>

            <p-inputgroup>
                <p-inputgroup-addon>$</p-inputgroup-addon>
                <p-inputnumber [(ngModel)]="number" placeholder="Price" />
                <p-inputgroup-addon>.00</p-inputgroup-addon>
            </p-inputgroup>

            <p-inputgroup>
                <p-inputgroup-addon>www</p-inputgroup-addon>
                <input pInputText [(ngModel)]="text2" placeholder="Website" />
            </p-inputgroup>

            <p-inputgroup>
                <p-inputgroup-addon>
                    <i class="pi pi-map"></i>
                </p-inputgroup-addon>
                <p-select [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" placeholder="City" />
            </p-inputgroup>
        </div>
        <app-code [code]="code" selector="input-group-basic-demo"></app-code>
    `
})
export class BasicDoc {
    text1: string | undefined;

    text2: string | undefined;

    number: string | undefined;

    selectedCity: City | undefined;

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    code: Code = {
        basic: `<p-inputgroup>
    <p-inputgroup-addon>
        <i class="pi pi-user"></i>
    </p-inputgroup-addon>
    <input pInputText [(ngModel)]="text1" placeholder="Username" />
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>$</p-inputgroup-addon>
    <p-inputnumber [(ngModel)]="number" placeholder="Price" />
    <p-inputgroup-addon>.00</p-inputgroup-addon>
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>www</p-inputgroup-addon>
    <input pInputText  [(ngModel)]="text2" placeholder="Website" />
</p-inputgroup>

<p-inputgroup>
    <p-inputgroup-addon>
        <i class="pi pi-map"></i>
    </p-inputgroup-addon>
    <p-select [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" placeholder="City" />
</p-inputgroup>`,

        html: `<div class="card grid grid-cols-1 md:grid-cols-2 gap-4">
    <p-inputgroup>
        <p-inputgroup-addon>
            <i class="pi pi-user"></i>
        </p-inputgroup-addon>
        <input pInputText [(ngModel)]="text1" placeholder="Username" />
    </p-inputgroup>

    <p-inputgroup>
        <p-inputgroup-addon>$</p-inputgroup-addon>
        <p-inputnumber [(ngModel)]="number" placeholder="Price" />
        <p-inputgroup-addon>.00</p-inputgroup-addon>
    </p-inputgroup>

    <p-inputgroup>
        <p-inputgroup-addon>www</p-inputgroup-addon>
        <input pInputText  [(ngModel)]="text2" placeholder="Website" />
    </p-inputgroup>

    <p-inputgroup>
        <p-inputgroup-addon>
            <i class="pi pi-map"></i>
        </p-inputgroup-addon>
        <p-select [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" placeholder="City" />
    </p-inputgroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'input-group-basic-demo',
    templateUrl: './input-group-basic-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule]
})
export class InputGroupBasicDemo {
    text1: string | undefined;

    text2: string | undefined;

    number: string | undefined;

    selectedCity: City | undefined;

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
    ];
}`
    };
}
