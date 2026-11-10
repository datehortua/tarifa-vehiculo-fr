import { Routes } from '@angular/router';
import { TarifaFormComponent } from './components/tarifa-form/tarifa-form.component';
import { HistorialPrimasComponent } from './components/historial-primas/historial-primas.component';

export const routes: Routes = [
  { path: '', component: TarifaFormComponent },
  { path: 'historial', component: HistorialPrimasComponent },
  { path: '**', redirectTo: '' }
];
