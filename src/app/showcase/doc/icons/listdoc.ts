import { ChangeDetectorRef, Component } from '@angular/core';
import { IconService } from '../../service/iconservice';

@Component({
    selector: 'list-doc',
    template: `
        <app-docsectiontext>
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
    `
})
export class ListDoc {
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
        let sanitizedInput = searchText?.replace(/[^\w\s]/gi, '').replace(/\s/g, '');
        const filteredIcons = [];

        if (!searchText) {
            this.filteredIcons = this.icons;
        } else {
            this.filteredIcons = this.icons.filter((icon) => {
                return (
                    icon.icon.tags.some((tag) =>
                        tag
                            .replace(/[^\w\s]/gi, '')
                            .replace(/\s/g, '')
                            .includes(sanitizedInput.toLowerCase())
                    ) ||
                    icon.properties.name
                        .replace(/[^\w\s]/gi, '')
                        .replace(/\s/g, '')
                        .toLowerCase()
                        .includes(sanitizedInput.toLowerCase())
                );
            });
            // this.icons.forEach((icon) => {
            //     if (icon.icon.tags.some((tag) => tag.includes(searchText.toLowerCase()))) {
            //         filteredIcons.push(icon);
            //     }
            //     if (icon.properties.name.toLowerCase().includes(searchText.toLowerCase())) {
            //         filteredIcons.push(icon);
            //     }
            // });

            // this.filteredIcons = [...filteredIcons];
        }
    }
}
