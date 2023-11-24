import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'tag-template-demo',
    template: `
        <app-docsectiontext>
            <p>Children of the component are passed as the content for templating.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tag [style]="{ background: 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)' }">
                <div class="flex align-items-center gap-2">
                    <img alt="Country" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" class="flag flag-it" style="width: '18px'" />
                    <span class="text-base">Italia</span>
                    <i class="pi pi-times text-xs"></i>
                </div>
            </p-tag>
        </div>
        <app-code [code]="code" selector="tag-template-demo"></app-code>
    `
})
export class TemplateDoc {

    code: Code = {
        basic: `
<p-tag [style]="{ 'background': 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)'}">
    <div class="flex align-items-center gap-2">
        <img alt="Country" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" class="flag flag-it" style="width: '18px'" />
        <span class="text-base">Italia</span>
        <i class="pi pi-times text-xs"></i>
    </div>
</p-tag>`,
        html: `
<div class="card flex justify-content-center">
    <p-tag [style]="{ 'background': 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)'}">
        <div class="flex align-items-center gap-2">
            <img alt="Country" src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" class="flag flag-it" style="width: '18px'" />
            <span class="text-base">Italia</span>
            <i class="pi pi-times text-xs"></i>
        </div>
    </p-tag>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tag-template-demo',
    templateUrl: './tag-template-demo.html'
})
export class TagTemplateDemo {}`
    };
}
