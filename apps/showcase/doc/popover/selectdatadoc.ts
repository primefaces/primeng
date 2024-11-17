import { Code } from '@/domain/code';
import { Component, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>In this sample, data is retrieved from the content inside the popover.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button type="button" [label]="selectedMember ? selectedMember.name : 'Select Member'" (onClick)="toggle($event)" styleClass="min-w-48" />

            <p-popover #op>
                <div class="flex flex-col gap-4">
                    <div>
                        <span class="font-medium block mb-2">Team Members</span>
                        <ul class="list-none p-0 m-0 flex flex-col">
                            <li *ngFor="let member of members" class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" (click)="selectMember(member)">
                                <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                                <div>
                                    <span class="font-medium">{{ member.name }}</span>
                                    <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div>
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

    code: Code = {
        basic: `<p-button type="button" [label]="selectedMember ? selectedMember.name : 'Select Member'" (onClick)="toggle($event)" styleClass="min-w-48" />

<p-popover #op>
    <div class="flex flex-col gap-4">
        <div>
            <span class="font-medium block mb-2">Team Members</span>
            <ul class="list-none p-0 m-0 flex flex-col">
                <li *ngFor="let member of members" class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" (click)="selectMember(member)">
                    <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                    <div>
                        <span class="font-medium">{{ member.name }}</span>
                        <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</p-popover>`,

        html: `<div class="card flex justify-center">
    <p-button type="button" [label]="selectedMember ? selectedMember.name : 'Select Member'" (onClick)="toggle($event)" styleClass="min-w-48" />

    <p-popover #op>
        <div class="flex flex-col gap-4">
            <div>
                <span class="font-medium block mb-2">Team Members</span>
                <ul class="list-none p-0 m-0 flex flex-col">
                    <li *ngFor="let member of members" class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" (click)="selectMember(member)">
                        <img [src]="'https://primefaces.org/cdn/primeng/images/demo/avatar/' + member.image" style="width: 32px" />
                        <div>
                            <span class="font-medium">{{ member.name }}</span>
                            <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </p-popover>
</div>`,

        typescript: `import { Component, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'popover-basic-demo',
    templateUrl: './popover-basic-demo.html',
    standalone: true,
    imports: [PopoverModule, ButtonModule, CommonModule]
})
export class PopoverBasicDemo {
   @ViewChild('op') op!: Popover;

    selectedMember = null;

    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' },
    ];

    toggle(event) {
        this.op.toggle(event);
    }

    selectMember(member) {
        this.selectedMember = member;
        this.op.hide();
    }
}`
    };
}
