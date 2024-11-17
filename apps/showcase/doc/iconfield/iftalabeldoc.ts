import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'ifta-label-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <p-iconfield>
                    <p-inputicon class="pi pi-user" />
                    <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
                </p-iconfield>
                <label for="username">Username</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="iconfield-ifta-label-demo"></app-code>
    `
})
export class IftaLabelDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-iftalabel>
    <p-iconfield>
        <p-inputicon class="pi pi-user" />
        <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
    </p-iconfield>
    <label for="username">Username</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <p-iconfield>
            <p-inputicon class="pi pi-user" />
            <input pInputText id="username" [(ngModel)]="value" autocomplete="off" />
        </p-iconfield>
        <label for="username">Username</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'iconfield-ifta-label-demo',
    templateUrl: './iconfield-ifta-label-demo.html',
    standalone: true,
    imports: [InputIconModule, IconFieldModule, InputTextModule, IftaLabelModule, FormsModule]
})
export class IconFieldIftaLabelDemo {
  value: string | undefined;
}`
    };
}
