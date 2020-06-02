import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ArticlesService } from '../../blog/articles.service';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  latestArticles$ = this.articleService.articles$.pipe(take(1));
  constructor(private readonly articleService: ArticlesService) {}

  ngOnInit(): void {}
}
