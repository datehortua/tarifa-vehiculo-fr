import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarifaService, TarifaResponse } from '../../services/tarifa.service';
import { HistorialTarifasService } from '../../services/historial-tarifas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarifa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarifa-form.component.html',
  styleUrls: ['./tarifa-form.component.css']
})
export class TarifaFormComponent {
  tarifaForm: FormGroup;
  resultado: TarifaResponse | null = null;
  cargando = false;
  errorTecnico = false;

  constructor(
    private fb: FormBuilder,
    private tarifaService: TarifaService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone, // <-- Inyectamos NgZone
    public historialService: HistorialTarifasService, // <-- Inyectar
    private router: Router // <-- Inyectar
  ) {
    this.tarifaForm = this.fb.group({
      pnuValcomVeh: [null, [Validators.required, Validators.min(0)]],
      pnuAntgVeh: [null, [Validators.required, Validators.min(0)]],
      pnuEdacli: [null, [Validators.required, Validators.min(18), Validators.max(99), Validators.pattern('^[0-9]{1,2}$')]],
      pnuCansini: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.tarifaForm.invalid) {
      this.tarifaForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.resultado = null;
    this.errorTecnico = false;

    this.tarifaService.calcularTarifa(this.tarifaForm.value).subscribe({
      next: (res) => {
        // Nos aseguramos de que el cambio ocurra dentro de la zona de Angular
        this.ngZone.run(() => {
          this.resultado = res;
          this.cargando = false;

          // Si el cálculo fue exitoso, lo guardamos en memoria para visualizar lña historia
          if (res.exitoso && res.tarifa) {
            this.historialService.agregarPrima({
              fecha: new Date().toLocaleString(),
              pnuValcomVeh: this.tarifaForm.value.pnuValcomVeh,
              pnuAntgVeh: this.tarifaForm.value.pnuAntgVeh,
              pnuEdacli: this.tarifaForm.value.pnuEdacli,
              pnuCansini: this.tarifaForm.value.pnuCansini,
              tarifa: res.tarifa
            });
          }

          this.cdRef.detectChanges(); // Forzamos la actualización
        });
      },
      error: (err) => {
        console.error('Error:', err);
        this.ngZone.run(() => {
          this.errorTecnico = true;
          this.cargando = false;
          this.cdRef.detectChanges();
        });
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.tarifaForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

    // Método para filtrar letras y símbolos
    soloNumeros(event: Event) {
      const input = event.target as HTMLInputElement;
      // Reemplaza todo lo que no sea un dígito del 0 al 9 por vacío
      input.value = input.value.replace(/[^0-9]/g, '');

      // Actualiza el valor del formulario reactivo
      this.tarifaForm.get(input.getAttribute('formControlName')!)?.setValue(input.value);
    }

  // Método para navegar a la vista de historial
  irAHistorial() {
    this.router.navigate(['/historial']);
  }
}
