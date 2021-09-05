import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
//import * as fs from 'fs';
//import * as util from 'util';
import * as articlesFile from "src/data/Articles.json";

type DB = Article[];

export interface Article {
  id: number;
  title: string;
  date: Date;
  imageUrl: string;
  contents: string;
  categories: string[];
}

export interface ArticleSearchParams {
  [key: string]: any; // To make compatible with HttpParams type.
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

export abstract class ArticleService {
  abstract getAll(): Observable<Article[]>;
  abstract getById(ArticleId: number): Observable<Article>;
  abstract getByCategory(category: string): Observable<Article[]>;
  abstract getAllCategories(): Observable<string[]>;
  abstract search(params: ArticleSearchParams): Observable<Article[]>;
}

@Injectable()
export class HttpArticleService implements ArticleService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/api/Articles`);
  }

  getById(ArticleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/api/Articles/${ArticleId}`);
  }

  getByCategory(category: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/api/categories/${category}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/categories`);
  }

  search(params: ArticleSearchParams): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/api/Articles`, { params });
  }
}

@Injectable()
export class StaticArticleService implements ArticleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>('/data/Articles.json');
  }

  getById(ArticleId: number): Observable<Article> {
    return this.http.get<Article[]>('/data/Articles.json').pipe(
      map(Articles => <Article>Articles.find(p => p.id === ArticleId)));
  }

  getByCategory(category: string): Observable<Article[]> {
    return this.http.get<Article[]>('/data/Articles.json').pipe(
      map(Articles => Articles.filter(p => p.categories.includes(category))));
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<Article[]>('/data/Articles.json')
      .pipe(
        map(this.reduceCategories),
        map(categories => Array.from(new Set(categories)))
      );
  }

  search(params: ArticleSearchParams): Observable<Article[]> {
    return this.http.get<Article[]>('/data/Articles.json').pipe(
      map(Articles => this.filterArticles(Articles, params))
    );
  }

  private reduceCategories(Articles: Article[]): string[] {
    return Articles.reduce((all, Article) => all.concat(Article.categories), new Array<string>());
  }

  private filterArticles(Articles: Article[], params: ArticleSearchParams): Article[] {
    return Articles.filter(p => {
      if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
        return false;
      }
      return true;
    });
  }
}


@Injectable()
export class LocalArticleService implements ArticleService {

  //private db$: DB;

  constructor(private http: HttpClient) {
    //const readFile = util.promisify(fs.readFile);
    //this.db$ = fs.readFile('./data/Articles.json', 'utf8')
    //  .then(JSON.parse, console.error);    
  }

  getAll(): Observable<Article[]> {
    return of(this.filterArticles((articlesFile as any).default, {}));
  }

  getById(ArticleId: number): Observable<Article> {
    return this.getAll().pipe(
      map(Articles => <Article>Articles.find(p => p.id === ArticleId)));
  }

  getByCategory(category: string): Observable<Article[]> {
    return this.getAll().pipe(
      map(Articles => Articles.filter(p => p.categories.includes(category))));
  }

  getAllCategories(): Observable<string[]> {
    return this.getAll()
      .pipe(
        map(this.reduceCategories),
        map(categories => Array.from(new Set(categories)))
      );
  }

  search(params: ArticleSearchParams): Observable<Article[]> {
    return this.getAll().pipe(
      map(Articles => this.filterArticles(Articles, params))
    );
  }

  private reduceCategories(Articles: Article[]): string[] {
    return Articles.reduce((all, Article) => all.concat(Article.categories), new Array<string>());
  }

  private filterArticles(Articles: Article[], params: ArticleSearchParams): Article[] {
    return Articles.filter(p => {
      if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
        return false;
      }
      return true;
    });
  }
}