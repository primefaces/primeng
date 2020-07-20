import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VersionService } from './service/versionservice';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

    theme= 'saga-blue';

    appState: any = {inputStyle: 'outlined', darkTheme: false};

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
        //this.initNewsState();
    }

    onMenuButtonClick() {
        this.menuActive = true;
        this.addClass(document.body, 'blocked-scroll');
    }

    onMaskClick() {
        this.menuActive = false;
        this.removeClass(document.body, 'blocked-scroll');
    }

    onAnimationStart (event) {
        switch (event.toState) {
            case 'visible':
                event.element.style.display = 'block';
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

    initNewsState() {
        this.newsActive = sessionStorage.getItem('primenews-hidden') ? false: true;
    }

    hideNews(event) {
        this.newsActive = false;
        sessionStorage.setItem('primenews-hidden', "true");
        event.preventDefault();
    }
}
