import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Article, ArticleService } from '../shared/services';

@Component({
  selector: 'ngb-article',
  styleUrls: [ './article.component.scss' ],
  templateUrl: './article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {
  public article: Article;
  readonly suggestedArticles$: Observable<Article[]>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {
    this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('articleId') || '', 10)),
        filter(articleId => Boolean(articleId)),
        switchMap(articleId => this.articleService.getById(articleId))
    ).subscribe( art => {
      this.article = art;
      console.log(this.article)
    });
      
    this.suggestedArticles$ = this.articleService.getAll();
  }
}
