import { Component } from '@angular/core';

@Component({
    selector: 'app-developmentsection',
    template: ` <div class="flex items-center leading-normal bg-primary-600 text-white p-4 text-lg rounded-border mb-4">
            <i class="pi pi-info-circle text-lg text-white mr-2"></i>
            Accessibility guide documents the specification of this component based on WCAG guidelines, the implementation is in progress.
        </div>
        <ng-content></ng-content>`
})
export class AppDevelopmentSection {}
