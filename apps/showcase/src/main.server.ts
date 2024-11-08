import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@layout/app.component';
import { config } from '@layout/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
