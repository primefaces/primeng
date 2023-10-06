import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { IconService } from '../../service/iconservice';

@Component({
    selector: 'list-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Here is the full list of PrimeIcons. More icons will be added periodically and you may also <a href="https://github.com/primefaces/primeicons/issues">request new icons</a> at the issue tracker.</p>
        </app-docsectiontext>
        <div>
            <input class="p-inputtext p-component w-full p-3 mt-3 mb-4" (input)="onFilter($event)" pInputText placeholder="Search an icon" />
        </div>
        <div class="card">
            <div class="grid text-center">
                <div class="col-12 md:col-2 mb-5" *ngFor="let icon of filteredIcons">
                    <i class="pi pi-{{ icon.properties.name }} text-2xl mb-3 text-color-secondary"></i>
                    <div>pi-{{ icon.properties.name }}</div>
                </div>
            </div>
        </div>
    </section>`
})
export class ListDoc {
    @Input() id: string;

    @Input() title: string;

    icons: any[];

    filteredIcons: any[];

    selectedIcon: any;

    constructor(private iconService: IconService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.iconService.getIcons().subscribe((data) => {
            data = data.filter((value) => {
                return value.icon.tags.indexOf('deprecate') === -1;
            });

            let icons = data;
            icons.sort((icon1, icon2) => {
                if (icon1.properties.name < icon2.properties.name) return -1;
                else if (icon1.properties.name < icon2.properties.name) return 1;
                else return 0;
            });

            this.icons = icons;
            this.filteredIcons = data;
            this.cd.markForCheck();
        });
    }

    onFilter(event: KeyboardEvent): void {
        let searchText = (<HTMLInputElement>event.target).value;

        if (!searchText) {
            this.filteredIcons = this.icons;
        } else {
            this.filteredIcons = this.icons.filter((it) => {
                return it.icon.tags[0].includes(searchText);
            });
        }
    }
}
