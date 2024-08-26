import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>ScrollTop listens window scroll by default.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center">
            <p>Scroll down the page to display the ScrollTo component.</p>
            <i class="pi pi-angle-down animate-fadeout animate-duration-1000 animate-infinite" style="fontsize: 2rem; margin-bottom: 30rem"></i>
            <p-scrollTop />
        </div>
        <app-code [code]="code" selector="scroll-top-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-scrollTop />`,
        html: `<div class="card flex flex-col items-center">
    <p>Scroll down the page to display the ScrollTo component.</p>
    <i class="pi pi-angle-down animate-fadeout animate-duration-1000 animate-infinite" style="fontsize: 2rem"></i>
    <p-scrollTop />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
    selector: 'scroll-top-basic-demo',
    templateUrl: './scroll-top-basic-demo.html',
    standalone: true,
    imports: [ScrollTopModule]
})
export class ScrollTopBasicDemo {}`
    };
}
