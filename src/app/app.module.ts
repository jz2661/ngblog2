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
import {MatSelectModule} from '@angular/material/select';
import { StoreModule } from '@ngrx/store';

//import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from '../environments/environment';
import { SHARED_SERVICES } from './shared/services';
//import { SearchFormModule } from './shared/components';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { orderReducer } from './shared/reducers/orderby';
import { API_BASE_URL } from './app.tokens';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export interface State {
  orderBy: string;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes, {useHash: true}),
    StoreModule.forRoot( {orderBy: orderReducer} ),

    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    AmplifyAngularModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    NgbModule
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
