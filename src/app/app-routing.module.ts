import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriseRendezVousComponent } from  './prise-rendez-vous/prise-rendez-vous.component'

const routes: Routes = [
  { path: '', redirectTo: '/prise-rendez-vous', pathMatch: 'full' },
  { path: 'prise-rendez-vous', component: PriseRendezVousComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

