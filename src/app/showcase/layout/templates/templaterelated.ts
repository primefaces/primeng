import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@alamote/primeng/api';

@Component({
    selector: 'template-related',
    template: `
        <div class="template-related-wrapper">
            <div class="template-related">
                <h2 class="template-related-title">Related Layouts</h2>
                <div class="template-related-slide">
                    <a *ngFor="let data of relatedData; let i = index" [routerLink]="data.href" class="template-related-slide-card">
                        <img [src]="data.src" [alt]="'Related Image ' + i" />
                    </a>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateRelated {
    @Input() relatedData: any[] = [];
}

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [TemplateRelated, SharedModule],
    declarations: [TemplateRelated]
})
export class TemplateRelatedModule {}
