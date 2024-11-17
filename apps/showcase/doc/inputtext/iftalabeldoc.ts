import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'iftalabel-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
                <label for="username">Username</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="input-text-iftalabel-demo"></app-code>
    `
})
export class IftaLabelDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-iftalabel>
    <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
    <label for="username">Username</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
     <p-iftalabel>
        <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
        <label for="username">Username</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'input-text-iftalabel-demo',
    templateUrl: './input-text-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule, IftaLabelModule]
})
export class InputTextIftaLabelDemo {
    value: string | undefined;
}`
    };
}
