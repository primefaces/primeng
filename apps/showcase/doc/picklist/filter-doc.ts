import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PickListModule } from 'primeng/picklist';

@Component({
    selector: 'filter-doc',
    standalone: true,
    imports: [CommonModule, PickListModule, AppCode, AppDemoWrapper, AppDocSectionText],
    providers: [ProductService],
    template: `
        <app-docsectiontext>
            <p>Filter value is checked against the property of an object configured with the <i>filterBy</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-picklist
                [source]="sourceProducts()"
                [target]="targetProducts()"
                [dragdrop]="true"
                [responsive]="true"
                filterBy="name"
                sourceFilterPlaceholder="Search by name"
                targetFilterPlaceholder="Search by name"
                breakpoint="1400px"
                scrollHeight="20rem"
            >
                <ng-template let-option let-selected="selected" #option>
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
            <app-code [extFiles]="['Product']"></app-code>
        </app-demo-wrapper>
    `
})
export class FilterDoc implements OnInit {
    private carService = inject(ProductService);

    sourceProducts = signal<Product[]>([]);

    targetProducts = signal<Product[]>([]);

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts.set(products);
        });
    }
}
