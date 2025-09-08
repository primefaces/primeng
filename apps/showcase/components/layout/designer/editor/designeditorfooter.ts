import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DesignerService } from '@/service/designerservice';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'design-editor-footer',
    imports: [CommonModule],
    template: `<div class="flex justify-end gap-2">
        <button type="button" (click)="download()" class="btn-design-outlined">Download</button>
        <button type="button" (click)="apply()" class="btn-design">Apply</button>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignEditorFooter {
    designerService: DesignerService = inject(DesignerService);

    async download() {
        const { theme } = this.designerService.designer();
        await this.designerService.downloadTheme({ t_key: theme.key, t_name: theme.name });
    }

    async apply() {
        await this.designerService.applyTheme(this.designerService.designer().theme);
    }
}
