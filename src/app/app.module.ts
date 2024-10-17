import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { ErrorService } from './interceptors/error.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorService, multi: true},
     provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
