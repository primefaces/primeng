import { AppComponent } from '@/components/layout/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
