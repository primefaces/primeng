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
        const hasBodyDarkTheme = this.hasClass(document.body, 'dark-theme');
        
        if (dark) {
            if (!hasBodyDarkTheme) {
                this.addClass(document.body, 'dark-theme');
            }
        }
        else if(hasBodyDarkTheme) {
            this.removeClass(document.body, 'dark-theme');
        }
        
        event.preventDefault();
    }

    addClass(element: any, className: string) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element: any, className: string) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    hasClass(element: any, className: string) {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }

    onMenuButtonClick(event: Event) {
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }
}
