import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DomHandler } from '../components/dom/domhandler';

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

    newsActive: boolean;

    resourcesMenuVisible: boolean;

    resourcesMenuClick: boolean;

    themesMenuVisible: boolean;

    themesMenuClick: boolean;

    templatesMenuVisible: boolean;

    templatesMenuClick: boolean;

    versionsMenuVisible: boolean;

    versionsMenuClick: boolean;

    themesMenuOutsideClickListener: any;

    templatesMenuOutsideClickListener: any;

    resourcesMenuOutsideClickListener: any;

    versionsMenuOutsideClickListener: any;

    configClick: boolean;

    configActive: boolean;

    constructor(private router:Router, public renderer: Renderer2){}

    ngOnInit() {
        let routes = this.router.config;
        for (let route of routes) {
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

    initNewsState() {
        this.newsActive = sessionStorage.getItem('primenews-hidden') ? false: true;
    }

    hideNews(event) {
        this.newsActive = false;
        sessionStorage.setItem('primenews-hidden', "true");
        event.preventDefault();
    } 

    onResourcesMenuClick(event) {
        if (!this.resourcesMenuVisible) {
            this.resourcesMenuVisible = true;
            this.resourcesMenuClick = true;
            this.bindResourcesMenuOutsideClickListener();        
        }
    }

    onThemesMenuClick(event) {
        if (!this.themesMenuVisible) {
            this.themesMenuVisible = true;
            this.themesMenuClick = true;
            this.bindThemesMenuOutsideClickListener();
        }
    }

    onTemplatesMenuClick(event) {
        if (!this.templatesMenuVisible) {
            this.templatesMenuVisible = true;
            this.templatesMenuClick = true;
            this.bindTemplatesMenuOutsideClickListener();
        }
    }

    onVersionsveMenuClick(event) {
        if (!this.versionsMenuVisible) {
            this.versionsMenuVisible = true;
            this.versionsMenuClick = true;
            this.bindVersionsMenuOutsideClickListener();
        }
    }

    bindThemesMenuOutsideClickListener() {
        if (!this.themesMenuOutsideClickListener) {
            this.themesMenuOutsideClickListener = (event) => {
                if (!this.themesMenuClick) {
                    this.themesMenuVisible = false;
                    this.unbindThemesMenuOutsideClickListener();
                }

                this.themesMenuClick = false;
            };

            document.addEventListener('click', this.themesMenuOutsideClickListener);
        }
    }

    unbindThemesMenuOutsideClickListener() {
        if (this.themesMenuOutsideClickListener) {
            document.removeEventListener('click', this.themesMenuOutsideClickListener);
            this.themesMenuOutsideClickListener = null;
        }
    }

    bindTemplatesMenuOutsideClickListener() {
        if (!this.templatesMenuOutsideClickListener) {
            this.templatesMenuOutsideClickListener = (event) => {
                if (!this.templatesMenuClick) {
                    this.templatesMenuVisible = false;
                    this.unbindTemplatesMenuOutsideClickListener();
                }

                this.templatesMenuClick = false;
            };

            document.addEventListener('click', this.templatesMenuOutsideClickListener);
        }
    }

    unbindTemplatesMenuOutsideClickListener() {
        if (this.templatesMenuOutsideClickListener) {
            document.removeEventListener('click', this.templatesMenuOutsideClickListener);
            this.templatesMenuOutsideClickListener = null;
        }
    }

    
    bindResourcesMenuOutsideClickListener() {
        if (!this.resourcesMenuOutsideClickListener) {
            this.resourcesMenuOutsideClickListener = (event) => {
                if (!this.resourcesMenuClick) {
                    this.resourcesMenuVisible = false;
                    this.unbindResourcesMenuOutsideClickListener();
                }

                this.resourcesMenuClick = false;
            };

            document.addEventListener('click', this.resourcesMenuOutsideClickListener);
        }
    }
    
    unbindResourcesMenuOutsideClickListener() {
        if (this.resourcesMenuOutsideClickListener) {
            document.removeEventListener('click', this.resourcesMenuOutsideClickListener);
            this.resourcesMenuOutsideClickListener = null;
        }
    }

    bindVersionsMenuOutsideClickListener() {
        if (!this.versionsMenuOutsideClickListener) {
            this.versionsMenuOutsideClickListener = (event) => {
                if (!this.versionsMenuClick) {
                    this.versionsMenuVisible = false;
                    this.unbindVersionsMenuOutsideClickListener();
                }

                this.versionsMenuClick = false;
            };

            document.addEventListener('click', this.versionsMenuOutsideClickListener);
        }
    }

    unbindVersionsMenuOutsideClickListener() {
        if (this.versionsMenuOutsideClickListener) {
            document.removeEventListener('click', this.versionsMenuOutsideClickListener);
            this.versionsMenuOutsideClickListener = null;
        }
    }
}
