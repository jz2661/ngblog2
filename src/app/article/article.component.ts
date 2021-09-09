import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Article, ArticleService } from '../shared/services';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'ngb-article',
  styleUrls: [ './article.component.scss' ],
  templateUrl: './article.component.html'
})
export class ArticleComponent {
  public article: Article;
  readonly suggestedArticles$: Observable<Article[]>;
  progressbarValue: number;
  curSec: number = 0;

  startTimer(seconds: number) {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue =  sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
      }
    });
  }

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
    });

    this.suggestedArticles$ = this.articleService.getAll().pipe(
      map(events => {
        let filtered = events.filter(event => event.id != this.article.id);
        filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        filtered = filtered.length >= 5? filtered.slice(0,5) : filtered;
        return filtered;
      })
    );

    //this.startTimer(20);
  }

  ngOnInit() {
    this.progressbarValue = 40;
    const seconds = 10;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue =  sec * 100 / seconds;
      this.curSec = sec;
      console.log(sec);
      console.log(this.progressbarValue);

      if (this.curSec === seconds) {
        sub.unsubscribe();
      }
    });  
  }
}
