import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>ScrollTop listens window scroll by default.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center">
            <p>Scroll down the page to display the ScrollTo component.</p>
            <i class="pi pi-angle-down fadeout animation-duration-1000 animation-iteration-infinite" style="fontsize: 2rem"></i>
            <p-scrollTop></p-scrollTop>
        </div>
        <app-code [code]="code" selector="scroll-top-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `
<p-scrollTop></p-scrollTop>`,
        html: `
<div class="card flex flex-column align-items-center">
    <p>Scroll down the page to display the ScrollTo component.</p>
    <i class="pi pi-angle-down fadeout animation-duration-1000 animation-iteration-infinite" style="fontsize: 2rem"></i>
    <p-scrollTop></p-scrollTop>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'scroll-top-basic-demo',
    templateUrl: './scroll-top-basic-demo.html'
})
export class ScrollTopBasicDemo {}`
    };
}
