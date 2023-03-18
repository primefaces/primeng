import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';
import { MenuItem } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'prime-icons-constants-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Constants API is available to reference icons easily when used programmatically.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-menu [model]="items"></p-menu>
        </div>
        <app-code [code]="code" selector="prime-icons-constants-demo"></app-code>
    </div>`
})
export class ConstantsDoc {
    @Input() id: string;

    @Input() title: string;
    
    items!: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: PrimeIcons.PLUS,
            },
            {
                label: 'Delete',
                icon: PrimeIcons.TRASH
            }
        ];
    }

    code: Code = {
        basic: `
<p-menu [model]="items"></p-menu>`,
        html: `
<div class="card flex justify-content-center">
    <p-menu [model]="items"></p-menu>
</div>`,
        typescript: `
import { Component } from '@angular/core';
        
@Component({
    selector: 'prime-icons-constants-demo',
    templateUrl: './prime-icons-constants-demo.html'
})
export class PrimeIconsConstantsDemo {
    items!: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: PrimeIcons.PLUS,
            },
            {
                label: 'Delete',
                icon: PrimeIcons.TRASH
            }
        ];
    }
}`,
    };
}
