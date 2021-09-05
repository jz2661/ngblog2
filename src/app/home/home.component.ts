import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { API_BASE_URL } from '../app.tokens';
import { Article, ArticleService } from '../shared/services/article.service';

@Component({
  selector: 'ngb-home',
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  //@Input() Articles: Article[] = [];
  readonly articles$: Observable<Article[]>;
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 1 ],
    [ 'sm', 2 ],
    [ 'md', 3 ],
    [ 'lg', 4 ],
    [ 'xl', 5 ],
  ]);

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly media: MediaObserver,
    private readonly articleService: ArticleService,) {
    // In the older versions of flex-layout we used ObservableMedia, which is deprecated. 
    // Use MediaObserver instead
    this.articles$ = this.articleService.getAll()

    this.columns$ = this.media.media$
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3)
      );
  }

  urlFor(Article: Article): string {
    return `${this.baseUrl}/${Article.imageUrl}`;
  }
}
