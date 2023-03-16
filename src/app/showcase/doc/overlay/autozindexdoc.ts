import { Component, Input } from '@angular/core';

@Component({
    selector: 'auto-zindex-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>The <i>autoZIndex</i> determines whether to automatically manage layering. Its default value is 'false'.</p>
        </app-docsectiontext>
    </div>`
})
export class AutoZIndexDoc {
    @Input() id: string;

    @Input() title: string;
}
