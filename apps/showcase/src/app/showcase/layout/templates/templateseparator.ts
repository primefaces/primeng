import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'template-separator',
    template: `
        <div class="flex items-center w-full gap-6">
            <p-divider class="flex-1" />
            <div class="w-12 h-12 overflow-hidden flex items-center justify-center border border-surface rounded-full bg-surface-0 dark:bg-surface-900">
                <ng-content></ng-content>
            </div>
            <p-divider class="flex-1" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateSeparator {}

@NgModule({
    imports: [CommonModule, SharedModule, DividerModule],
    exports: [TemplateSeparator, SharedModule],
    declarations: [TemplateSeparator]
})
export class TemplateSeparatorModule {}
