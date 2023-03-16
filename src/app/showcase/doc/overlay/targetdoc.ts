import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'target-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>The <i>target</i> is used to detect the element that will be used to position the overlay. Valid values would be;</p>
        </app-docsectiontext>
        <div class="card">
            <ul>
                <li>@prev (default)</li>
                <li>@next</li>
                <li>@parent</li>
                <li>@grandparent</li>
                <li>Use <em>CSS selector</em></li>
                <li>Use <em>() =&gt; HTMLElement</em></li>
            </ul>
        </div>
    </div>`
})
export class TargetDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
import { PrimeNGConfig, OverlayOptions } from 'primeng/api';

this.primengConfig.overlayOptions: OverlayOptions = {
    appendTo: 'body'
};`
    };
}
