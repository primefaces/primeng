import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '@alamote/primeng/api';

@Component({
    selector: 'template-separator',
    template: `
        <div class="template-separator">
            <span className="template-separator-icon">
                <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.3576 34.2499L19.6471 28.2974L17.2754 34.2499H22.3576Z" fill="var(--surface-900)" />
                    <path d="M27.8454 28.2974L30.5559 34.2499H25.4736L27.8454 28.2974Z" fill="var(--surface-900)" />
                    <path d="M24.0043 10.25L12.001 34.187H16.0501L24.0048 17.1962L31.7995 34.187H36.009L24.0043 10.25Z" fill="var(--surface-900)" /></svg
            ></span>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateSeparator {}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [TemplateSeparator, SharedModule],
    declarations: [TemplateSeparator]
})
export class TemplateSeparatorModule {}
