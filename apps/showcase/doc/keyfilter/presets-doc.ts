import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'presets-doc',
    standalone: true,
    imports: [InputTextModule, KeyFilterModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>KeyFilter provides various presets configured with the <i>pKeyFilter</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap gap-4 mb-6">
                <div class="flex-auto">
                    <label for="integer" class="text-sm font-bold block mb-2"> Integer </label>
                    <input pInputText id="integer" pKeyFilter="int" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="number" class="text-sm font-bold block mb-2"> Number </label>
                    <input pInputText id="number" pKeyFilter="num" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="money" class="text-sm font-bold block mb-2"> Money </label>
                    <input pInputText id="money" pKeyFilter="money" class="w-full" />
                </div>
            </div>
            <div class="flex flex-wrap gap-4">
                <div class="flex-auto">
                    <label for="hex" class="text-sm font-bold block mb-2"> Hex </label>
                    <input pInputText id="hex" pKeyFilter="hex" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="alphabetic" class="text-sm font-bold block mb-2"> Alphabetic </label>
                    <input pInputText id="alphabetic" pKeyFilter="alpha" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="alphanumeric" class="text-sm font-bold block mb-2"> Alphanumeric </label>
                    <input pInputText id="alphanumeric" pKeyFilter="alphanum" class="w-full" />
                </div>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class PresetsDoc {}
