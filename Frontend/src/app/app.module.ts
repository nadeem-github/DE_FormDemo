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
import { RemembranceComponent } from './remember/remembrance/remembrance.component';
import { HomeRemembComponent } from './remember/home-rememb/home-rememb.component';
import { RouteRemembranceComponent } from './remember/route-remembrance/route-remembrance.component';
import { HeaderRemembComponent } from './remember/sharedRemembrance/header-rememb/header-rememb.component';
import { FooterRemembComponent } from './remember/sharedRemembrance/footer-rememb/footer-rememb.component';
import { DonateNowComponent } from './remember/donate-now/donate-now.component';
import { SkillfusionLayoutComponent } from './skillfusion-layout/skillfusion-layout.component';

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
    RemembranceComponent,
    HomeRemembComponent,
    RouteRemembranceComponent,
    HeaderRemembComponent,
    FooterRemembComponent,
    DonateNowComponent,
    SkillfusionLayoutComponent
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
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
