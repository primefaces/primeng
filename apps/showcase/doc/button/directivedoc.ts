import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'button-directive-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Button can also be used as directive using <i>pButton</i> along with <i>pButtonLabel</i> and <i>pButtonIcon</i> helper directives.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <button pButton>
                <i class="pi pi-check" pButtonIcon></i>
                <span pButtonLabel>Save</span>
            </button>
        </div>
        <app-code [code]="code" selector="button-directive-demo"></app-code>
    `
})
export class DirectiveDoc {
    code: Code = {
        basic: `<button pButton>
    <i class="pi pi-check" pButtonIcon></i>
    <span pButtonLabel>Save</span>
</button>`,

        html: `<div class="card flex justify-center">
    <button pButton>
        <i class="pi pi-check" pButtonIcon></i>
        <span pButtonLabel>Save</span>
    </button>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-directive-demo',
    templateUrl: './button-directive-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonDirectiveDemo { }`
    };
}
