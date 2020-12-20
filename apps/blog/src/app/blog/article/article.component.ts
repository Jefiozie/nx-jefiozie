import {
  Component,
  ViewEncapsulation,
  AfterViewChecked,
  Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HighlightService } from '../highlight.service';
import { ArticlesService } from '../articles.service';
import { filter, map } from 'rxjs/operators';

declare var ng: any;

@Component({
  selector: 'jbb-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ArticleComponent implements AfterViewChecked {
  title: string;
  constructor(
    private route: ActivatedRoute,
    private readonly articleService: ArticlesService,
    private highlightService: HighlightService
  ) {
    this.articleService.articles$
      .pipe(
        map((articles) =>
          articles.filter((article) => {
            const id = this.route.snapshot.params.id;
            const title = article.sourceFile.replace('.md', '');
            return title === id;
          })
        ),
        map((articles) => articles[0])
      )
      .subscribe((article) => {
        this.title = article.title;
      });
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
