import { Provider } from '@angular/core';
//import { BidService } from './bid.service';
import { ArticleService, HttpArticleService, StaticArticleService, LocalArticleService } from './article.service';
//import { WebSocketService } from './websocket.service';

//export { BidMessage, BidService } from './bid.service';
export { Article, ArticleSearchParams, ArticleService } from './article.service';
//export { WebSocketService } from './websocket.service';

export const SHARED_SERVICES: Provider[] = [
  //{ provide: BidService, useClass: BidService },
  { provide: ArticleService, useClass: LocalArticleService },
  //{ provide: WebSocketService, useClass: WebSocketService }
];
