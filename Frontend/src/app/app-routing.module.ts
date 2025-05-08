import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechFormComponent } from './pages/tech-form/tech-form.component';
import { TechFormEditComponent } from './pages/tech-form-edit/tech-form-edit.component';
import { TechFormUpdateComponent } from './pages/tech-form-update/tech-form-update.component';
import { AllRecordComponent } from './pages/all-record/all-record.component';
import { ImportDataComponent } from './pages/import-data/import-data.component';
import { DashLayoutComponent } from './pages/dash-layout/dash-layout.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { UserDashboardComponent } from './userLayout/user-dashboard/user-dashboard.component';
import { UserDashHomeComponent } from './userLayout/user-dash-home/user-dash-home.component';
import { UserDashProfileComponent } from './userLayout/user-dash-profile/user-dash-profile.component';
import { AssetMapComponent } from './pages/asset-map/asset-map.component';
import { ActiveUserComponent } from './pages/active-user/active-user.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotPass', component: ForgotPassComponent },
    ],
  },
  {
    path: '',
    component: DashLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'AllRecord', component: AllRecordComponent },
      { path: 'TechForm', component: TechFormComponent },
      { path: 'TechFormEdit/:id', component: TechFormEditComponent },
      { path: 'TechFormUpdate', component: TechFormUpdateComponent },
      { path: 'ImportData', component: ImportDataComponent },
      { path: 'adminLayout', component: DashLayoutComponent },
      { path: 'assetMap', component: AssetMapComponent },
      { path: 'activeUser', component: ActiveUserComponent },
    ],
  },
  {
    path: '',
    component: UserDashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'userHome', component: UserDashHomeComponent },
      { path: 'userProfile', component: UserDashProfileComponent },
    ],
  },

  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
