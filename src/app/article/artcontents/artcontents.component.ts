import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges, OnInit,
  SimpleChange
} from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { startWith} from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { Article } from '../../shared/services';

@Component({
  selector: 'ngb-artcontents',
  styleUrls: [ './artcontents.component.scss' ],
  templateUrl: './artcontents.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtcontentsComponent implements OnInit, OnChanges {
  private readonly articleChange$ = new Subject<Article>();
  contents = "<p>Hello World!</p>";
  //latestBids$: Observable<number>;
  @Input() article: Article;

  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    //private readonly bidService: BidService
  ) {}

  ngOnInit() {
    //console.log(this.article)
    /*
    this.latestBids$ = combineLatest(
      this.articleChange$.pipe(startWith(this.article)),
      this.bidService.priceUpdates$.pipe(startWith<BidMessage|null>(null)),
      (article, bid) =>  bid && bid.articleId === article.id ? bid.price : article.price
    );
    */
  }

  ngOnChanges() {
    //this.articleChange$.next(article.currentValue);
    //console.log(this.article) 
    if(this.article)
    {
      this.contents = this.article.contents.join("");
    }
  }

  placeBid(price: number) {
    //this.bidService.placeBid(this.article.id, price);
  }

  urlFor(article: Article): string {
    return `${this.baseUrl}/${article.imageUrl}`;
  }
}
