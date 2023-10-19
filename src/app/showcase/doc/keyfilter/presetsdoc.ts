import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'presets-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>KeyFilter provides various presets configured with the <i>pKeyFilter</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-3 mb-4">
                <div class="flex-auto">
                    <label for="integer" class="font-bold block mb-2"> Integer </label>
                    <input pInputText id="integer" pKeyFilter="int" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="number" class="font-bold block mb-2"> Number </label>
                    <input pInputText id="number" pKeyFilter="num" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="money" class="font-bold block mb-2"> Money </label>
                    <input pInputText id="money" pKeyFilter="money" class="w-full" />
                </div>
            </div>
            <div class="flex flex-wrap gap-3">
                <div class="flex-auto">
                    <label for="hex" class="font-bold block mb-2"> Hex </label>
                    <input pInputText id="hex" pKeyFilter="hex" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="alphabetic" class="font-bold block mb-2"> Alphabetic </label>
                    <input pInputText id="alphabetic" pKeyFilter="alpha" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="alphanumeric" class="font-bold block mb-2"> Alphanumeric </label>
                    <input pInputText id="alphanumeric" pKeyFilter="alphanum" class="w-full" />
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="key-filter-presets-demo"></app-code>
    </section>`
})
export class PresetsDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<input pInputText pKeyFilter="int" />
<input pInputText pKeyFilter="num" />
<input pInputText pKeyFilter="money" />
<input pInputText pKeyFilter="hex" />
<input pInputText pKeyFilter="alpha" />
<input pInputText pKeyFilter="alphanum" />`,

        html: `
<div class="card">
    <div class="flex flex-wrap gap-3 mb-4">
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> Integer </label>
            <input pInputText id="integer" pKeyFilter="int" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="number" class="font-bold block mb-2"> Number </label>
            <input pInputText id="number" pKeyFilter="num" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="money" class="font-bold block mb-2"> Money </label>
            <input pInputText id="money" pKeyFilter="money" class="w-full" />
        </div>
    </div>
    <div class="flex flex-wrap gap-3">
        <div class="flex-auto">
            <label for="hex" class="font-bold block mb-2"> Hex </label>
            <input pInputText id="hex" pKeyFilter="hex" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="alphabetic" class="font-bold block mb-2"> Alphabetic </label>
            <input pInputText id="alphabetic" pKeyFilter="alpha" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="alphanumeric" class="font-bold block mb-2"> Alphanumeric </label>
            <input pInputText id="alphanumeric" pKeyFilter="alphanum" class="w-full" />
        </div>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'key-filter-presets-demo',
    templateUrl: './key-filter-presets-demo.html'
})
export class KeyFilterPresetsDemo {}`
    };
}
