import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./layout/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./blog/articles/articles.module').then((m) => m.ArticlesModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then((m) => m.ProjectsModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
