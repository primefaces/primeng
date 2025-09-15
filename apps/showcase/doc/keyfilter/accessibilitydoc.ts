import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'key-filter-accessibility-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: ` <div>
        <app-docsectiontext>
            <p>Refer to <a href="/inputtext">InputText</a> for accessibility as KeyFilter is a built-in add-on of the InputText.</p>
        </app-docsectiontext>
    </div>`
})
export class AccessibilityDoc {}
