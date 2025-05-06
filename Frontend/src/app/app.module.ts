import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepickerModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TechFormComponent } from './pages/tech-form/tech-form.component';
import { TechFormEditComponent } from './pages/tech-form-edit/tech-form-edit.component';
import { TechFormUpdateComponent } from './pages/tech-form-update/tech-form-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AllRecordComponent } from './pages/all-record/all-record.component';
import { ImportDataComponent } from './pages/import-data/import-data.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { DashLayoutComponent } from './pages/dash-layout/dash-layout.component';
import { AdminSideMenuComponent } from './pages/admin-side-menu/admin-side-menu.component';
import { UserDashboardComponent } from './userLayout/user-dashboard/user-dashboard.component';
import { UserDashHomeComponent } from './userLayout/user-dash-home/user-dash-home.component';
import { UserDashProfileComponent } from './userLayout/user-dash-profile/user-dash-profile.component';
import { UserDashMenuComponent } from './userLayout/user-dash-menu/user-dash-menu.component';
import { AssetMapComponent } from './pages/asset-map/asset-map.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TechFormComponent,
    TechFormEditComponent,
    TechFormUpdateComponent,
    AllRecordComponent,
    ImportDataComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    DashLayoutComponent,
    AdminSideMenuComponent,
    UserDashboardComponent,
    UserDashHomeComponent,
    UserDashProfileComponent,
    UserDashMenuComponent,
    AssetMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbDatepickerModule,
    NgbToastModule,
    GoogleMapsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
