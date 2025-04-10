import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule } from '@angular/common';
import { DesignerService } from '@/service/designerservice';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DesignComponentSection } from '@/components/layout/designer/editor/component/designcomponentsection';
import { AppConfigService } from '@/service/appconfigservice';

@Component({
    selector: 'design-component',
    standalone: true,
    imports: [CommonModule, FieldsetModule, TabsModule, DesignComponentSection],
    template: `<section class="flex flex-col gap-3">
        <div class="text-lg font-semibold capitalize mb-2">{{ componentKey() }}</div>
        <p-fieldset legend="Common" [toggleable]="true">
            <div class="flex flex-col gap-3">
                @if (hasCommonTokens()) {
                    @for (entry of objectKeys(this.tokens()); track entry) {
                        @if (entry !== 'colorScheme' && entry !== 'css') {
                            <design-component-section [componentKey]="componentKey()" [path]="entry" />
                        }
                    }
                } @else {
                    <span class="block py-3">There are no design tokens</span>
                }
            </div>
        </p-fieldset>
        <p-fieldset legend="Color Scheme" [toggleable]="true">
            @if (hasColorScheme()) {
                <p-tabs value="cs-0" (valueChange)="tabValueChange($event)">
                    <p-tablist>
                        <p-tab value="cs-0">Light</p-tab>
                        <p-tab value="cs-1">Dark</p-tab>
                    </p-tablist>
                    <p-tabpanels>
                        <p-tabpanel value="cs-0">
                            <div class="flex flex-col gap-3">
                                @for (entry of objectKeys(lightTokens()); track entry) {
                                    <design-component-section [componentKey]="componentKey()" [path]="'colorScheme.light.' + entry" />
                                }
                            </div>
                        </p-tabpanel>
                        <p-tabpanel value="cs-1">
                            <div class="flex flex-col gap-3">
                                @for (entry of objectKeys(darkTokens()); track entry) {
                                    <design-component-section [componentKey]="componentKey()" [path]="'colorScheme.dark.' + entry" />
                                }
                            </div>
                        </p-tabpanel>
                    </p-tabpanels>
                </p-tabs>
            } @else {
                <span class="block py-3">There are no design tokens defined per color scheme.</span>
            }
        </p-fieldset>
    </section>`
})
export class DesignComponent implements OnInit {
    objectKeys = Object.keys;

    configService: AppConfigService = inject(AppConfigService);

    designerService: DesignerService = inject(DesignerService);

    router: Router = inject(Router);

    tokens = computed(() => this.designerService.designer().theme.preset.components[this.componentKey()]);

    componentKey = signal<string>('');

    lightTokens = computed(() => {
        const designer = this.designerService.designer();
        return designer.theme.preset.components[this.componentKey()].colorScheme?.light;
    });

    darkTokens = computed(() => this.tokens().colorScheme?.dark);

    hasColorScheme = computed(() => this.tokens().colorScheme !== undefined);

    hasCommonTokens = computed(
        () =>
            Object.keys(this.tokens()).filter((name: string) => {
                return name !== 'colorScheme' && name !== 'css';
            }).length > 0
    );

    routeSubscription!: Subscription;

    constructor() {
        this.routeSubscription = this.router.events.subscribe((event: NavigationEnd) => {
            const url = event.url;
            if (url) {
                this.componentKey.set(url.split('/')[1]);
            }
        });
    }

    ngOnInit() {
        if (!this.componentKey()) {
            this.componentKey.set(this.router.routerState.snapshot.url.split('/')[1]);
        }
    }

    tabValueChange(event: string) {
        if (event === 'cs-1') {
            this.configService.appState.update((state) => ({ ...state, darkTheme: true }));
        }
        if (event === 'cs-0') {
            this.configService.appState.update((state) => ({ ...state, darkTheme: false }));
        }
    }
}
