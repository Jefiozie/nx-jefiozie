import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'jbb-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
  private pages$ = this.articlesService.articles$;
  links$ = this.pages$;
  constructor(private readonly articlesService: ArticlesService) {}
}
