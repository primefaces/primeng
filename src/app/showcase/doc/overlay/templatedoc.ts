import { Component, Input } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'overlay-template-demo',
    template: ` <app-docsectiontext>
            <p>Content can be customized with the <i>content</i> template.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button (onClick)="toggle()" label="Show Overlay"></p-button>
            <p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-4 surface-overlay shadow-2 border-round">
                <ng-template pTemplate="content" let-option> Content - {{ option.mode }} </ng-template>
            </p-overlay>
        </div>
        <app-code [code]="code" selector="overlay-template-demo"></app-code>`
})
export class OverlayTemplateDemo {
    overlayVisible: boolean = false;

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    code: Code = {
        basic: `<p-button (onClick)="toggle()" label="Show Overlay"></p-button>
<p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-4 surface-overlay shadow-2 border-round">
    <ng-template pTemplate="content" let-option>
        Content - {{option.mode}}
    </ng-template>
</p-overlay>`,
        html: `
<div class="card flex justify-content-center">
    <p-button (onClick)="toggle()" label="Show Overlay"></p-button>
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
