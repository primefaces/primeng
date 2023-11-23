import {bootstrapApplication} from '@angular/platform-browser';
import { AppComponent } from './app/showcase/layout/app.component';
import { config } from './app/showcase/layout/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
