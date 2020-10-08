import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <div class="layout-footer-left">
                <span>PrimeNG 10.0.4 by </span>
                <a href="https://www.primetek.com.tr">PrimeTek</a>
            </div>

            <div class="layout-footer-right">
                <a href="https://github.com/primefaces/primeng" class="p-mr-3">
                    <i class="pi pi-github"></i>
                </a>
                <a href="https://twitter.com/prime_ng">
                    <i class="pi pi-twitter"></i>
                </a>
            </div>
        </div>
    `
})
export class AppFooterComponent {
}