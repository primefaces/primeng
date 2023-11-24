import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'icon-doc',
    template: `
        <app-docsectiontext>
            <p>A font icon next to the value can be displayed with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-tag icon="pi pi-user" value="Primary"></p-tag>
            <p-tag icon="pi pi-check" severity="success" value="Success"></p-tag>
            <p-tag icon="pi pi-info-circle" severity="info" value="Info"></p-tag>
            <p-tag icon="pi pi-exclamation-triangle" severity="warning" value="Warning"></p-tag>
            <p-tag icon="pi pi-times" severity="danger" value="Danger"></p-tag>
        </div>
        <app-code [code]="code" selector="tag-icon-demo"></app-code>
    `
})
export class IconDoc {
    code: Code = {
        basic: `
<p-tag icon="pi pi-user" value="Primary"></p-tag>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-tag icon="pi pi-user" value="Primary"></p-tag>
    <p-tag icon="pi pi-check" severity="success" value="Success"></p-tag>
    <p-tag icon="pi pi-info-circle" severity="info" value="Info"></p-tag>
    <p-tag icon="pi pi-exclamation-triangle" severity="warning" value="Warning"></p-tag>
    <p-tag icon="pi pi-times" severity="danger" value="Danger"></p-tag>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tag-icon-demo',
    templateUrl: './tag-icon-demo.html'
})
export class TagIconDemo {}`
    };
}
