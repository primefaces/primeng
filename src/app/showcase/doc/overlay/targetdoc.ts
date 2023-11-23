import { Component, Input, ViewChild } from '@angular/core';
import { Code } from '../../domain/code';
import { AppDocSectionTextComponent } from '../../layout/doc/docsectiontext/app.docsectiontext.component';

@Component({
    selector: 'target-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id" [level]="3" #docsectiontext>
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
        </div>
    </section>`
})
export class TargetDoc {
    @Input() id: string;

    @Input() title: string;

    @ViewChild('docsectiontext', { static: true }) docsectiontext: AppDocSectionTextComponent;

    code: Code = {
        basic: `
import { PrimeNGConfig, OverlayOptions } from 'primeng/api';

this.primengConfig.overlayOptions: OverlayOptions = {
    appendTo: 'body'
};`
    };
}
