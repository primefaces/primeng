import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'template-related',
    standalone: true,
    imports: [RouterModule],
    template: `
        <div class="template-related-wrapper">
            <div class="template-related">
                <h2 class="template-related-title">Related Layouts</h2>
                <div class="template-related-slide">
                    @for (data of relatedData; track $index; let i = $index) {
                        <a [routerLink]="data.href" class="template-related-slide-card">
                            <img [src]="data.src" [alt]="'Related Image ' + i" />
                        </a>
                    }
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
