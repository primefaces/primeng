import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animation', [
        state('hidden', style({
            height: '0',
            overflow: 'hidden',
            maxHeight: '0',
            paddingTop: '0',
            paddingBottom: '0',
            marginTop: '0',
            marginBottom: '0',
            opacity: '0',
        })),
        state('void', style({
            height: '0',
            overflow: 'hidden',
            maxHeight: '0',
            paddingTop: '0',
            paddingBottom: '0',
            marginTop: '0',
            marginBottom: '0',
        })),
        state('visible', style({
            height: '*'
        })),
        transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        transition('void => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        transition('void => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class AppComponent implements OnInit{

    menuActive: boolean;

    activeMenuId: string;

    darkDemoStyle: HTMLStyleElement;

    routes: Array<string> = [];

    filteredRoutes: Array<string> = [];

    searchText:string;

    constructor(private router:Router){}

    ngOnInit() {
        let routes = this.router.config;
        for (let route of routes) {
            if (route.path && route.path !== "datagrid" && route.path !== "datalist" && route.path !== "datascroller" && route.path !== "growl")
                this.routes.push(route.path.charAt(0).toUpperCase() + route.path.substr(1));
        }
    }

    onAnimationStart (event) {
        switch (event.toState) {
            case 'visible':
                event.element.style.display = 'block';
            break;
        }
    }
    onAnimationDone (event) {
        switch (event.toState) {
            case 'hidden':
                event.element.style.display = 'none';
            break;

            case 'void':
                event.element.style.display = 'none';
            break;
        }
    }

    toggle(id:string) {
        this.activeMenuId = (this.activeMenuId === id ? null : id);
    }

    onKeydown(event: KeyboardEvent,id:string) {
        if (event.which === 32 || event.which === 13) {
            this.toggle(id);
            event.preventDefault();
        }
    }

    selectRoute(routeName) {
        this.router.navigate(['/'+routeName.toLowerCase()]);
        this.filteredRoutes = [];
        this.searchText = "";
    }

    filterRoutes(event) {
        let query = event.query;
        this.filteredRoutes = this.routes.filter(route => {
            return route.toLowerCase().includes(query.toLowerCase());
        });
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        themeLink.href = 'assets/components/themes/' + theme + '/theme.css';

        if (dark) {
            if (!this.darkDemoStyle) {
                this.darkDemoStyle = document.createElement('style');
                this.darkDemoStyle.type = 'text/css';
                this.darkDemoStyle.innerHTML = '.implementation { background-color: #3f3f3f; color: #dedede} .implementation > h3, .implementation > h4{ color: #dedede}';
                document.body.appendChild(this.darkDemoStyle);
            }
        }
        else if(this.darkDemoStyle) {
            document.body.removeChild(this.darkDemoStyle);
            this.darkDemoStyle = null;
        }
        
        event.preventDefault();
    }

    onMenuButtonClick(event: Event) {
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }
}
