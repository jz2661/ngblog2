import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Article, ArticleService } from './shared/services';

@Component({
  selector: 'ngb-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
  public categories$;
  
  goToLink(url: string){
    window.open(url, "_blank");
  };

  constructor(    private articleService: ArticleService
    ){
      this.categories$ = articleService.getAllCategories();
    }

    ngOnChange(){
      //this.router.navigateByUrl('/home');
    }
}
