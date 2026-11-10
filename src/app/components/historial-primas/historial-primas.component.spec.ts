import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HistorialPrimasComponent } from './historial-primas.component';
import { HistorialTarifasService, PrimaGenerada } from '../../services/historial-tarifas.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('HistorialPrimasComponent', () => {
  let component: HistorialPrimasComponent;
  let fixture: ComponentFixture<HistorialPrimasComponent>;
  let historialService: HistorialTarifasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialPrimasComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialPrimasComponent);
    component = fixture.componentInstance;
    historialService = TestBed.inject(HistorialTarifasService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería calcular la paginación correctamente', () => {
    // 1. Insertamos 7 primas falsas en el servicio
    for (let i = 1; i <= 7; i++) {
      const prima: PrimaGenerada = { fecha: `fecha-${i}`, pnuValcomVeh: 100, pnuAntgVeh: 1, pnuEdacli: 20, pnuCansini: 0, tarifa: 1000 };
      historialService.agregarPrima(prima);
    }

    fixture.detectChanges(); // Actualizamos la vista

    // 2. Verificamos el total de páginas (7 items / 5 por página = 2 páginas)
    expect(component.totalPaginas()).toBe(2);

    // 3. Verificamos que la primera página tenga 5 items
    expect(component.datosPaginados().length).toBe(5);

    // 4. Cambiamos a la página 2 y verificamos que tenga 2 items
    component.cambiarPagina(2);
    fixture.detectChanges();
    expect(component.datosPaginados().length).toBe(2);
  });
});
