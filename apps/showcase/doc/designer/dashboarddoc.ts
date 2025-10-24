import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'dashboard-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText],
    template: `<app-docsectiontext>
            <p>
                Dashboard is the entry point of the designer. The license key can be configured at this view before getting started with the full set of features. In the <b>My Themes</b> section, you're able to create a theme, and manage existing
                themes. A theme can be renamed, duplicated and downloaded using the <i class="pi pi-ellipsis-h !text-sm"></i> button.
            </p>
        </app-docsectiontext>
        <div class="px-8 pt-8 bg-surface-0 dark:bg-surface-900 rounded-2xl border border-surface" style="max-width: 48rem">
            <img alt="Designer Dashboard" src="https://primefaces.org/cdn/designer/guide-dashboard.png" class="w-full" />
        </div>`
})
export class DashboardDoc {}
