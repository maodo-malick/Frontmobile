import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HelperInterceptor} from './user/helper.interceptor';


// import { ErrorHandler} from '@angular/core';
// import { IonicApp, IonicErrorHandler} from 'ionic-angular';
// import { IonicStepperModule } from 'ionic-stepper';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: HelperInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
