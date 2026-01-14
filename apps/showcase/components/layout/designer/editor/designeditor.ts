import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { DesignBorderRadius } from './primitive/designborderradius';
import { DesignColors } from './primitive/designcolors';
import { DesignSemantic } from './semantic/designsemantic';
import { DesignerService } from '@/service/designerservice';
import { DesignCustomTokens } from './custom/designcustomtokens';
import { DesignSettings } from './settings/designsettings';
import { NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DesignComponent } from './component/designcomponent';
import { Subscription } from 'rxjs';

@Component({
    selector: 'design-editor',
    standalone: true,
    imports: [CommonModule, TabsModule, FormsModule, DesignBorderRadius, DesignComponent, DesignColors, DesignSemantic, DesignCustomTokens, DesignSettings],
    template: ` <p-tabs [(value)]="activeTab" [lazy]="true">
        <p-tablist>
            <p-tab [value]="0"> Primitive </p-tab>
            <p-tab [value]="1"> Semantic </p-tab>
            <p-tab [value]="2" [disabled]="!isComponentRoute()">Component</p-tab>
            <p-tab [value]="3">Custom</p-tab>
            <p-tab [value]="4" class="!ml-auto">Settings</p-tab>
        </p-tablist>
        <p-tabpanels>
            <p-tabpanel [value]="0">
                <div>
                    <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                        <design-border-radius />
                        <design-colors />
                    </form>
                </div>
            </p-tabpanel>

            <p-tabpanel [value]="1">
                <design-semantic />
            </p-tabpanel>

            <p-tabpanel [value]="2">
                <form *ngIf="isComponentRoute()" (keydown)="onKeyDown($event)">
                    <design-component />
                </form>
            </p-tabpanel>

            <p-tabpanel [value]="3">
                <design-custom-tokens />
            </p-tabpanel>

            <p-tabpanel [value]="4">
                <design-settings />
            </p-tabpanel>
        </p-tabpanels>
    </p-tabs>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignEditor implements OnInit, OnDestroy {
    designerService = inject(DesignerService);

    router = inject(Router);

    get activeTab() {
        return this.designerService.designer().activeTab;
    }

    set activeTab(value: number) {
        this.designerService.designer.update((prev) => ({ ...prev, activeTab: value }));
    }

    isComponentRoute = computed(() => this.designerService.designer().theme.preset?.components[this.currentPath()] !== undefined);

    currentPath = signal<string>('');

    routeSubscription!: Subscription;

    constructor() {
        this.routeSubscription = this.router.events.subscribe((event: NavigationEnd) => {
            if (event.url) {
                const url = event.url.split('/')[1] === 'table' ? 'datatable' : event.url.split('/')[1];
                this.currentPath.set(url);
            }
        });
    }

    ngOnInit() {
        if (!this.currentPath()) {
            const url = this.router.routerState.snapshot.url.split('/')[1] === 'table' ? 'datatable' : this.router.routerState.snapshot.url.split('/')[1];
            this.currentPath.set(url);
        }
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    onKeyDown(event: any) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.designerService.applyTheme(this.designerService.designer().theme);
            event.preventDefault();
        }
    }
}
