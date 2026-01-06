import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickListModule } from 'primeng/picklist';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [CommonModule, PickListModule, AppCode, AppDocSectionText],
    providers: [ProductService],
    template: `
        <app-docsectiontext>
            <p>For custom content support define an <i>item</i> template that gets the item instance as a parameter. In addition <i>sourceheader</i> and <i>targetheader</i> templates are provided for further customization.</p>
        </app-docsectiontext>
        <div class="card">
            <p-picklist [source]="sourceProducts" [target]="targetProducts" [dragdrop]="true" [responsive]="true" sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" breakpoint="1400px" scrollHeight="20rem">
                <ng-template let-option let-selected="selected" #item>
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img class="w-12 shrink-0 rounded" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ option.image }}" [alt]="option.name" />
                        <div class="flex-1 flex flex-col">
                            <span class="font-medium text-sm">{{ option.name }}</span>
                            <span
                                [ngClass]="{
                                    'text-surface-500': !selected,
                                    'dark:text-surface-400': !selected,
                                    'text-inherit': selected
                                }"
                                >{{ option.category }}</span
                            >
                        </div>
                        <span class="font-bold sm:ml-8">{{ '$' + option.price }}</span>
                    </div>
                </ng-template>
            </p-picklist>
        </div>
        <app-code [extFiles]="extFiles"></app-code>
    `
})
export class TemplateDoc {
    sourceProducts!: Product[];

    targetProducts!: Product[];
    extFiles = [
        {
            path: 'src/domain/product.ts',
            content: `
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}`
        }
    ];

    constructor(
        private carService: ProductService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts = products;
            this.cdr.markForCheck();
        });
        this.targetProducts = [];
    }
}
