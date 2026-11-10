import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TarifaFormComponent } from './tarifa-form.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TarifaFormComponent', () => {
  let component: TarifaFormComponent;
  let fixture: ComponentFixture<TarifaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TarifaFormComponent,
        ReactiveFormsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TarifaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debería ser inválido si está vacío', () => {
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

  it('el formulario debería ser inválido si la edad es menor a 18', () => {
    component.tarifaForm.patchValue({
      pnuValcomVeh: 50000000,
      pnuAntgVeh: 10,
      pnuEdacli: 15,
      pnuCansini: 2
    });
    expect(component.tarifaForm.valid).toBeFalsy();
  });
});
