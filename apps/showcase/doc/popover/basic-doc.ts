import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [CommonModule, PopoverModule, ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Popover is accessed via its reference and visibility is controlled using <i>toggle</i>, <i>show</i> and <i>hide</i> methods with an event of the target.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-button (click)="op.toggle($event)" icon="pi pi-share-alt" label="Share" />
                <p-popover #op>
                    <div class="flex flex-col gap-4 w-100">
                        <div>
                            <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2 text-sm">Share this document</span>
                            <p-inputgroup>
                                <input pInputText value="https://primeng.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-100" />
                                <p-inputgroup-addon>
                                    <i class="pi pi-copy"></i>
                                </p-inputgroup-addon>
                            </p-inputgroup>
                        </div>
                        <div>
                            <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2 text-sm">Invite Member</span>
                            <div class="flex">
                                <p-inputgroup>
                                    <input pInputText disabled />
                                    <button pButton>
                                        <span pButtonIcon class="pi pi-users"></span>
                                        <span pButtonLabel>Invite</span>
                                    </button>
                                </p-inputgroup>
                            </div>
                        </div>
                        <div>
                            <span class="font-medium text-surface-900 dark:text-surface-0 block mb-2 text-sm">Team Members</span>
                            <ul class="list-none p-0 m-0 flex flex-col gap-4">
                                @for (member of members; track member) {
                                    <li class="flex items-center gap-2">
                                        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                                        <div>
                                            <span class="font-medium text-sm">{{ member.name }}</span>
                                            <div class="text-xs text-muted-color">{{ member.email }}</div>
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
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {
    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];
}
