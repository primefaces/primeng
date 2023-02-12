import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { IconService } from '../../service/iconservice';

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit, OnDestroy {
    private destroy$: Subject<any> = new Subject<any>();
    icons: any[];

    filteredIcons: any[];

    selectedIcon: any;

    constructor(private iconService: IconService) {}

    ngOnInit() {
        this.iconService.getIcons().pipe(takeUntil(this.destroy$)).subscribe((data) => {
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

    @HostListener('unloaded')
    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
