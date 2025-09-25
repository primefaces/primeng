import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PClassModule } from 'primeng/pclass';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, PClassModule, CommonModule],
    template: `
        <app-docsectiontext>
            <p>The <i>pClass</i> directive provides extended class binding functionality. It accepts strings, arrays, objects, and combinations of these types.</p>
        </app-docsectiontext>
        <div class="card flex justify-center items-center gap-4">
            <div pClass="p-4 border border-surface-700 rounded">String class</div>
            <div [pClass]="arrayClasses">Array classes</div>
            <div [pClass]="objectClasses">Object classes</div>
            <div [pClass]="mixedClasses">Mixed classes</div>
            <div class="p-4 border border-surface-700" [ngClass]="ngClassExample" [pClass]="[combinedExample, 'string_class']">Combined: class, ngClass, pClass</div>
        </div>
        <app-code [code]="code" selector="pclass-basic-demo"></app-code>
    `
})
export class BasicDoc {
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

    ngClassExample = {
        rounded: true,
        'bg-green-500': true
    };

    combinedExample = ['text-white', 'font-semibold'];

    code: Code = {
        basic: `<div pClass="p-4 border border-surface-700 rounded">String class</div>
<div [pClass]="arrayClasses">Array classes</div>
<div [pClass]="objectClasses">Object classes</div>
<div [pClass]="mixedClasses">Mixed classes</div>
<div class="p-4 border border-surface-700" [ngClass]="ngClassExample" [pClass]="[combinedExample, 'string_class']">Combined: class, ngClass, pClass</div>`,

        html: `<div class="card flex justify-center items-center gap-4">
    <div pClass="p-4 border border-surface-700 rounded">String class</div>
    <div [pClass]="arrayClasses">Array classes</div>
    <div [pClass]="objectClasses">Object classes</div>
    <div [pClass]="mixedClasses">Mixed classes</div>
    <div class="p-4 border border-surface-700" [ngClass]="ngClassExample" [pClass]="[combinedExample, 'string_class']">Combined: class, ngClass, pClass</div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PClassModule } from 'primeng/pclass';

@Component({
    selector: 'pclass-basic-demo',
    templateUrl: './pclass-basic-demo.html',
    standalone: true,
    imports: [PClassModule, CommonModule]
})
export class PClassBasicDemo {
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

    ngClassExample = {
        rounded: true,
        'bg-green-500': true
    };

    combinedExample = ['text-white', 'font-semibold'];
}`
    };
}
