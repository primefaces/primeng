import { Component, Input } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    template: ` <app-developmentsection>
        <div>
            <app-docsectiontext [title]="title" [id]="id">
                <p>Refer to <a href="/inputtext">InputText</a> for accessibility as KeyFilter is a built-in add-on of the InputText.</p>
            </app-docsectiontext>
        </div>
    </app-developmentsection>`
})
export class AccessibilityDoc {
    @Input() id: string;

    @Input() title: string;
}
