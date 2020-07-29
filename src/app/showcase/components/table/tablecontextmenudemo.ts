import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    templateUrl: './tablecontextmenudemo.html',
    providers: [MessageService]
})
export class TableContextMenuDemo implements OnInit {

    products: Product[];

    selectedProduct: Product;

    items: MenuItem[];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewProduct(this.selectedProduct)},
                {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteProduct(this.selectedProduct)}
        ];
    }

    viewProduct(product: Product) {
        this.messageService.add({severity: 'info', summary: 'Product Selected', detail: product.name });
    }

    deleteProduct(product: Product) {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.messageService.add({severity: 'info', summary: 'Product Deleted', detail: product.name});
        this.selectedProduct = null;
    }

}
