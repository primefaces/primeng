import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>ScrollTop listens window scroll by default.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center">
            <p>Scroll down the page to display the ScrollTo component.</p>
            <i class="pi pi-angle-down animate-fadeout animate-duration-1000 animate-infinite" style="fontsize: 2rem; margin-bottom: 30rem"></i>
            <p-scrolltop />
        </div>
        <app-code [code]="code" selector="scroll-top-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-scrolltop />`,
        html: `<div class="card flex flex-col items-center">
    <p>Scroll down the page to display the ScrollTo component.</p>
    <i class="pi pi-angle-down animate-fadeout animate-duration-1000 animate-infinite" style="fontsize: 2rem"></i>
    <p-scrolltop />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ScrollTop } from 'primeng/scrolltop';

@Component({
    selector: 'scroll-top-basic-demo',
    templateUrl: './scroll-top-basic-demo.html',
    standalone: true,
    imports: [ScrollTop]
})
export class ScrollTopBasicDemo {}`
    };
}
