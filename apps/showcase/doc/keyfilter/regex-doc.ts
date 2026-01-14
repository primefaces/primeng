import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
    selector: 'regex-doc',
    standalone: true,
    imports: [InputTextModule, KeyFilterModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>In addition to the presets, a regular expression can be configured for customization.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <label for="blockspace" class="font-bold block mb-2"> Block Space </label>
                <input pInputText id="blockspace" [pKeyFilter]="blockSpace" class="w-full" />
            </div>
            <div class="flex-auto">
                <label for="block" class="font-bold block mb-2"> Block < > * ! </label>
                <input pInputText id="block" [pKeyFilter]="blockChars" class="w-full" />
            </div>
        </div>
        <app-code></app-code>
    `
})
export class RegexDoc {
    blockSpace: RegExp = /^[^\s]+$/;
    blockChars: RegExp = /^[^<>*!]+$/;
}
