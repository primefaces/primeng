import {Component} from '@angular/core';
import { IconService } from '../../service/iconservice';

@Component({
    templateUrl: './icons.component.html',
    styles: [`
        .icons-list {
            text-align: center;
        }

        .icons-list i {
            font-size: 2em;
        }

        .icons-list .ui-md-2 {
            padding-bottom: 2em;
        }
    `]
})
export class IconsComponent {

	icons: any [];
	filteredIcons: any [];
	selectedIcon: any;
	searchText:any;
	constructor(private iconService: IconService) {}

	getIcons() {
		this.iconService.getIcons().subscribe((data: any) => {
			this.icons = data;
			this.filteredIcons = data;
		});
	}

	getIcon(id) {
		this.selectedIcon = this.iconService.getIcon(id);
    }
    
    onFilter(event): void {
        this.searchText = event.target.value;
        if( !this.icons) 
			this.filteredIcons = [];
		if (!this.searchText) 
			this.filteredIcons = this.icons
		this.searchText = this.searchText;
	    this.filteredIcons =this.icons.filter( it => {
			return it.icon.tags[0].includes(this.searchText);
		});
    }

	unselectIcon() {
		this.selectedIcon=null;
	}

	ngOnInit() {
		this.getIcons();
	}
}