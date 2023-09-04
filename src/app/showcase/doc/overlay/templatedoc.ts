import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'overlay-template-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Content can be customized with the <i>content</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button (click)="toggle()" label="Show Overlay"></p-button>
            <p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-4 surface-overlay shadow-2 border-round">
                <ng-template pTemplate="content" let-option> Content - {{ option.mode }} </ng-template>
            </p-overlay>
        </div>
        <app-code [code]="code" selector="overlay-template-demo"></app-code>
    </section>`
})
export class OverlayTemplateDemo {
    @Input() id: string;

    @Input() title: string;

    overlayVisible: boolean = false;

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    code: Code = {
        basic: `
<p-button (click)="toggle()" label="Show Overlay"></p-button>
<p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-4 surface-overlay shadow-2 border-round">
    <ng-template pTemplate="content" let-option>
        Content - {{option.mode}}
    </ng-template>
</p-overlay>`,
        html: `
<div class="card flex justify-content-center">
    <p-button (click)="toggle()" label="Show Overlay"></p-button>
    <p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-4 surface-overlay shadow-2 border-round">
        <ng-template pTemplate="content" let-option>
            Content - {{option.mode}}
        </ng-template>
    </p-overlay>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'overlay-template-demo',
    templateUrl: './overlay-template-demo.html' 
})
export class OverlayTemplateDemo {
    overlayVisible: boolean = false;

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }
}`
    };
}
