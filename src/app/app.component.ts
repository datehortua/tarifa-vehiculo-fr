import { Component } from '@angular/core';
import { TarifaFormComponent } from './components/tarifa-form/tarifa-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TarifaFormComponent],
  template: `<app-tarifa-form></app-tarifa-form>`,
  styles: []
})
export class AppComponent {
  title = 'tarifa-frontend';
}