import { NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';

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
    MatGridListModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressBarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
  ],
  declarations: [
    ArticleComponent,
    ArtcontentsComponent,
    ArtsideComponent
  ]
})
export class ArticleModule {}
