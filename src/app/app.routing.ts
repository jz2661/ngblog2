import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'articles/:articleId',
    loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  }
];
