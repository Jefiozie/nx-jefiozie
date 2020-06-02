import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [InfoCardComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatCardModule],
  exports: [InfoCardComponent],
})
export class InfoCardModule {}
