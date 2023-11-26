import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'severity-doc',
    template: `
        <app-docsectiontext>
            <p>Severity defines the color of the tag, possible values are <i>success</i>, <i>info</i>, <i>warning</i> and <i>danger</i> in addition to the default theme color.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-tag value="Primary"></p-tag>
            <p-tag severity="success" value="Success"></p-tag>
            <p-tag severity="info" value="Info"></p-tag>
            <p-tag severity="warning" value="Warning"></p-tag>
            <p-tag severity="danger" value="Danger"></p-tag>
        </div>
        <app-code [code]="code" selector="tag-severity-demo"></app-code>
    `
})
export class SeverityDoc {
    code: Code = {
        basic: `
<p-tag severity="success" value="Success"></p-tag>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-tag value="Primary"></p-tag>
    <p-tag severity="success" value="Success"></p-tag>
    <p-tag severity="info" value="Info"></p-tag>
    <p-tag severity="warning" value="Warning"></p-tag>
    <p-tag severity="danger" value="Danger"></p-tag>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tag-severity-demo',
    templateUrl: './tag-severity-demo.html'
})
export class TagSeverityDemo {}`
    };
}
