import { Component, Input } from '@angular/core';

@Component({
    selector: 'base-zindex-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>The <i>baseZIndex</i> is base zIndex value to use in layering. Its default value is 0.</p>
        </app-docsectiontext>
    </div>`
})
export class BaseZIndexDoc {
    @Input() id: string;

    @Input() title: string;
}
