import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'target-doc',
    standalone: true,
    imports: [PopoverModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                <i>show</i> method takes two parameters, first one is the event and it is mandatory. By default the target component to align the overlay is the event target, if you'd like to align it to another element, provide it as the second
                parameter <i>target</i>.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-button (click)="op.show($event, targetEl)" icon="pi pi-image" label="Show"></p-button>
            <div #targetEl class="mt-8 w-40 h-20 border border-surface rounded-border flex items-center justify-center">
                <span>Target Element</span>
            </div>
            <p-popover #op>
                <img src="https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg" alt="product" />
            </p-popover>
        </div>
        <app-code [code]="code" selector="overlay-panel-target-demo"></app-code>
    `
})
export class TargetDoc {
    code: Code = {
        basic: `<p-button (click)="op.show($event, targetEl)" icon="pi pi-image" label="Show"></p-button>
<div #targetEl class="mt-8 w-40 h-20 border border-surface rounded-border flex items-center justify-center">
    <span>Target Element</span>
</div>
<p-popover #op>
    <img src="https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg" alt="product" />
</p-popover>`,

        html: `
<div class="card flex flex-col items-center gap-4">
    <p-button (click)="op.show($event, targetEl)" icon="pi pi-image" label="Show"></p-button>
    <div #targetEl class="mt-8 w-40 h-20 border border-surface rounded-border flex items-center justify-center">
        <span>Target Element</span>
    </div>
    <p-popover #op>
        <img src="https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg" alt="product" />
    </p-popover>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'overlay-panel-target-demo',
    templateUrl: './overlay-panel-target-demo.html'
})
export class OverlayPanelTargetDemo {}`
    };
}
