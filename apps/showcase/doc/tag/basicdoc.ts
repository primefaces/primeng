import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Label of the tag is defined with the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-tag value="New" />
        </div>
        <app-code [code]="code" selector="tag-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-tag value="New" />`,
        html: `<div class="card flex justify-center">
    <p-tag value="New" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'tag-basic-demo',
    templateUrl: './tag-basic-demo.html',
    standalone: true,
    imports: [Tag]
})
export class TagBasicDemo {}`
    };
}
