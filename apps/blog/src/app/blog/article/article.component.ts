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
import { filter, map, tap } from 'rxjs/operators';
import { Frontmatter, MetaService } from '../../meta.service';

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
  readingTime: any;
  constructor(
    private route: ActivatedRoute,
    private readonly articleService: ArticlesService,
    private highlightService: HighlightService,
    private metaService: MetaService
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
        map((articles) => articles[0]),
        tap((blog: Frontmatter) => {
          this.metaService.update({
            ...blog,
            url: `https://jefiozie.github.io${blog.route}`,
          });
        })
      )
      .subscribe((article) => {
        this.title = article.title;
        this.readingTime = article?.readingTime;
      });
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
