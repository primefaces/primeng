import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
    templateUrl: './tabmenudemo.html'
})
export class TabMenuDemo {
    
    items1: MenuItem[];

    items2: MenuItem[];

    items3: MenuItem[];

    activeItem: MenuItem;

    ngOnInit() {
        this.items1 = [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
            {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
            {label: 'Documentation', icon: 'pi pi-fw pi-file'},
            {label: 'Settings', icon: 'pi pi-fw pi-cog'}
        ];

        this.items2 = [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
            {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
            {label: 'Documentation', icon: 'pi pi-fw pi-file'},
            {label: 'Settings', icon: 'pi pi-fw pi-cog'}
        ];
        
        this.items3 = [
            {label: 'Info', icon: 'pi pi-fw pi-chart-bar', routerLink:'info'},
            {label: 'Message', icon: 'pi pi-fw pi-calendar', routerLink:'message'}
        ];

        this.activeItem = this.items2[0];
    }

    closeItem(event, index) {
        this.items2 = this.items2.filter((item, i) => i !== index);
        event.preventDefault();
    }
}

@Component({
    selector: 'app-info',
    template: `
    <div class="p-grid p-fluid" style="text-align: center;">
        <div class="p-col-12 p-md-4">
        </div>
        <div class="p-col-12 p-md-4">
            <img src="assets/showcase/images/demo/tabmenu/avicii.jpeg" style="max-height: 200px">
            <h3>Avicii</h3>
        </div>
    </div>
    <div class="p-grid p-fluid p-justify-center" style="text-align: center;">
        <div class="p-col-12 p-md-3">
            <label>Stage Name</label>
            <p>Avicii</p>
        </div>
        <div class="p-col-12 p-md-3">
            <label>Genre</label>
            <p>Progressive House</p>
        </div>
        <div class="p-col-12 p-md-3">
            <label>Label</label>
            <p>LE7ELS</p>
        </div>
    </div>
    <div class="p-grid p-fluid p-justify-center" style="text-align: center;">
        <div class="p-col-12 p-md-3">
            <label>Real Name</label>
            <p>Tim Berling</p>
        </div>
        <div class="p-col-12 p-md-3">
            <label>Birth Day</label>
            <p>09/08/1989</p>
        </div>
        <div class="p-col-12 p-md-3">
            <label>Death Day</label>
            <p>04/20/2018</p>
        </div>
    </div>
    `
})
export class InfoComponent {
    ngOnInit() {
    }
}

@Component({
    selector: 'app-message',
    template: `
    <h3>Inline Message CSS</h3>
    <p>p-message component is used to display inline messages mostly within forms.</p>
    <p-message severity="info" text="PrimeNG Rocks"></p-message>
    `
})
export class MessageComponent {
}