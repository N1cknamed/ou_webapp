import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { fakeBackendProvider } from './app/_helpers';

bootstrapApplication(AppComponent, {  providers: [provideHttpClient(), appConfig.providers, fakeBackendProvider]})
  .catch((err) => console.error(err));
