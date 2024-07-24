import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>TabMenu requires a collection of menuitems as its model.</p>
        </app-docsectiontext>
        <div class="card">
        <p-tabMenu [scrollable]="true" [model]="items" [activeItem]="activeItem"></p-tabMenu>
        </div>
        <app-code [code]="code" selector="tab-menu-basic-demo"></app-code>
    `
})
export class BasicDoc implements OnInit {
    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    constructor(private cd:ChangeDetectorRef){
        
    }

    ngOnInit() {
      this.items = Array.from({ length: 50 }, (_, i) => ({
        label: `Tab ${i + 1}`,
      }));
  
      setTimeout((_) => {
        this.activeItem = this.items[40];
        this.cd.markForCheck()
      }, 2000);
    }

    code: Code = {
        basic: `<p-tabMenu [model]="items" />`,

        html: `<div class="card">
    <p-tabMenu [model]="items" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
    selector: 'tab-menu-basic-demo',
    templateUrl: './tab-menu-basic-demo.html',
    standalone: true,
    imports: [TabMenuModule]
})
export class TabMenuBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Dashboard', icon: 'pi pi-home' },
            { label: 'Transactions', icon: 'pi pi-chart-line' },
            { label: 'Products', icon: 'pi pi-list' },
            { label: 'Messages', icon: 'pi pi-inbox' }
        ]
    }
}`
    };
}
