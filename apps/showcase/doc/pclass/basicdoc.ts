import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { PClassModule } from 'primeng/pclass';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, PClassModule, CommonModule],
    template: `
        <app-docsectiontext>
            <p>ClassNames is applied with the <i>pClass</i> directive. The value can be a <i>string</i>, <i>array</i>, <i>object</i> or any combination of these types.</p>
        </app-docsectiontext>
        <div class="card flex justify-center items-center gap-4">
            <div pClass="py-4 px-8 border border-surface rounded-lg">String</div>
            <div [pClass]="['py-4', 'px-8', 'rounded', 'bg-blue-500', 'text-white', 'font-semibold', 'rounded-lg']">Array</div>
            <div [pClass]="conditionalClasses()" (click)="toggle1()">Conditional</div>
            <div [pClass]="comboClasses()" (click)="toggle2()">Combination</div>
        </div>
        <app-code [code]="code" selector="pclass-basic-demo"></app-code>
    `
})
export class BasicDoc {
    active1 = signal<boolean>(false);

    active2 = signal<boolean>(false);

    conditionalClasses = computed(() => ({
        'p-4 rounded-lg cursor-pointer select-none border': true,
        'bg-primary': this.active1(),
        'text-primary-contrast': this.active1(),
        'border-surface': !this.active1(),
        'border-primary': this.active1()
    }));

    comboClasses = computed(() => [
        'p-4',
        'rounded-lg',
        {
            'bg-purple-700 text-white': this.active2(),
            'bg-purple-100 text-purple-800': !this.active2()
        },
        ['cursor-pointer select-none border']
    ]);

    toggle1() {
        this.active1.set(!this.active1());

        console.log('active1', this.active1());
    }

    toggle2() {
        this.active2.set(!this.active2());
    }

    code: Code = {
        basic: `<!-- Static Examples -->
<div pClass="p-4 border border-surface-700 rounded">String class</div>
<div [pClass]="arrayClasses">Array classes</div>
<div [pClass]="objectClasses">Object classes</div>
<div [pClass]="mixedClasses">Mixed classes</div>

<!-- Signal & Dynamic Examples -->
<div [pClass]="conditionalClasses()" (click)="toggle1()">
    Conditional - Active: {{ active1() }}
</div>
<div [pClass]="comboClasses()" (click)="toggle2()">
    Combination - Active: {{ active2() }}
</div>`,

        html: `<div class="card">
    <h3>Static Examples</h3>
    <div class="flex justify-center items-center gap-4 mb-4">
        <div pClass="p-4 border border-surface-700 rounded">String class</div>
        <div [pClass]="arrayClasses">Array classes</div>
        <div [pClass]="objectClasses">Object classes</div>
        <div [pClass]="mixedClasses">Mixed classes</div>
    </div>

    <h3>Signal & Dynamic Examples</h3>
    <div class="flex justify-center items-center gap-4">
        <div [pClass]="conditionalClasses()" (click)="toggle1()">
            Conditional - Active: {{ active1() }}
        </div>
        <div [pClass]="comboClasses()" (click)="toggle2()">
            Combination - Active: {{ active2() }}
        </div>
    </div>
</div>`,

        typescript: `import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PClassModule } from 'primeng/pclass';

@Component({
    selector: 'pclass-basic-demo',
    templateUrl: './pclass-basic-demo.html',
    standalone: true,
    imports: [PClassModule, CommonModule]
})
export class PClassBasicDemo {
    // Static classes
    arrayClasses = ['p-4', 'rounded', 'bg-blue-500', 'text-white'];

    objectClasses = {
        'p-4': true,
        'border-surface-700': true,
        border: true,
        rounded: true
    };

    mixedClasses = [
        'p-4',
        'rounded',
        {
            'bg-purple-500': true,
            'text-white': true
        }
    ];

    // Signals for dynamic testing
    active1 = signal<boolean>(false);
    active2 = signal<boolean>(false);

    // Computed signal classes
    conditionalClasses = computed(() => ({
        'p-4 rounded-lg cursor-pointer select-none border': true,
        'bg-primary': this.active1(),
        'text-primary-contrast': this.active1(),
        'border-surface': !this.active1(),
        'border-primary': this.active1()
    }));

    comboClasses = computed(() => [
        'p-4',
        'rounded-lg',
        {
            'bg-purple-700 text-white': this.active2(),
            'bg-purple-100 text-purple-800': !this.active2()
        },
        ['cursor-pointer select-none border']
    ]);

    toggle1() {
        this.active1.update((value) => !value);
    }

    toggle2() {
        this.active2.update((value) => !value);
    }
}`
    };
}
