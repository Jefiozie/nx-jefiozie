import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../blog';

@Component({
  selector: 'jbb-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  articles$ = this.articlesService.articles$;
  constructor(private readonly articlesService: ArticlesService) {}

  ngOnInit(): void {}
}
