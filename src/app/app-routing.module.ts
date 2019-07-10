import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { ScoreComponent } from '../components/score/score.component';
import { ScoresComponent } from '../components/scores/scores.component';
import { ContactComponent } from '../components/contact/contact.component';
import { LoginComponent } from '../admin/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'score/:tag', component: ScoreComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
