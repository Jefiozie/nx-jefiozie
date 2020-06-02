import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticlesService } from '../../blog';
import { AboutModule } from '../about/about.module';
import { InfoCardModule } from '../info-card/info-card.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AboutModule,
    InfoCardModule,
  ],
  providers: [ArticlesService],
  exports: [HomeComponent],
})
export class HomeModule {}
