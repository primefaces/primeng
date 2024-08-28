import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Content of the OverlayPanel is defined by <i>content</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-overlayPanel #op>
                <ng-template pTemplate="content">
                    <h4>Custom Content</h4>
                </ng-template>
            </p-overlayPanel>
            <p-button (onClick)="op.toggle($event)" icon="pi pi-image" label="Show"></p-button>
        </div>
        <app-code [code]="code" selector="overlay-panel-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-overlayPanel #op>
    <ng-template pTemplate="content">
        <h4>Custom Content</h4>
    </ng-template>
</p-overlayPanel>
<p-button (onClick)="op.toggle($event)" icon="pi pi-image" label="Show"></p-button>`,

        html: `
<div class="card flex justify-content-center">
    <p-overlayPanel #op>
        <ng-template pTemplate="content">
            <h4>Custom Content</h4>
        </ng-template>
    </p-overlayPanel>
    <p-button (onClick)="op.toggle($event)" icon="pi pi-image" label="Show"></p-button>
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
