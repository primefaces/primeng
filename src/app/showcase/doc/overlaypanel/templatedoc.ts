import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Content of the OverlayPanel is defined by <i>content</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-overlayPanel #op>
                <ng-template pTemplate="content">
                    <h4>Custom Content</h4>
                </ng-template>
            </p-overlayPanel>
            <p-button (click)="op.toggle($event)" icon="pi pi-image" label="Show"></p-button>
        </div>
        <app-code [code]="code" selector="overlay-panel-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-overlayPanel #op>
    <ng-template pTemplate="content">
        <h4>Custom Content</h4>
    </ng-template>
</p-overlayPanel>
<p-button (click)="op.toggle($event)" icon="pi pi-image" label="Show"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-overlayPanel #op>
        <ng-template pTemplate="content">
            <h4>Custom Content</h4>
        </ng-template>
    </p-overlayPanel>
    <p-button (click)="op.toggle($event)" icon="pi pi-image" label="Show"></p-button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'overlay-panel-template-demo',
    templateUrl: './overlay-panel-template-demo.html'
})
export class OverlayPanelTemplateDemo {}`
    };
}
