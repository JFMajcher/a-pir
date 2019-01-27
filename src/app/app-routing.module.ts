import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ONasComponent } from 'C:/Users/Dream Machines/a-pir/src/app/o-nas/o-nas.component'
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { MapComponent } from './map/map.component';
const routes: Routes = [
  { path: '', redirectTo: 'mapa', pathMatch: 'full' },
  { path: 'oNas', component: ONasComponent },
  { path: 'mapa', component: MapComponent },
  { path: 'rejestracja', component: RejestracjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
