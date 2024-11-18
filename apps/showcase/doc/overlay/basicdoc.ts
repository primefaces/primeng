import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: ` <app-docsectiontext>
            <p>Overlay is a container to display content in an overlay window. All the options mentioned above can be used as props for this component.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button (click)="toggle()" label="Show Overlay"></p-button>
            <p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-6 bg-surface-0 dark:bg-surface-900 shadow rounded-border"> Content </p-overlay>
        </div>
        <app-code [code]="code" selector="overlay-basic-demo"></app-code>`
})
export class OverlayBasicDemo {
    overlayVisible: boolean = false;

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    code: Code = {
        basic: `<p-button (click)="toggle()" label="Show Overlay"></p-button>
<p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-6 bg-surface-0 dark:bg-surface-900 shadow rounded-border">
    Content
</p-overlay>`,
        html: `
<div class="card flex justify-center">
    <p-button (click)="toggle()" label="Show Overlay"></p-button>
    <p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-6 bg-surface-0 dark:bg-surface-900 shadow rounded-border">
        Content
    </p-overlay>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'overlay-basic-demo',
    templateUrl: './overlay-basic-demo.html'
})
export class OverlayBasicDemo {
    overlayVisible: boolean = false;

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }
}`
    };
}
