import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';

const routes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
  },
  {
    path: '**',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
