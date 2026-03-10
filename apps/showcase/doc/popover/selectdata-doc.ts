import { Component, ViewChild } from '@angular/core';
import { Popover, PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'selectdata-doc',
    standalone: true,
    imports: [PopoverModule, ButtonModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>In this sample, data is retrieved from the content inside the popover.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-button type="button" [label]="selectedMember ? selectedMember.name : 'Select Member'" (onClick)="toggle($event)" styleClass="min-w-48" />

                <p-popover #op>
                    <div class="flex flex-col gap-4">
                        <div>
                            <span class="font-medium block mb-2 text-sm">Team Members</span>
                            <ul class="list-none p-0 m-0 flex flex-col">
                                @for (member of members; track member.name) {
                                    <li class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" (click)="selectMember(member)">
                                        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                                        <div>
                                            <span class="font-medium text-sm">{{ member.name }}</span>
                                            <div class="text-xs text-surface-500 dark:text-surface-400">{{ member.email }}</div>
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
export class SelectDataDoc {
    @ViewChild('op') op!: Popover;

    selectedMember = null;

    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];

    toggle(event) {
        this.op.toggle(event);
    }

    selectMember(member) {
        this.selectedMember = member;
        this.op.hide();
    }
}
