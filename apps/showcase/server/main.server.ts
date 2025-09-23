import { AppComponent } from '@/components/layout/app.component';
import { config } from '@/server/app.config.server';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
