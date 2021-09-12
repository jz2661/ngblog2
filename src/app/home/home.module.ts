import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';

import { HomeComponent } from './home.component';
//import { ProductGridComponent } from './product-grid/product-grid.component';
//import { SearchComponent } from './search/search.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  /*
  { path: 'search', component: SearchComponent },
  { path: 'categories',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: ':category', component: CategoriesComponent },
    ]
  }
  */
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule
  ],
  declarations: [
    HomeComponent,
    /*
    CategoriesComponent,
    ProductGridComponent,
    SearchComponent
    */
  ]
})
export class HomeModule {}
