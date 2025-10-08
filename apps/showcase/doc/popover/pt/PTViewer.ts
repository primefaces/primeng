import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';

interface Member {
    name: string;
    image: string;
    email: string;
    role: string;
}

@Component({
    selector: 'popover-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, PopoverModule, ButtonModule, InputTextModule, InputGroupModule, InputGroupAddonModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-button (click)="op.toggle($event)" icon="pi pi-share-alt" label="Share" />
            <p-popover #op>
                <div class="flex flex-col gap-4 w-[25rem]">
                    <div>
                        <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Share this document</span>
                        <p-inputgroup>
                            <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-[25rem]" />
                            <p-inputgroup-addon>
                                <i class="pi pi-copy"></i>
                            </p-inputgroup-addon>
                        </p-inputgroup>
                    </div>
                    <div>
                        <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Invite Member</span>
                        <div class="flex">
                            <p-inputgroup>
                                <input pInputText disabled />
                                <button pButton label="Invite" icon="pi pi-users"></button>
                            </p-inputgroup>
                        </div>
                    </div>
                    <div>
                        <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2">Team Members</span>
                        <ul class="list-none p-0 m-0 flex flex-col gap-4">
                            @for (member of members; track member) {
                                <li class="flex items-center gap-2">
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
                            }
                        </ul>
                    </div>
                </div>
            </p-popover>
        </app-docptviewer>
    `
})
export class PTViewer {
    @ViewChild('op') op!: Popover;

    members: Member[] = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];

    docs = [
        {
            data: getPTOptions('Popover'),
            key: 'Popover'
        }
    ];

    toggle(event: Event) {
        this.op.show(event);
    }
}
