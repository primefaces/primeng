import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { VersionService } from './service/versionservice';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('submenu', [
        state('hidden', style({
            height: '0',
            overflow: 'hidden',
            opacity: 0,
        })),
        state('visible', style({
            height: '*',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
    trigger('topbarSubmenu', [
        state('void', style({
            transform: 'translateY(5%)',
            opacity: 0
        })),
        state('visible', style({
            transform: 'translateY(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('250ms cubic-bezier(0.86, 0, 0.07, 1)')),
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

    configClick: boolean;

    configActive: boolean;

    activeSubmenus: {[key: string]: boolean} = {};

    activeTopbarSubmenu: number;

    topbarSubmenuOutsideClickListener;

    versions: any[];

    appState: any = {inputStyle: 'outlined', darkTheme: false};

    @ViewChild('topbarMenu') topbarMenu: ElementRef;

    constructor(private router: Router, private renderer: Renderer2, private versionService: VersionService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'UA-93461466-1', 
                      {
                        'page_path': '/primeng' + event.urlAfterRedirects
                      }
                );

                this.activeTopbarSubmenu = null;
                this.menuActive = false;
             }
        });

        this.versionService.getVersions().then(data => this.versions = data);
    }

    ngOnInit() {
        let routes = this.router.config;
        for (let route of routes) {
            this.routes.push(route.path.charAt(0).toUpperCase() + route.path.substr(1)); 
        }

        //this.initNewsState();
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
        else if (hasBodyDarkTheme) {
            this.removeClass(document.body, 'dark-theme');
        }
        
        this.activeTopbarSubmenu = null;
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

    toggleSubmenu(event, name) {
        this.activeSubmenus[name] = this.activeSubmenus[name] ? false: true;
        event.preventDefault();
    }

    isSubmenuActive(name) {
        if (this.activeSubmenus.hasOwnProperty(name)) {
            return this.activeSubmenus[name];
        }
        else if (this.router.isActive(name, false)) {
            this.activeSubmenus[name] = true;
            return true;
        }

        return false;
    }

    bindTopbarSubmenuOutsideClickListener() {
        if (!this.topbarSubmenuOutsideClickListener) {
            this.topbarSubmenuOutsideClickListener = (event) => {
                if (this.isOutsideTopbarMenuClicked(event)) {
                    this.activeTopbarSubmenu =  null;
                }
            };

            document.addEventListener('click', this.topbarSubmenuOutsideClickListener);
        }
    }

    unbindTopbarSubmenuOutsideClickListener() {
        if (this.topbarSubmenuOutsideClickListener) {
            document.removeEventListener('click', this.topbarSubmenuOutsideClickListener);
            this.topbarSubmenuOutsideClickListener = null;
        }
    }

    toggleTopbarSubmenu(event: Event, index: number) {
        this.activeTopbarSubmenu = this.activeTopbarSubmenu === index ? null : index;
        event.preventDefault();
    }

    isOutsideTopbarMenuClicked(event): boolean {
        return !(this.topbarMenu.nativeElement.isSameNode(event.target) || this.topbarMenu.nativeElement.contains(event.target));
    }

    onTopbarSubmenuAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                this.bindTopbarSubmenuOutsideClickListener();
            break;

            case 'void':
                this.unbindTopbarSubmenuOutsideClickListener();
            break;
        }
    }
}
