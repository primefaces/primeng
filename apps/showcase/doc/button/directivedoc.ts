import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'button-directive-demo',
    template: `
        <app-docsectiontext>
            <p>
                Button can also be used as directive using <i>pButton</i> along with <i>pButtonLabel</i> and <i>pButtonIcon</i> helper directives. In contrary of p-button component, pButton directive does not utilize ripple effect, use
                <i>pRipple</i> directive to enable ripple.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <button pButton pRipple severity="success">
                <WindowMaximizeIcon pButtonIcon />
                <span pButtonLabel>label</span>
            </button>
        </div>
        <app-code [code]="code" selector="button-directive-demo"></app-code>
    `
})
export class DirectiveDoc {
    code: Code = {
        basic: `<button pButton pRipple severity="success">
    <WindowMaximizeIcon pButtonIcon />
    <span pButtonLabel>label</span>
</button>`,

        html: `<div class="card flex justify-center">
    <button pButton pRipple severity="success">
        <WindowMaximizeIcon pButtonIcon />
        <span pButtonLabel>label</span>
    </button>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'button-directive-demo',
    templateUrl: './button-directive-demo.html',
    standalone: true,
    imports: [ButtonModule, RippleModule]
})
export class ButtonDirectiveDemo { }`
    };
}
