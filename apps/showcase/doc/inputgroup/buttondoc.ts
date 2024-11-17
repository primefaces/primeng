import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'button-doc',
    template: `
        <app-docsectiontext>
            <p>Buttons can be placed at either side of an input element.</p>
        </app-docsectiontext>
        <div class="card flex flex-col md:flex-row gap-4">
            <p-inputgroup>
                <p-button label="Search" />
                <input pInputText placeholder="Keyword" />
            </p-inputgroup>

            <p-inputgroup>
                <input pInputText placeholder="Keyword" />
                <p-inputgroup-addon>
                    <p-button icon="pi pi-search" severity="secondary" variant="text" (click)="menu.toggle($event)" />
                </p-inputgroup-addon>
            </p-inputgroup>
            <p-menu #menu [model]="items" popup styleClass="!min-w-fit" />

            <p-inputgroup>
                <p-inputgroup-addon>
                    <p-button icon="pi pi-check" severity="secondary" />
                </p-inputgroup-addon>
                <input pInputText placeholder="Vote" />
                <p-inputgroup-addon>
                    <p-button icon="pi pi-times" severity="secondary" />
                </p-inputgroup-addon>
            </p-inputgroup>
        </div>
        <app-code [code]="code" selector="input-group-button-demo"></app-code>
    `
})
export class ButtonDoc {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [{ label: 'Web Search' }, { label: 'AI Assistant' }, { label: 'History' }];
    }

    code: Code = {
        basic: `<p-inputgroup>
    <p-button label="Search" />
    <input pInputText placeholder="Keyword" />
</p-inputgroup>

<p-inputgroup>
    <input pInputText placeholder="Keyword" />
    <p-inputgroup-addon>
        <p-button icon="pi pi-search" severity="secondary" variant="text" (click)="menu.toggle($event)" />
    </p-inputgroup-addon>
</p-inputgroup>
<p-menu #menu [model]="items" popup styleClass="!min-w-fit" />

<p-inputgroup>
    <p-inputgroup-addon>
        <p-button icon="pi pi-check" severity="secondary" />
    </p-inputgroup-addon>
    <input pInputText placeholder="Vote" />
    <p-inputgroup-addon>
        <p-button icon="pi pi-times" severity="secondary" />
    </p-inputgroup-addon>
</p-inputgroup>`,

        html: `<div class="card flex flex-col md:flex-row gap-4">
    <p-inputgroup>
        <p-button label="Search" />
        <input pInputText placeholder="Keyword" />
    </p-inputgroup>

    <p-inputgroup>
        <input pInputText placeholder="Keyword" />
        <p-inputgroup-addon>
            <p-button icon="pi pi-search" severity="secondary" variant="text" (click)="menu.toggle($event)" />
        </p-inputgroup-addon>
    </p-inputgroup>
    <p-menu #menu [model]="items" popup styleClass="!min-w-fit" />

    <p-inputgroup>
        <p-inputgroup-addon>
            <p-button icon="pi pi-check" severity="secondary" />
        </p-inputgroup-addon>
        <input pInputText placeholder="Vote" />
        <p-inputgroup-addon>
            <p-button icon="pi pi-times" severity="secondary" />
        </p-inputgroup-addon>
    </p-inputgroup>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'input-group-button-demo',
    templateUrl: './input-group-button-demo.html',
    standalone: true,
    imports: [FormsModule, InputGroup, InputGroupAddonModule, InputTextModule, ButtonModule, MenuModule]
})
export class InputGroupButtonDemo {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [{ label: 'Web Search' }, { label: 'AI Assistant' }, { label: 'History' }];
    }
}`
    };
}
