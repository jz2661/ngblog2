import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Article, ArticleService } from './shared/services';
import { Store } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UpdateOrderBy } from './shared/actions/orderby.action';
import { State } from './app.module';

@Component({
  selector: 'ngb-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
  public categories$;
  public orderby = "date";

  constructor(
    private articleService: ArticleService,
    private store: Store<State>)
  {
    this.categories$ = articleService.getAllCategories();
  }

  goToLink(url: string){
    window.open(url, "_blank");
  };

  setOrderBy(orderby: string){
    this.orderby = orderby;
    this.store.dispatch(UpdateOrderBy({orderBy: this.orderby}));
  };

  ngOnChange(){
    //this.router.navigateByUrl('/home');
  }
}
