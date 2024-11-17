import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'tabmenu-doc',
    template: `
        <app-docsectiontext>
            <p>
                A navigation menu is implemented using tabs without the panels where the content of a tab is provided by a route component like
                <a href="https://angular.dev/api/router/RouterOutlet?tab=description" target="_blank" rel="noopener noreferrer">router-outlet</a>. For the purpose of this demo, <i>router-outlet</i> is not included.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs value="dashboard">
                <p-tablist>
                    @for (tab of tabs; track tab.route) {
                        <p-tab [value]="tab.route" [routerLink]="tab.route">
                            <i [class]="tab.icon"></i>
                            <span>{{ tab.label }}</span>
                        </p-tab>
                    }
                </p-tablist>
            </p-tabs>
            <!--<router-outlet></router-outlet>-->
        </div>
        <app-code [code]="code" selector="tabs-tabmenu-demo"></app-code>
    `
})
export class TabmenuDoc {
    tabs = [
        { route: 'dashboard', label: 'Dashboard', icon: 'pi pi-home' },
        { route: 'transactions', label: 'Transactions', icon: 'pi pi-chart-line' },
        { route: 'products', label: 'Products', icon: 'pi pi-list' },
        { route: 'messages', label: 'Messages', icon: 'pi pi-inbox' }
    ];

    code: Code = {
        basic: `<p-tabs value="/dashboard">
    <p-tablist>
        @for(tab of tabs; track tab.route){
            <p-tab [value]="tab.route" [routerLink]="tab.route">
                <i [class]="tab.icon"></i>
                <span>{{ tab.label }}</span>
            </p-tab>
        }
    </p-tablist>
</p-tabs>
<!--<router-outlet></router-outlet>-->`,

        html: `<div class="card">
    <p-tabs value="/dashboard">
        <p-tablist>
            @for(tab of tabs; track tab.route){
                <p-tab [value]="tab.route" [routerLink]="tab.route">
                    <i [class]="tab.icon"></i>
                    <span>{{ tab.label }}</span>
                </p-tab>
            }
        </p-tablist>
    </p-tabs>
    <!--<router-outlet></router-outlet>-->
</div>`,

        typescript: `import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'tabs-tabmenu-demo',
    templateUrl: './tabs-tabmenu-demo.html',
    standalone: true,
    imports: [TabsModule, RouterModule, CommonModule]
})
export class TabsTabmenuDemo {}`
    };
}
