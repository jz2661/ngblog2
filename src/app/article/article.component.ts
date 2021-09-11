import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Article, ArticleService } from '../shared/services';
import { interval, Subscription } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'ngb-article',
  styleUrls: [ './article.component.scss' ],
  templateUrl: './article.component.html'
})
export class ArticleComponent {
  public article: Article;
  readonly columns$: Observable<number>;
  public suggestedArticles$: Observable<Article[]>;
  progressbarValue: number = 0;
  curSec: number = 0;
  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 1 ],
    [ 'sm', 2 ],
    [ 'md', 3 ],
    [ 'lg', 3 ],
    [ 'xl', 3 ],
  ]);

  startTimer(seconds: number) {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.zone.run(() => {
        this.progressbarValue = sec * 100 / seconds;
        
      });

      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
      }
    });
  }

  increaseProgress(doneCallback: () => void) {
    this.progressbarValue += 1;
    console.log(`Current progress: ${this.progressbarValue}%`);
  
    if (this.progressbarValue < 100) {
      window.setTimeout(() => {
        this.increaseProgress(doneCallback);
      }, 100);
    } else {
      doneCallback();
    }
  }

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private readonly media: MediaObserver,
    private zone: NgZone,
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
        //let filtered = events.filter(event => event.id != this.article.id);
        let filtered = events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        filtered = filtered.length >= 5? filtered.slice(0,5) : filtered;
        return filtered;
      })
    );

    this.columns$ = this.media.media$
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3),
        tap( res => console.log('columns:', res)),
      );

    console.log(this.columns$.subscribe());  

    //this.startTimer(10);
    //this.increaseProgress(() => console.log('Done!'));
  }

  ngOnInit() {
    //this.increaseProgress(() => console.log('Done!'));

  }
}
