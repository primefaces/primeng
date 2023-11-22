import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'target-doc',
    template: ` 
        <app-docsectiontext>
            <p>
                <i>show</i> method takes two parameters, first one is the event and it is mandatory. By default the target component to align the overlay is the event target, if you'd like to align it to another element, provide it as the second
                parameter <i>target</i>.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center gap-3">
            <p-button (click)="op.show($event, targetEl)" icon="pi pi-image" label="Show"></p-button>
            <div #targetEl class="mt-5 w-10rem h-5rem border-1 surface-border border-round flex align-items-center justify-content-center">
                <span>Target Element</span>
            </div>
            <p-overlayPanel #op>
                <img src="https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg" alt="product" />
            </p-overlayPanel>
        </div>
        <app-code [code]="code" selector="overlay-panel-target-demo"></app-code>
    `
})
export class TargetDoc {

    code: Code = {
        basic: `
<p-button (click)="op.show($event, targetEl)" icon="pi pi-image" label="Show"></p-button>
<div #targetEl class="mt-5 w-10rem h-5rem border-1 surface-border border-round flex align-items-center justify-content-center">
    <span>Target Element</span>
</div>
<p-overlayPanel #op>
    <img src="https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg" alt="product" />
</p-overlayPanel>`,

        html: `
<div class="card flex flex-column align-items-center gap-3">
    <p-button (click)="op.show($event, targetEl)" icon="pi pi-image" label="Show"></p-button>
    <div #targetEl class="mt-5 w-10rem h-5rem border-1 surface-border border-round flex align-items-center justify-content-center">
        <span>Target Element</span>
    </div>
    <p-overlayPanel #op>
        <img src="https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg" alt="product" />
    </p-overlayPanel>
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
