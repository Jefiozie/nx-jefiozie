import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent,
      },
    ]),
  ],
  exports: [RouterModule, AboutComponent],
  declarations: [AboutComponent],
})
export class AboutModule {}
