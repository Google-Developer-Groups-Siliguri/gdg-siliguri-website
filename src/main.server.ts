import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { DataLoadFailures } from './app/services/data-load-failures';

const bootstrap = async (context: BootstrapContext) => {
  const appRef = await bootstrapApplication(AppComponent, config, context);
  await appRef.whenStable();
  const failure = appRef.injector.get(DataLoadFailures).first();
  if (failure) {
    appRef.destroy();
    throw failure;
  }
  return appRef;
};

export default bootstrap;
