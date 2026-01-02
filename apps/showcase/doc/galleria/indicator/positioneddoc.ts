import { PhotoService } from '@/service/photoservice';
import { Component, OnInit, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'positioned-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, GalleriaModule, RadioButtonModule, CheckboxModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Indicators can be placed at four different sides using the <i>indicatorsPosition</i> property. In addition, enabling <i>showIndicatorsOnItem</i> moves the indicators inside the image section. <i>indicatorsPosition</i> set to
                <i>bottom</i> by default, accepted values are <i>top</i>, <i>left</i>, <i>right</i>, and <i>bottom</i>.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-4 mb-8">
                <div *ngFor="let option of positionOptions" class="flex items-center">
                    <p-radiobutton [name]="option.label" [value]="option.value" [label]="option.label" [(ngModel)]="position" [inputId]="option.label" />
                    <label [for]="option.label" class="ml-2"> {{ option.label }} </label>
                </div>
            </div>
            <div class="flex items-center mb-8">
                <p-checkbox [(ngModel)]="showIndicatorsOnItem" [binary]="true" inputId="inside_cbox" />
                <label for="inside_cbox" class="ml-2"> Inside </label>
            </div>
            <p-galleria [(value)]="images" [indicatorsPosition]="position" [showIndicators]="true" [showThumbnails]="false" [showIndicatorsOnItem]="showIndicatorsOnItem" [containerStyle]="{ 'max-width': '640px', 'margin-top': '2em' }">
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code selector="galleria-indicator-positioned-demo"></app-code>
    `
})
export class PositionedDoc implements OnInit {
    images = model([]);

    position: 'left' | 'right' | 'top' | 'bottom' = 'bottom';

    showIndicatorsOnItem: boolean = false;

    positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }
}
