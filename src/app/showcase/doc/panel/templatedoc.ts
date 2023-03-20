import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Header and Footers sections can be customized using <i>header</i> and <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card">
            <p-panel>
                <ng-template pTemplate="header"> <span class="text-primary font-semibold text-xl">Header</span></ng-template>
                Body Content
                <ng-template pTemplate="footer"> Footer content here </ng-template>
            </p-panel>
        </div>
        <app-code [code]="code" selector="panel-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-panel>
    <ng-template pTemplate="header"> <span class="text-primary font-semibold text-xl">Header</span></ng-template>
    Body Content
    <ng-template pTemplate="footer"> Footer content here </ng-template>
</p-panel>`,

        html: `
<div class="card">
    <p-panel>
        <ng-template pTemplate="header"> <span class="text-primary font-semibold text-xl">Header</span></ng-template>
        Body Content
        <ng-template pTemplate="footer"> Footer content here </ng-template>
    </p-panel>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'panel-template-demo',
    templateUrl: './panel-template-demo.html'
})
export class PanelTemplateDemo {}`
    };
}
