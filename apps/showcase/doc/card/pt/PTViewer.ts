import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'card-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, CardModule, ButtonModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-card [style]="{ width: '25rem' }">
                <ng-template #title>Advanced Card</ng-template>
                <ng-template #subtitle>Card subtitle</ng-template>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
                <ng-template #footer>
                    <div class="flex gap-4 mt-1">
                        <p-button label="Cancel" severity="secondary" [outlined]="true" class="w-full" />
                        <p-button label="Save" class="w-full" />
                    </div>
                </ng-template>
            </p-card>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Card'),
            key: 'Card'
        }
    ];
}
