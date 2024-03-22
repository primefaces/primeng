import { Component } from '@angular/core';

@Component({
    selector: 'app-developmentsection',
    template: ` <div class="flex align-items-center line-height-3 bg-primary-600 text-white p-3 text-lg border-round mb-3">
            <i class="pi pi-info-circle text-lg text-white mr-2"></i>
            Accessibility guide documents the specification of this component based on WCAG guidelines, the implementation is in progress.
        </div>
        <ng-content></ng-content>`
})
export class AppDevelopmentSection {}
