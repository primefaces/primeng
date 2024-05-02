import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>OverlayPanel is accessed via its reference and visibility is controlled using <i>toggle</i>, <i>show</i> and <i>hide</i> methods with an event of the target.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button (click)="op.toggle($event)" icon="pi pi-share-alt" label="Share" />
            <p-overlayPanel #op>
                <div class="flex flex-column gap-3 w-25rem">
                    <div>
                        <span class="font-medium text-900 block mb-2">Share this document</span>
                        <p-inputGroup>
                            <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-25rem" />
                            <p-inputGroupAddon>
                                <i class="pi pi-copy"></i>
                            </p-inputGroupAddon>
                        </p-inputGroup>
                    </div>
                    <div>
                        <span class="font-medium text-900 block mb-2">Invite Member</span>
                        <div class="flex">
                            <p-chips disabled />
                            <p-button label="Invite" icon="pi pi-users" />
                        </div>
                    </div>
                    <div>
                        <span class="font-medium text-900 block mb-2">Team Members</span>
                        <ul class="list-none p-0 m-0 flex flex-column gap-3">
                            <li *ngFor="let member of members" class="flex align-items-center gap-2">
                                <img [src]="'https://primefaces.org/cdn/primevue/images/avatar/' + member.image" style="width: 32px" />
                                <div>
                                    <span class="font-medium">{{ member.name }}</span>
                                    <div class="text-sm text-color-secondary">{{ member.email }}</div>
                                </div>
                                <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
                                    <span>{{ member.role }}</span>
                                    <i class="pi pi-angle-down"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </p-overlayPanel>
        </div>
        <app-code [code]="code" selector="overlay-panel-basic-demo"></app-code>
    `
})
export class BasicDoc {
    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];

    code: Code = {
        basic: `<p-button (click)="op.toggle($event)" icon="pi pi-share-alt" label="Share" />
    <p-overlayPanel #op>
        <div class="flex flex-column gap-3 w-25rem">
            <div>
                <span class="font-medium text-900 block mb-2">Share this document</span>
                <p-inputGroup>
                    <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-25rem" />
                    <p-inputGroupAddon>
                        <i class="pi pi-copy"></i>
                    </p-inputGroupAddon>
                </p-inputGroup>
            </div>
            <div>
                <span class="font-medium text-900 block mb-2">Invite Member</span>
                <div class="flex">
                    <p-chips disabled />
                    <p-button label="Invite" icon="pi pi-users" />
                </div>
            </div>
            <div>
                <span class="font-medium text-900 block mb-2">Team Members</span>
                <ul class="list-none p-0 m-0 flex flex-column gap-3">
                    <li *ngFor="let member of members" class="flex align-items-center gap-2">
                        <img [src]="'https://primefaces.org/cdn/primevue/images/avatar/' + member.image" style="width: 32px" />
                        <div>
                            <span class="font-medium">{{ member.name }}</span>
                            <div class="text-sm text-color-secondary">{{ member.email }}</div>
                        </div>
                        <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
                            <span>{{ member.role }}</span>
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </p-overlayPanel>`,

        html: `<div class="card flex justify-content-center">
    <p-button (click)="op.toggle($event)" icon="pi pi-share-alt" label="Share" />
    <p-overlayPanel #op>
        <div class="flex flex-column gap-3 w-25rem">
            <div>
                <span class="font-medium text-900 block mb-2">Share this document</span>
                <p-inputGroup>
                    <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-25rem" />
                    <p-inputGroupAddon>
                        <i class="pi pi-copy"></i>
                    </p-inputGroupAddon>
                </p-inputGroup>
            </div>
            <div>
                <span class="font-medium text-900 block mb-2">Invite Member</span>
                <div class="flex">
                    <p-chips disabled />
                    <p-button label="Invite" icon="pi pi-users" />
                </div>
            </div>
            <div>
                <span class="font-medium text-900 block mb-2">Team Members</span>
                <ul class="list-none p-0 m-0 flex flex-column gap-3">
                    <li *ngFor="let member of members" class="flex align-items-center gap-2">
                        <img [src]="'https://primefaces.org/cdn/primevue/images/avatar/' + member.image" style="width: 32px" />
                        <div>
                            <span class="font-medium">{{ member.name }}</span>
                            <div class="text-sm text-color-secondary">{{ member.email }}</div>
                        </div>
                        <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
                            <span>{{ member.role }}</span>
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </p-overlayPanel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'overlay-panel-basic-demo',
    templateUrl: './overlay-panel-basic-demo.html',
    standalone: true,
    imports: [OverlayPanelModule, InputGroupModule, InputGroupAddonModule, ButtonModule, InputTextModule, ChipsModule, CommonModule]
})
export class OverlayPanelBasicDemo {
    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];
}`
    };
}
