import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'custom-doc',
    template: `
        <app-docsectiontext>
            <p>Styling Demo Content.</p>
        </app-docsectiontext>
        <div class="card flex flex-col gap-4 items-center">
            <span
                >Ripple option at the
                <span class="mx-1 h-8 w-8 rounded-border inline-flex items-center justify-center bg-primary text-primary-contrast"><i class="pi pi-palette"></i></span>
                configurator needs to be turned on for the demo.</span
            >
            <div class="flex justify-center gap-2">
                <div pRipple class="box" style="border: 1px solid rgba(75, 175, 80, 0.3); --p-ripple-background: rgba(75, 175, 80, 0.3)">Green</div>
                <div pRipple class="box" style="border: 1px solid rgba(255, 193, 6, 0.3); --p-ripple-background: rgba(255, 193, 6, 0.3)">Orange</div>
                <div pRipple class="box" style="border: 1px solid rgba(156, 39, 176, 0.3); --p-ripple-background: rgba(156, 39, 176, 0.3)">Purple</div>
            </div>
        </div>
        <app-code [code]="code" selector="ripple-custom-demo"></app-code>
    `,
    styles: [
        `
            :host {
                .box {
                    padding: 2rem;
                    border-radius: 10px;
                    width: 110px;
                    text-align: center;
                }
            }
        `
    ]
})
export class CustomDoc {
    code: Code = {
        basic: `<div pRipple class="box" style="border: 1px solid rgba(75, 175, 80, 0.3); --p-ripple-background: rgba(75, 175, 80, 0.3)">
    Green
</div>
<div pRipple class="box" style="border: 1px solid rgba(255, 193, 6, 0.3); --p-ripple-background: rgba(255, 193, 6, 0.3)">
    Orange
</div>
<div pRipple class="box" style="border: 1px solid rgba(156, 39, 176, 0.3); --p-ripple-background: rgba(156, 39, 176, 0.3)">
    Purple
</div>`,
        html: `<div class="flex justify-center gap-2">
    <div pRipple class="box" style="border: 1px solid rgba(75, 175, 80, 0.3); --p-ripple-background: rgba(75, 175, 80, 0.3)">
        Green
    </div>
    <div pRipple class="box" style="border: 1px solid rgba(255, 193, 6, 0.3); --p-ripple-background: rgba(255, 193, 6, 0.3)">
        Orange
    </div>
    <div pRipple class="box" style="border: 1px solid rgba(156, 39, 176, 0.3); --p-ripple-background: rgba(156, 39, 176, 0.3)">
        Purple
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'ripple-custom-demo',
    templateUrl: './ripple-custom-demo.html',
    standalone: true,
    imports: [Ripple],
    styles: [
        \` :host {
                .box {
                    padding: 2rem;
                    border-radius: 10px;
                    width: 110px;
                    text-align: center;
                }
            }\`
    ],
})
export class RippleCustomDemo {
}`,
        scss: `:host {
            .box {
                padding: 2rem;
                border-radius: 10px;
                width: 110px;
                text-align: center;
            }
        }`
    };
}
