import { Component } from '@angular/core';
import { default as IconData } from 'src/assets/showcase/data/icons.json';

@Component({
    selector: 'list-doc',
    template: `
        <app-docsectiontext>
            <p>Here is the full list of PrimeIcons. More icons will be added periodically and you may also <a href="https://github.com/primefaces/primeicons/issues">request new icons</a> at the issue tracker.</p>
        </app-docsectiontext>
        <div>
            <input class="p-inputtext p-component w-full p-4 mt-4 mb-6" (input)="onFilter($event)" pInputText placeholder="Search an icon" />
        </div>
        <div class="card">
            <div class="grid grid-cols-12 gap-4 text-center">
                <div class="col-span-12 md:col-span-2 mb-8" *ngFor="let icon of filteredIcons">
                    <i class="pi pi-{{ icon.properties.name }} text-2xl mb-4 text-muted-color"></i>
                    <div>pi-{{ icon.properties.name }}</div>
                </div>
            </div>
        </div>
    `
})
export class ListDoc {
    icons: any;

    filteredIcons: any[];

    selectedIcon: any;

    ngOnInit() {
        this.icons = IconData.icons.sort((icon1, icon2) => {
            if (icon1.properties.name < icon2.properties.name) return -1;
            else if (icon1.properties.name < icon2.properties.name) return 1;
            else return 0;
        });
        this.filteredIcons = IconData.icons;
    }

    onFilter(event: KeyboardEvent): void {
        let searchText = (<HTMLInputElement>event.target).value;
        let sanitizedInput = searchText?.replace(/[^\w\s]/gi, '').replace(/\s/g, '');

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
        }
    }
}
