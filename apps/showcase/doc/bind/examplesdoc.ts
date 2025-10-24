import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { BindModule } from 'primeng/bind';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'examples-doc',
    standalone: true,
    imports: [AppCode, BindModule, TooltipModule, CommonModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>pBind</i> directive dynamically binds attributes, properties, classes, styles, and event listeners to HTML elements.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <div [pBind]="{ 'aria-label': 'basic-box', class: 'bg-blue-500 text-center p-4 rounded w-[7rem] text-primary-contrast' }">
                <p class="m-0">Basic</p>
            </div>

            <div [pBind]="boxBinding" pTooltip="Click to change color">
                <p class="m-0">Advanced</p>
            </div>
        </div>
        <app-code [code]="code" selector="bind-examples-demo"></app-code>
    `
})
export class ExamplesDoc {
    isActive = signal<boolean>(false);

    get boxBinding() {
        return {
            class: ['text-center p-4 rounded select-none w-[7rem] text-primary-contrast', this.isActive() ? 'bg-green-500' : 'bg-gray-500'],
            style: { cursor: 'pointer', transition: 'all 0.3s' },
            'data-state': this.isActive() ? 'active' : 'inactive',
            onclick: () => {
                this.isActive.set(!this.isActive());
            }
        };
    }

    code: Code = {
        basic: `<div [pBind]="{ 'aria-label': 'basic-box', class: 'bg-blue-500 text-center p-4 rounded w-[7rem] text-primary-contrast' }">
        <div [pBind]="boxBinding1">
        <p class="m-0">Basic</p>
    </div>

    <div [pBind]="boxBinding" pTooltip="Click to change color">
        <p class="m-0">Advanced</p>
    </div>
</div>`,

        html: `<div class="card flex justify-center gap-4">
    <div <div [pBind]="{ 'aria-label': 'basic-box', class: 'bg-blue-500 text-center p-4 rounded w-[7rem] text-primary-contrast' }">
        <p class="m-0">Basic</p>
    </div>

    <div [pBind]="boxBinding" pTooltip="Click to change color">
        <p class="m-0">Advanced</p>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { BindModule } from 'primeng/bind';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'bind-examples-demo',
    templateUrl: './bind-examples-demo.html',
    standalone: true,
    imports: [BindModule, TooltipModule]
})
export class BindExamplesDemo {
    isActive = signal<boolean>(false);

    get boxBinding() {
        return {
            class: ['text-center p-4 rounded select-none w-[7rem] text-primary-contrast', this.isActive() ? 'bg-green-500' : 'bg-gray-500'],
            style: { cursor: 'pointer', transition: 'all 0.3s' },
            'data-state': this.isActive() ? 'active' : 'inactive',
            onclick: () => {
                this.isActive.set(!this.isActive());
            }
        };
    }
}`
    };
}
