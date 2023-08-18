import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'avatar-template-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Content can easily be customized with the dynamic content instead of using the built-in modes.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-avatar size="xlarge">
                <span class="text-base">Content</span>
            </p-avatar>
        </div>
        <app-code [code]="code" selector="avatar-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-avatar size="xlarge">
    <span class="text-base">Content</span>
</p-avatar>`,
        html: `
<div class="card flex justify-content-center">
    <p-avatar size="xlarge">
        <span class="text-base">Content</span>
    </p-avatar>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-template-demo',
    templateUrl: './avatar-template-demo.html'
})
export class AvatarTemplateDemo {}`
    };
}
