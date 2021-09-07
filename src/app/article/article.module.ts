import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { ArticleComponent } from './article.component';
import { ArtcontentsComponent } from './artcontents';
import { ArtsideComponent } from './artside';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: ArticleComponent }
    ]),
    MatButtonModule,
    MatGridListModule
  ],
  declarations: [
    ArticleComponent,
    ArtcontentsComponent,
    ArtsideComponent
  ]
})
export class ArticleModule {}
