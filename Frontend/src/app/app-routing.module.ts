import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechFormComponent } from './pages/tech-form/tech-form.component';
import { TechFormEditComponent } from './pages/tech-form-edit/tech-form-edit.component';
import { TechFormUpdateComponent } from './pages/tech-form-update/tech-form-update.component';
import { AllRecordComponent } from './pages/all-record/all-record.component';
import { ImportDataComponent } from './pages/import-data/import-data.component';
import { RemembranceComponent } from './remember/remembrance/remembrance.component';
import { HomeRemembComponent } from './remember/home-rememb/home-rememb.component';
import { DonateNowComponent } from './remember/donate-now/donate-now.component';
import { RouteRemembranceComponent } from './remember/route-remembrance/route-remembrance.component';
import { SkillfusionLayoutComponent } from './skillfusion-layout/skillfusion-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SkillfusionLayoutComponent,
    children: [
      { path: '', redirectTo: 'AllRecord', pathMatch: 'full' },
      { path: 'AllRecord', component: AllRecordComponent },
      { path: 'TechForm', component: TechFormComponent },
      { path: 'TechFormEdit/:id', component: TechFormEditComponent },
      { path: 'TechFormUpdate', component: TechFormUpdateComponent },
      { path: 'ImportData', component: ImportDataComponent },
    ]
  },
  {
    path: '',
    component: RouteRemembranceComponent,
    children: [
      { path: 'homeRemembrance', component: HomeRemembComponent },
      { path: 'remembrance', component: RemembranceComponent },
      { path: 'donateNow', component: DonateNowComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
