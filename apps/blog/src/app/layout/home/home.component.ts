import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ArticlesService } from '../../blog/articles.service';
import { MetaService } from '../../meta.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestArticles$ = this.articleService.articles$.pipe(take(1));
  constructor(
    private readonly articleService: ArticlesService,
    private readonly metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.resetMeta();
  }
}
