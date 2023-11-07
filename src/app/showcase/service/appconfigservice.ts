import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppConfig } from '../domain/appconfig';

@Injectable()
export class AppConfigService {
    config: AppConfig = {
        theme: 'lara-light-blue',
        dark: false,
        inputStyle: 'outlined',
        ripple: true
    };

    private configUpdate = new Subject<AppConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    private configActive = new BehaviorSubject<boolean>(false);

    configActive$ = this.configActive.asObservable();

    updateConfig(config: AppConfig) {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig() {
        return this.config;
    }

    toggleConfig() {
        this.configActive.next(!this.configActive.value);
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        const linkElement = document.getElementById('theme-link');
        this.replaceLink(linkElement, theme, () => {
            this.updateConfig({ ...this.config, theme: theme, dark: dark });
        });
    }

    replaceLink(linkElement, theme: string, onComplete: Function) {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', linkElement.getAttribute('href').replace(this.config.theme, theme));
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

}
