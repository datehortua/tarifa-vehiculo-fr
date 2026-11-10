import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest'; // <-- Importamos de Vitest

import { TarifaFormComponent } from './tarifa-form.component';
import { TarifaService } from '../../services/tarifa.service';
import { HistorialTarifasService } from '../../services/historial-tarifas.service';

describe('TarifaFormComponent', () => {
  let component: TarifaFormComponent;
  let fixture: ComponentFixture<TarifaFormComponent>;

  // 1. Declaramos el espía usando la sintaxis de Vitest
  let tarifaServiceSpy: { calcularTarifa: ReturnType<typeof vi.fn> };
  let historialService: HistorialTarifasService;

  beforeEach(async () => {
    // 2. Creamos el espía con vi.fn()
    const spy = {
      calcularTarifa: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TarifaFormComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: TarifaService, useValue: spy } // Usamos el espía
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifaFormComponent);
    component = fixture.componentInstance;
    tarifaServiceSpy = TestBed.inject(TarifaService) as any;
    historialService = TestBed.inject(HistorialTarifasService);

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // --- PRUEBAS DE VALIDACIÓN ---

  it('el formulario debería ser inválido si está vacío', () => {
    expect(component.tarifaForm.valid).toBeFalsy();
  });

  it('el formulario debería ser inválido si la edad es menor a 18', () => {
    component.tarifaForm.patchValue({
      pnuValcomVeh: 50000000,
      pnuAntgVeh: 10,
      pnuEdacli: 17, // Inválido
      pnuCansini: 0
    });
    expect(component.tarifaForm.valid).toBeFalsy();
  });

  it('el formulario debería ser inválido si la antigüedad es 0', () => {
    component.tarifaForm.patchValue({
      pnuValcomVeh: 50000000,
      pnuAntgVeh: 0, // Inválido
      pnuEdacli: 20,
      pnuCansini: 0
    });
    expect(component.tarifaForm.valid).toBeFalsy();
  });

  it('el formulario debería ser válido con datos correctos', () => {
    component.tarifaForm.patchValue({
      pnuValcomVeh: 50000000,
      pnuAntgVeh: 10,
      pnuEdacli: 20,
      pnuCansini: 2
    });
    expect(component.tarifaForm.valid).toBeTruthy();
  });

  // --- PRUEBAS DE ENVÍO Y RESPUESTA ---

  it('no debería llamar al servicio si el formulario es inválido', () => {
    component.tarifaForm.patchValue({ pnuValcomVeh: null }); // Inválido
    component.onSubmit();

    expect(tarifaServiceSpy.calcularTarifa).not.toHaveBeenCalled();
  });

  it('debería guardar en el historial cuando el cálculo es exitoso', () => {
    // 1. Llenamos el formulario
    component.tarifaForm.patchValue({
      pnuValcomVeh: 50000000,
      pnuAntgVeh: 10,
      pnuEdacli: 20,
      pnuCansini: 2
    });

    // 2. Simulamos que el backend responde con éxito usando vi.fn().mockReturnValue
    tarifaServiceSpy.calcularTarifa.mockReturnValue(of({
      tarifa: 24000000,
      exitoso: true
    }));

    // 3. Ejecutamos el submit
    component.onSubmit();

    // 4. Verificamos
    expect(tarifaServiceSpy.calcularTarifa).toHaveBeenCalled();
    expect(component.resultado?.exitoso).toBe(true); // En Vitest es toBe(true) en lugar de toBeTrue()
    expect(component.cargando).toBe(false);
    expect(historialService.historial().length).toBe(1);
  });

  it('debería activar errorTecnico si el backend falla', () => {
    // Silenciamos el console.error temporalmente para que no ensucie la salida
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.tarifaForm.patchValue({
      pnuValcomVeh: 50000000,
      pnuAntgVeh: 10,
      pnuEdacli: 20,
      pnuCansini: 2
    });

    // Simulamos un error
    tarifaServiceSpy.calcularTarifa.mockReturnValue(throwError(() => new Error('Error 500')));

    component.onSubmit();

    expect(component.errorTecnico).toBe(true);
    expect(component.cargando).toBe(false);

    // Restauramos el console.error original
    consoleSpy.mockRestore();
  });
});
