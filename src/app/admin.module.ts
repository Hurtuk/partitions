import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeComponent } from '../admin/admin-home/admin-home.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { AdminScoresComponent } from '../admin/admin-scores/admin-scores.component';
import { AdminScoreComponent } from '../admin/admin-score/admin-score.component';
import { MarkComponent } from '../components/mark/mark.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminScoresComponent,
    AdminScoreComponent,
    MarkComponent
  ],
  exports: [
    MarkComponent
  ]
})
export class AdminModule {}
