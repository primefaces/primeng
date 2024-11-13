import { appConfig } from '@/app/app.config';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
    providers: [provideServerRendering()]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
