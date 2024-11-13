import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'button-icons-demo',
    template: `
        <app-docsectiontext>
            <p>Icon of a button is specified with <i>icon</i> property and position is configured using <i>iconPos</i> attribute.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <div class="flex flex-wrap gap-4 justify-center">
                <p-button icon="pi pi-home" aria-label="Save" />
                <p-button label="Profile" icon="pi pi-user" />
                <p-button label="Save" icon="pi pi-check" iconPos="right" />
            </div>
            <div class="flex flex-wrap gap-4 justify-center">
                <p-button label="Search" icon="pi pi-search" iconPos="top" />
                <p-button label="Update" icon="pi pi-refresh" iconPos="bottom" />
            </div>
        </div>
        <app-code [code]="code" selector="button-icons-demo"></app-code>
    `
})
export class IconsDoc {
    code: Code = {
        basic: `<p-button icon="pi pi-home" aria-label="Save" />
<p-button label="Profile" icon="pi pi-user" />
<p-button label="Save" icon="pi pi-check" iconPos="right" />
<p-button label="Search" icon="pi pi-search" iconPos="top" />
<p-button label="Update" icon="pi pi-refresh" iconPos="bottom" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <div class="flex flex-wrap gap-4 justify-center">
        <p-button icon="pi pi-home" aria-label="Save" />
        <p-button label="Profile" icon="pi pi-user" />
        <p-button label="Save" icon="pi pi-check" iconPos="right" />
    </div>
    <div class="flex flex-wrap gap-4 justify-center">
        <p-button label="Search" icon="pi pi-search" iconPos="top" />
        <p-button label="Update" icon="pi pi-refresh" iconPos="bottom" />
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-icons-demo',
    templateUrl: './button-icons-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonIconsDemo { }`
    };
}
