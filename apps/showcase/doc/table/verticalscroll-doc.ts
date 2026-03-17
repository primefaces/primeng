import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'vertical-scroll-doc',
    standalone: true,
    imports: [TableModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>Adding <i>scrollable</i> property along with a <i>scrollHeight</i> for the data viewport enables vertical scrolling with fixed headers.</p></app-docsectiontext
        >
        <app-demo-wrapper>
            <p-deferred-demo (load)="loadDemoData()">
                <p-table [value]="customers" [scrollable]="true" scrollHeight="400px" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Company</th>
                            <th>Representative</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-customer let-index="index">
                        <tr>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.country.name }}</td>
                            <td>{{ customer.company }}</td>
                            <td>{{ customer.representative.name }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </p-deferred-demo>
            <app-code [extFiles]="['Customer']"></app-code>
        </app-demo-wrapper>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalScrollDoc {
    customers!: Customer[];

    constructor(
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
            this.cd.markForCheck();
        });
    }
}
