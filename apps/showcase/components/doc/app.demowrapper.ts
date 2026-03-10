import { Component, computed, contentChild, inject, input, signal } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { AppCode } from './app.code';
import { DEMO_MODE, IN_DEMO_WRAPPER } from './demo-mode.token';

@Component({
    selector: 'app-demo-wrapper',
    standalone: true,
    imports: [TooltipModule],
    providers: [{ provide: IN_DEMO_WRAPPER, useValue: true }],
    template: `
        <div class="doc-section-demo">
            <div class="doc-section-demo-card">
                <div class="doc-section-demo-content">
                    <ng-content></ng-content>
                </div>
                <div class="doc-section-demo-toolbar">
                    @if (!isCollapsible()) {
                        <span class="doc-section-demo-name">{{ name() }}</span>
                    }
                    <div class="doc-section-demo-actions">
                        @if (isCollapsible()) {
                            <button class="doc-section-demo-action" [pTooltip]="codeVisible() ? 'Hide Code' : 'Show Code'" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip" (click)="toggleCodeVisibility()">
                                <i class="pi" [class.pi-code]="!codeVisible()" [class.pi-times]="codeVisible()"></i>
                            </button>
                        } @else {
                            <button class="doc-section-demo-action" [pTooltip]="appCode()?.fullCodeVisible() ? 'Collapse' : 'Expand'" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip" (click)="appCode()?.toggleCode()">
                                <i class="pi" [class.pi-arrow-up-right-and-arrow-down-left-from-center]="!appCode()?.fullCodeVisible()" [class.pi-arrow-down-left-and-arrow-up-right-to-center]="appCode()?.fullCodeVisible()"></i>
                            </button>
                        }
                        <button class="doc-section-demo-action" pTooltip="Edit in StackBlitz" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip" (click)="appCode()?.openStackBlitz()">
                            <i class="pi pi-bolt"></i>
                        </button>
                        <button class="doc-section-demo-action" [pTooltip]="copied() ? 'Copied!' : 'Copy Code'" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip" (click)="copyCode()">
                            <i class="pi" [class.pi-clone]="!copied()" [class.pi-check]="copied()"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="doc-section-demo-code" [style.display]="isCollapsible() && !codeVisible() ? 'none' : ''">
                <ng-content select="app-code"></ng-content>
            </div>
        </div>
    `
})
export class AppDemoWrapper {
    name = input<string>('');

    private demoMode = inject(DEMO_MODE, { optional: true });

    isCollapsible = computed(() => this.demoMode === 'collapsible');

    codeVisible = signal(false);

    copied = signal(false);

    appCode = contentChild(AppCode);

    toggleCodeVisibility() {
        this.codeVisible.update((v) => !v);
    }

    async copyCode() {
        await this.appCode()?.copyCode();
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
    }
}
