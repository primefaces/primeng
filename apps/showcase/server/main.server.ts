import { AppComponent } from '@/components/layout/app.component';
import { config } from '@/server/app.config.server';
import { bootstrapApplication } from '@angular/platform-browser';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
