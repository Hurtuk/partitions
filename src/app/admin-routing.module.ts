import { Routes, RouterModule } from "@angular/router";
import { AdminHomeComponent } from "../admin/admin-home/admin-home.component";
import { NgModule } from "@angular/core";
import { AdminDashboardComponent } from "../admin/admin-dashboard/admin-dashboard.component";
import { AdminScoresComponent } from "../admin/admin-scores/admin-scores.component";
import { AuthGuard } from "../services/auth-guard.service";
import { AdminScoreComponent } from "../admin/admin-score/admin-score.component";

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminHomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    { path: 'scores', component: AdminScoresComponent },
                    { path: 'score', component: AdminScoreComponent },
                    { path: '', component: AdminDashboardComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
