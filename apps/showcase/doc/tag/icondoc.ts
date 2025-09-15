import { Component } from '@angular/core';
import { Code } from '@/domain/code';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'icon-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, TagModule],
    template: `
        <app-docsectiontext>
            <p>A font icon next to the value can be displayed with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-2">
            <p-tag icon="pi pi-user" value="Primary" />
            <p-tag icon="pi pi-search" severity="secondary" value="Secondary" />
            <p-tag icon="pi pi-check" severity="success" value="Success" />
            <p-tag icon="pi pi-info-circle" severity="info" value="Info" />
            <p-tag icon="pi pi-exclamation-triangle" severity="warn" value="Warn" />
            <p-tag icon="pi pi-times" severity="danger" value="Danger" />
            <p-tag icon="pi pi-cog" severity="contrast" value="Contrast" />
        </div>
        <app-code [code]="code" selector="tag-icon-demo"></app-code>
    `
})
export class IconDoc {
    code: Code = {
        basic: `<p-tag icon="pi pi-user" value="Primary" />
<p-tag icon="pi pi-search" severity="secondary" value="Secondary" />
<p-tag icon="pi pi-check" severity="success" value="Success" />
<p-tag icon="pi pi-info-circle" severity="info" value="Info" />
<p-tag icon="pi pi-exclamation-triangle" severity="warn" value="Warn" />
<p-tag icon="pi pi-times" severity="danger" value="Danger" />
<p-tag icon="pi pi-cog" severity="contrast" value="Contrast" />`,

        html: `<div class="card flex flex-wrap justify-center gap-2">
    <p-tag icon="pi pi-user" value="Primary" />
    <p-tag icon="pi pi-search" severity="secondary" value="Secondary" />
    <p-tag icon="pi pi-check" severity="success" value="Success" />
    <p-tag icon="pi pi-info-circle" severity="info" value="Info" />
    <p-tag icon="pi pi-exclamation-triangle" severity="warn" value="Warn" />
    <p-tag icon="pi pi-times" severity="danger" value="Danger" />
    <p-tag icon="pi pi-cog" severity="contrast" value="Contrast" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'tag-icon-demo',
    templateUrl: './tag-icon-demo.html',
    standalone: true,
    imports: [TagModule]
})
export class TagIconDemo {}`
    };
}
