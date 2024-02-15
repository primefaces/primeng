import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'reg-exp-demo',
    template: `
        <app-docsectiontext>
            <p>In addition to the presets, a regular expression can be configured for customization.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3">
            <div class="flex-auto">
                <label for="blockspace" class="font-bold block mb-2"> Block Space </label>
                <input pInputText id="blockspace" [pKeyFilter]="blockSpace" class="w-full" />
            </div>
            <div class="flex-auto">
                <label for="block" class="font-bold block mb-2"> Block < > * ! </label>
                <input pInputText id="block" [pKeyFilter]="blockChars" class="w-full" />
            </div>
        </div>
        <app-code [code]="code" selector="key-filter-reg-exp-demo"></app-code>
    `
})
export class RegexDoc {
    blockSpace: RegExp = /[^\s]/;

    blockChars: RegExp = /^[^<>*!]+$/;

    code: Code = {
        basic: `<input pInputText [pKeyFilter]="blockSpace" />
<input pInputText [pKeyFilter]="blockChars" />`,

        html: `
<div class="card flex flex-wrap gap-3">
    <div class="flex-auto">
        <label for="blockspace" class="font-bold block mb-2"> Block Space </label>
        <input pInputText id="blockspace" pKeyFilter="int" class="w-full" />
    </div>
    <div class="flex-auto">
        <label for="block" class="font-bold block mb-2"> Block < > * ! </label>
        <input pInputText id="block" pKeyFilter="int" class="w-full" />
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'key-filter-reg-exp-demo',
    templateUrl: './key-filter-reg-exp-demo.html'
})
export class KeyFilterRegExpDemo {
    blockSpace: RegExp = /[^\s]/; 
    
    blockChars: RegExp = /^[^<>*!]+$/;
}`
    };
}
