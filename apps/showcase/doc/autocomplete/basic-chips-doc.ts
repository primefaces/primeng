import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'basic-chips-doc',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule, AppDocSectionText, AppCode, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>With <i>⁠multiple</i> enabled, the AutoComplete component behaves like a chips or tags input. Use <i>addOnBlur</i>, <i>⁠addOnTab</i>, and <i>⁠separator</i> properties to customize the keystroke behavior for adding items.</p>
        </app-docsectiontext>
        <app-demo-wrapper name="basic-chips-demo">
            <div>
                <label for="chips-blur" class="text-sm font-bold mb-2 block">With Add On Blur</label>
                <p-autocomplete [(ngModel)]="valueBlur" inputId="chips-blur" multiple fluid [typeahead]="false" [addOnBlur]="true" placeholder="Type and click outside to add..." />

                <label for="chips-tab" class="text-sm font-bold mt-8 mb-2 block">With Add On Tab</label>
                <p-autocomplete [(ngModel)]="valueTab" inputId="chips-tab" multiple fluid [typeahead]="false" [addOnTab]="true" placeholder="Type and press Tab to add..." />

                <label for="chips-separator" class="text-sm font-bold mt-8 mb-2 block">With Separator (Comma)</label>
                <p-autocomplete [(ngModel)]="valueSeparator" inputId="chips-separator" multiple fluid [typeahead]="false" separator="," placeholder="Type items separated by comma..." />

                <label for="chips-combined" class="text-sm font-bold mt-8 mb-2 block">Combined Features</label>
                <p-autocomplete [(ngModel)]="valueCombined" inputId="chips-combined" multiple fluid [typeahead]="false" [addOnBlur]="true" [addOnTab]="true" separator="," placeholder="Use Tab, Blur, or Comma to add items..." />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>`
})
export class BasicChipsDoc {
    valueBlur: any[] = [];
    valueTab: any[] = [];
    valueSeparator: any[] = [];
    valueCombined: any[] = [];
}
