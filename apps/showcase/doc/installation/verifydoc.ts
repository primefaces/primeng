import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'usage-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                Verify your setup by adding a component such as Button. Each component can be imported and registered individually so that you only include what you use for bundle optimization. Import path is available in the documentation of the
                corresponding component.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button label="Check" />
        </div>
        <app-code [code]="code1" [hideStackBlitz]="true" [hideCodeSandbox]="true" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-code [code]="code2" [hideStackBlitz]="true" [hideCodeSandbox]="true" [hideToggleCode]="true"></app-code>
    `
})
export class VerifyDoc {
    code1: Code = {
        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-demo',
    templateUrl: './button-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonDemo {}`
    };

    code2: Code = {
        html: `<div class="card flex justify-center">
    <p-button label="Check" />
</div>`
    };
}
