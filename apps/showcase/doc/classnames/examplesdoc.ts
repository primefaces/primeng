import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ClassNamesModule } from 'primeng/classnames';

@Component({
    selector: 'classnames-basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, ClassNamesModule, CommonModule],
    template: `
        <app-docsectiontext>
            <p><i>pClass</i> directive accepts a <i>string</i>, <i>array</i>, <i>object</i> or any combination of these types with support for nesting.</p>
            <p>
                Angular's native directive does not support white-space separated multiple string values as in the <i>Array</i> and <i>Conditional</i> examples. In addition <i>Combination</i> of multiple types, or even nesting is also not available
                in the native directive.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center items-center gap-4">
            <div pClass="py-4 px-8 border border-surface rounded-lg">String</div>
            <div [pClass]="['py-4', 'px-8', 'bg-primary text-primary-contrast', 'font-semibold', 'rounded-lg']">Array</div>
            <div [pClass]="conditionalClasses()" (click)="toggle1()">Conditional</div>
            <div [pClass]="comboClasses()" (click)="toggle2()">Combination</div>
        </div>
        <app-code [code]="code" selector="classnames-basic-demo"></app-code>
    `
})
export class ExamplesDoc {
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
            'bg-primary text-primary-contrast': this.active2()
        },
        [
            'cursor-pointer select-none',
            'border',
            {
                'bg-primary-100 text-primary-800': !this.active2()
            },
            ['shadow-sm hover:shadow-lg', 'transition-all']
        ]
    ]);

    toggle1() {
        this.active1.set(!this.active1());
    }

    toggle2() {
        this.active2.set(!this.active2());
    }

    code: Code = {
        basic: `<div pClass="py-4 px-8 border border-surface rounded-lg">String</div>
<div [pClass]="['py-4', 'px-8', 'bg-primary text-primary-contrast', 'font-semibold', 'rounded-lg']">Array</div>
<div [pClass]="conditionalClasses()" (click)="toggle1()">Conditional</div>
<div [pClass]="comboClasses()" (click)="toggle2()">Combination</div>`,

        html: `<div class="card flex justify-center items-center gap-4">
    <div pClass="py-4 px-8 border border-surface rounded-lg">String</div>
    <div [pClass]="['py-4', 'px-8', 'bg-primary text-primary-contrast', 'font-semibold', 'rounded-lg']">Array</div>
    <div [pClass]="conditionalClasses()" (click)="toggle1()">Conditional</div>
    <div [pClass]="comboClasses()" (click)="toggle2()">Combination</div>
</div>`,

        typescript: `import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PClassModule } from 'primeng/pclass';

@Component({
    selector: 'classnames-basic-demo',
    templateUrl: './classnames-basic-demo.html',
    standalone: true,
    imports: [ClassNamesModule, CommonModule]
})
export class ClassNamesDemo {
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
            'bg-primary text-primary-contrast': this.active2()
        },
        [
            'cursor-pointer select-none',
            'border',
            {
                'bg-primary-100 text-primary-800': !this.active2()
            },
            ['shadow-sm hover:shadow-lg', 'transition-all']
        ]
    ]);

    toggle1() {
        this.active1.set(!this.active1());
    }

    toggle2() {
        this.active2.set(!this.active2());
    }
}`
    };
}
