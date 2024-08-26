import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Popover is accessed via its reference and visibility is controlled using <i>toggle</i>, <i>show</i> and <i>hide</i> methods with an event of the target.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button (click)="op.toggle($event)" icon="pi pi-share-alt" label="Share" />
            <p-popover #op>
                <div class="flex flex-col gap-4 w-[25rem]">
                    <div>
                        <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Share this document</span>
                        <p-inputGroup>
                            <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-[25rem]" />
                            <p-inputGroupAddon>
                                <i class="pi pi-copy"></i>
                            </p-inputGroupAddon>
                        </p-inputGroup>
                    </div>
                    <div>
                        <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Invite Member</span>
                        <div class="flex">
                            <p-chips disabled />
                            <p-button label="Invite" icon="pi pi-users" />
                        </div>
                    </div>
                    <div>
                        <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Team Members</span>
                        <ul class="list-none p-0 m-0 flex flex-col gap-4">
                            <li *ngFor="let member of members" class="flex items-center gap-2">
                                <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                                <div>
                                    <span class="font-medium">{{ member.name }}</span>
                                    <div class="text-sm text-muted-color">{{ member.email }}</div>
                                </div>
                                <div class="flex items-center gap-2 text-muted-color ml-auto text-sm">
                                    <span>{{ member.role }}</span>
                                    <i class="pi pi-angle-down"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </p-popover>
        </div>
        <app-code [code]="code" selector="popover-basic-demo"></app-code>
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
    <p-popover #op>
        <div class="flex flex-col gap-4 w-[25rem]">
            <div>
                <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Share this document</span>
                <p-inputGroup>
                    <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-[25rem]" />
                    <p-inputGroupAddon>
                        <i class="pi pi-copy"></i>
                    </p-inputGroupAddon>
                </p-inputGroup>
            </div>
            <div>
                <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Invite Member</span>
                <div class="flex">
                    <p-chips disabled />
                    <p-button label="Invite" icon="pi pi-users" />
                </div>
            </div>
            <div>
                <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Team Members</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-4">
                    <li *ngFor="let member of members" class="flex items-center gap-2">
                        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                        <div>
                            <span class="font-medium">{{ member.name }}</span>
                            <div class="text-sm text-muted-color">{{ member.email }}</div>
                        </div>
                        <div class="flex items-center gap-2 text-muted-color ml-auto text-sm">
                            <span>{{ member.role }}</span>
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </p-popover>`,

        html: `<div class="card flex justify-center">
    <p-button (click)="op.toggle($event)" icon="pi pi-share-alt" label="Share" />
    <p-popover #op>
        <div class="flex flex-col gap-4 w-[25rem]">
            <div>
                <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Share this document</span>
                <p-inputGroup>
                    <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-[25rem]" />
                    <p-inputGroupAddon>
                        <i class="pi pi-copy"></i>
                    </p-inputGroupAddon>
                </p-inputGroup>
            </div>
            <div>
                <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Invite Member</span>
                <div class="flex">
                    <p-chips disabled />
                    <p-button label="Invite" icon="pi pi-users" />
                </div>
            </div>
            <div>
                <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Team Members</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-4">
                    <li *ngFor="let member of members" class="flex items-center gap-2">
                        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                        <div>
                            <span class="font-medium">{{ member.name }}</span>
                            <div class="text-sm text-muted-color">{{ member.email }}</div>
                        </div>
                        <div class="flex items-center gap-2 text-muted-color ml-auto text-sm">
                            <span>{{ member.role }}</span>
                            <i class="pi pi-angle-down"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </p-popover>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PopoverModule } from 'primeng/popover';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'popover-basic-demo',
    templateUrl: './popover-basic-demo.html',
    standalone: true,
    imports: [PopoverModule, InputGroupModule, InputGroupAddonModule, ButtonModule, InputTextModule, ChipsModule, CommonModule]
})
export class PopoverBasicDemo {
    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];
}`
    };
}
