import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'indeterminate-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>For progresses with no value to track, set the <i>mode</i> property to <i>indeterminate</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-progressBar mode="indeterminate" [style]="{ height: '6px' }"></p-progressBar>
        </div>
        <app-code [code]="code" selector="progress-bar-indeterminate-demo"></app-code>
    </section>`,
    providers: [MessageService]
})
export class IndeterminateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-progressBar mode="indeterminate" [style]="{ height: '6px' }"></p-progressBar>`,
        html: `
<div class="card">
    <p-progressBar mode="indeterminate" [style]="{'height': '6px'}"></p-progressBar>
</div>`,
        typescript: `
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'progress-bar-indeterminate-demo',
    templateUrl: './progress-bar-indeterminate-demo.html',
    providers: [MessageService]
})
export class ProgressBarIndeterminateDemo {}`
    };
}
