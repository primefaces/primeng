import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'prime-icons-constants-demo',
    template: `
        <app-docsectiontext>
            <p>Constants API is available to reference icons easily when used programmatically.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-menu [model]="items"></p-menu>
        </div>
        <app-code [code]="code" selector="prime-icons-constants-demo" [hideToggleCode]="true"></app-code>
    `
})
export class ConstantsDoc {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: PrimeIcons.PLUS
            },
            {
                label: 'Delete',
                icon: PrimeIcons.TRASH
            }
        ];
    }

    code: Code = {
        typescript: `
import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
        
@Component({
    selector: 'prime-icons-constants-demo',
    templateUrl: './prime-icons-constants-demo.html'
})
export class PrimeIconsConstantsDemo {
    items: MenuItem[];

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
}`
    };
}
