import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'default-doc',
    template: `
        <app-docsectiontext>
            <p>Default Demo Content.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <span
                >Ripple option at the
                <span class="mx-1 h-8 w-8 rounded-border inline-flex items-center justify-center bg-primary text-primary-contrast"><i class="pi pi-palette"></i></span>
                configurator needs to be turned on for the demo.</span
            >
            <div pRipple class="ripple-box">Default</div>
        </div>
        <app-code [code]="code" selector="ripple-default-demo"></app-code>
    `,
    styles: [
        `
            :host {
                .ripple-box {
                    display: flex;
                    user-select: none;
                    justify-content: center;
                    align-items: center;
                    padding: 3rem;
                    font-weight: bold;
                    background: var(--p-content-background);
                    border: 1px solid var(--p-content-border-color);
                    border-radius: var(--p-content-border-radius);
                }
            }
        `
    ]
})
export class DefaultDoc {
    code: Code = {
        basic: `<div pRipple class="ripple-box">Default</div>`,
        html: `<div class="card flex flex-col items-center gap-4">
    <div pRipple class="ripple-box">Default</div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'ripple-default-demo',
    templateUrl: './ripple-default-demo.html',
    styles: [
        \` :host {
                .ripple-box {
                    display: flex;
                    user-select: none;
                    justify-content: center;
                    align-items: center;
                    padding: 3rem;
                    font-weight: bold;
                    background: var(--p-content-background);
                    border: 1px solid var(--p-content-border-color);
                    border-radius: var(--p-content-border-radius);
                }
            }\`
    ],
    standalone: true,
    imports: [Ripple]
})
export class RippleDefaultDemo {
}`,
        scss: `:host {
                .ripple-box {
                    display: flex;
                    user-select: none;
                    justify-content: center;
                    align-items: center;
                    padding: 3rem;
                    font-weight: bold;
                    background: var(--p-content-background);
                    border: 1px solid var(--p-content-border-color);
                    border-radius: var(--p-content-border-radius);
                }
            }
}`
    };
}
