import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'target-doc',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>The <i>target</i> is used to detect the element that will be used to position the overlay. Valid values would be;</p>
        </app-docsectiontext>
        <div class="card">
            <ul>
                <li>&#64;prev (default)</li>
                <li>&#64;next</li>
                <li>&#64;parent</li>
                <li>&#64;grandparent</li>
                <li>Use <em>CSS selector</em></li>
                <li>Use <em>() =&gt; HTMLElement</em></li>
            </ul>
        </div>`
})
export class TargetDoc {
    code: Code = {
        basic: `import { OverlayOptions } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

this.primeng.overlayOptions: OverlayOptions = {
    appendTo: 'body'
};`
    };
}
