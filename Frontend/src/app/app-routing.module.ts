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
import { authGuard } from './guards/auth.guard';
import { UserDashboardComponent } from './userLayout/user-dashboard/user-dashboard.component';
import { UserDashHomeComponent } from './userLayout/user-dash-home/user-dash-home.component';
import { UserDashProfileComponent } from './userLayout/user-dash-profile/user-dash-profile.component';

const routes: Routes = [

  // { path: '', redirectTo: 'AllRecord', pathMatch: 'full' },
  // { path: 'AllRecord', component: AllRecordComponent },
  // { path: 'TechForm', component: TechFormComponent },
  // { path: 'TechFormEdit/:id', component: TechFormEditComponent },
  // { path: 'TechFormUpdate', component: TechFormUpdateComponent },
  // { path: 'ImportData', component: ImportDataComponent },

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
    canActivateChild: [authGuard],
    children: [
      { path: 'AllRecord', component: AllRecordComponent },
      { path: 'TechForm', component: TechFormComponent },
      { path: 'TechFormEdit/:id', component: TechFormEditComponent },
      { path: 'TechFormUpdate', component: TechFormUpdateComponent },
      { path: 'ImportData', component: ImportDataComponent },
      { path: 'adminLayout', component: DashLayoutComponent },
    ],
  },
  {
    path: '',
    component: UserDashboardComponent,
    canActivateChild: [authGuard],
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
