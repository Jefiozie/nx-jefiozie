import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfoCardModule } from '../../layout/info-card/info-card.module';
import { ArticlesComponent } from './articles.component';

@NgModule({
  imports: [
    CommonModule,
    InfoCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArticlesComponent,
      },
      {
        path: 'article',
        loadChildren: () =>
          import('../article/article.module').then((m) => m.ArticleModule),
      },
    ]),
  ],
  exports: [],
  declarations: [ArticlesComponent],
  providers: [],
})
export class ArticlesModule {}
