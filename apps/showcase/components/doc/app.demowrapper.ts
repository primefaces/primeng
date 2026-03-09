import { Component, computed, contentChild, inject, input, signal } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { AppCode } from './app.code';
import { DEMO_MODE } from './demo-mode.token';

@Component({
    selector: 'app-demo-wrapper',
    standalone: true,
    imports: [TooltipModule],
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
                                <i class="pi pi-arrows-v"></i>
                            </button>
                        }
                        <button class="doc-section-demo-action" pTooltip="Edit in StackBlitz" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip" (click)="appCode()?.openStackBlitz()">
                            <svg role="img" width="13" height="18" viewBox="0 0 13 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 10.6533H5.43896L2.26866 18.1733L12.6667 7.463H7.1986L10.3399 0L0 10.6533Z" />
                            </svg>
                        </button>
                        <button class="doc-section-demo-action" pTooltip="Copy Code" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip" (click)="appCode()?.copyCode()">
                            <i class="pi pi-copy"></i>
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

    appCode = contentChild(AppCode);

    toggleCodeVisibility() {
        this.codeVisible.update((v) => !v);
    }
}
