import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'appendto-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Overlay can be mounted into its location, body or DOM element instance using this option.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class AppendToDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        typescript: `
import { PrimeNGConfig, OverlayOptions } from 'primeng/api';

this.primengConfig.overlayOptions: OverlayOptions = {
    appendTo: 'body'
};`
    };
}
