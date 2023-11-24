import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/showcase/layout/app.component';
import { config } from 'src/app/showcase/layout/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
