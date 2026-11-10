import { Component } from '@angular/core';
import { TarifaFormComponent } from './components/tarifa-form/tarifa-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarifaFormComponent],
  template: `<app-tarifa-form></app-tarifa-form>`, // <-- Asegúrate de que esto esté aquí
  styles: []
})
export class App {
  title = 'tarifa-frontend';
}
