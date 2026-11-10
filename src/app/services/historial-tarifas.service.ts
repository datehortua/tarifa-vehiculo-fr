import { Injectable, signal } from '@angular/core';

export interface PrimaGenerada {
  fecha: string;
  pnuValcomVeh: number;
  pnuAntgVeh: number;
  pnuEdacli: number;
  pnuCansini: number;
  tarifa: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialTarifasService {
  private _historial = signal<PrimaGenerada[]>([]);

  historial = this._historial.asReadonly();

  agregarPrima(prima: PrimaGenerada) {
    this._historial.update(actual => {
       const nuevoHistorial = [prima, ...actual];
      console.log('--- ARRAY EN MEMORIA ACTUALIZADO ---');
      console.table(nuevoHistorial); // console.table
      return nuevoHistorial;
    });
  }
}
