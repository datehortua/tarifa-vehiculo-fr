import { Component } from '@angular/core';
import { TarifaFormComponent } from './components/tarifa-form/tarifa-form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- Importamos RouterOutlet, NO TarifaFormComponent
  template: `<router-outlet></router-outlet>`, // <-- El hueco dinámico
  styles: []
})
export class App {
  title = 'tarifa-frontend';
}
