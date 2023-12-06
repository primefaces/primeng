import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/showcase/layout/app.component';
import { appConfig } from './app/showcase/layout/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
