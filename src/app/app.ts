import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- Importante
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class App {
  title = 'tarifa-frontend';
}
