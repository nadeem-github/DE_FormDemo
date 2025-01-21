import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechFormComponent } from './pages/tech-form/tech-form.component';
import { TechFormEditComponent } from './pages/tech-form-edit/tech-form-edit.component';
import { TechFormUpdateComponent } from './pages/tech-form-update/tech-form-update.component';
import { AllRecordComponent } from './pages/all-record/all-record.component';
import { ImportDataComponent } from './pages/import-data/import-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'AllRecord', pathMatch: 'full', },
  { path: 'AllRecord', component: AllRecordComponent },
  { path: 'TechForm', component: TechFormComponent },
  { path: 'TechFormEdit/:id', component: TechFormEditComponent },
  { path: 'TechFormUpdate', component: TechFormUpdateComponent },
  { path: 'ImportData', component: ImportDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
