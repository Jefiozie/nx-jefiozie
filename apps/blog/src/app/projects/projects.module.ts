import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: ProjectsComponent }]),
  ],
})
export class ProjectsModule {}
