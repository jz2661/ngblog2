import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

//import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from '../environments/environment';
import { SHARED_SERVICES } from './shared/services';
//import { SearchFormModule } from './shared/components';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { API_BASE_URL } from './app.tokens';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { IconsModule } from 'angular-bootstrap-md'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes, {useHash: true}),

    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    AmplifyAngularModule,
    MatMenuModule,
    MatListModule,
    IconsModule,
    MatGridListModule,
    //MDBBootstrapModule.forRoot()

    //SearchFormModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ...SHARED_SERVICES,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    //{ provide: WS_URL, useValue: environment.wsUrl }
    AmplifyService
  ]
})
export class AppModule {}
