import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@layout/app.component';
import { appConfig } from '@layout/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
