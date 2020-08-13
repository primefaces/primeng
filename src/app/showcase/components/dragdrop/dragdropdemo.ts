import { Component } from '@angular/core';
import { ProductService } from '../../service/productservice';
import { Product } from '../../domain/product';

@Component({
    templateUrl: './dragdropdemo.html',
    styleUrls: ['./dragdropdemo.scss']
})
export class DragDropDemo {
    
    availableProducts: Product[];
    
    selectedProducts: Product[];
    
    draggedProduct: Product;
    
    constructor(private productService: ProductService) { }
    
    ngOnInit() {
        this.selectedProducts = [];
        this.productService.getProductsSmall().then(products => this.availableProducts = products);
    }
    
    dragStart(product: Product) {
        this.draggedProduct = product;
    }
    
    drop() {
        if (this.draggedProduct) {
            let draggedProductIndex = this.findIndex(this.draggedProduct);
            this.selectedProducts = [...this.selectedProducts, this.draggedProduct];
            this.availableProducts = this.availableProducts.filter((val,i) => i!=draggedProductIndex);
            this.draggedProduct = null;
        }
    }
    
    dragEnd() {
        this.draggedProduct = null;
    }
    
    findIndex(product: Product) {
        let index = -1;
        for(let i = 0; i < this.availableProducts.length; i++) {
            if (product.id === this.availableProducts[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }

}