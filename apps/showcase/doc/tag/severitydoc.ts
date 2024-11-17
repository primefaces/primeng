import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'severity-doc',
    template: `
        <app-docsectiontext>
            <p>Severity defines the color of the tag, possible values are <i>success</i>, <i>info</i>, <i>warn</i> and <i>danger</i> in addition to the default theme color.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-tag value="Primary" />
            <p-tag severity="secondary" value="Secondary" />
            <p-tag severity="success" value="Success" />
            <p-tag severity="info" value="Info" />
            <p-tag severity="warn" value="Warn" />
            <p-tag severity="danger" value="Danger" />
            <p-tag severity="contrast" value="Contrast" />
        </div>
        <app-code [code]="code" selector="tag-severity-demo"></app-code>
    `
})
export class SeverityDoc {
    code: Code = {
        basic: `<p-tag value="Primary" />
<p-tag severity="secondary" value="Secondary" />
<p-tag severity="success" value="Success" />
<p-tag severity="info" value="Info" />
<p-tag severity="warn" value="Warn" />
<p-tag severity="danger" value="Danger" />
<p-tag severity="contrast" value="Contrast" />`,
        html: `<div class="card flex justify-center gap-2">
    <p-tag value="Primary"/>
    <p-tag severity="secondary" value="Secondary"/>
    <p-tag severity="success" value="Success"/>
    <p-tag severity="info" value="Info"/>
    <p-tag severity="warn" value="Warn"/>
    <p-tag severity="danger" value="Danger"/>
    <p-tag severity="contrast" value="Contrast"/>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'tag-severity-demo',
    templateUrl: './tag-severity-demo.html',
    standalone: true,
    imports: [Tag]
})
export class TagSeverityDemo {}`
    };
}
