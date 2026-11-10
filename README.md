# Tarifa Frontend

## 1. Descripción general

Tarifa Frontend es la interfaz web del sistema de cálculo de primas y tarifas. Su finalidad es permitir al usuario ingresar los datos del cliente y del vehículo, validar la información, consultar el resultado del cálculo y mantener un historial local de las primas generadas en la sesión actual.

La aplicación fue desarrollada en Angular 21 y está orientada a una arquitectura modular, escalable y fácil de mantener, con énfasis en componentes standalone, formularios reactivos y servicios especializados.

## 2. Objetivo del proyecto

El objetivo principal del sistema es:

- recibir los datos de entrada del usuario,
- validar la información antes del envío,
- consumir el servicio de cálculo del backend,
- presentar el resultado en la interfaz,
- registrar los cálculos realizados en un historial temporal,
- ofrecer una experiencia de uso clara y consistente.

## 3. Alcance funcional

La aplicación cubre las siguientes funcionalidades:

- captura de datos del vehículo y del cliente,
- validación reactiva de campos obligatorios y rangos,
- cálculo de tarifa mediante servicio HTTP,
- manejo de carga y errores en la interfaz,
- visualización del resultado del cálculo,
- historial de cálculos en memoria,
- navegación entre vistas principales.

## 4. Stack tecnológico y versiones

La aplicación se encuentra en la siguiente versión del stack actual:

- Angular: 21.2.0
- Angular CLI: 21.2.29
- Angular SSR: 21.2.29
- TypeScript: 5.9.2
- RxJS: 7.8.0
- Angular Forms: 21.2.0
- Angular HttpClient: 21.2.0
- Angular Router: 21.2.0
- Node.js: compatible con entorno 20.x (`@types/node` 20.17.19)
- npm: 10.9.4
- Vitest: 4.1.11
- Express: 5.1.0
- jsdom: 26.0.0
- Prettier: 3.8.1

Herramientas y patrones utilizados:

- Angular Standalone Components
- `ReactiveFormsModule`
- `HttpClient` para consumo de APIs REST
- `provideRouter` para configuración de navegación
- `provideHttpClient` para inyección del cliente HTTP
- `signal` para el estado del historial en memoria
- servicios con `providedIn: 'root'`

## 5. Requisitos previos

Para ejecutar la aplicación correctamente, se requiere:

- Node.js 18 o superior
- npm 9 o superior
- Angular CLI 21.x
- Git
- VS Code (recomendado)

## 6. Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd tarifa-frontend
```

2. Instalar dependencias:

```bash
npm install
```

## 7. Configuración de entorno

Si la aplicación requiere datos externos o endpoints, debe configurarse por entorno. En este proyecto la configuración principal se encuentra en el archivo de configuración Angular y en el servicio HTTP de la API.

Ejemplo base:

```env
API_URL=http://localhost:8080/api/v1
```

## 8. Ejecución en desarrollo

Para iniciar la aplicación en modo local:

```bash
ng serve
```

O bien:

```bash
npm start
```

La aplicación normalmente estará disponible en:

```text
http://localhost:4200
```

## 9. Compilación para producción

Para generar la versión final lista para despliegue:

```bash
ng build
```

Los artefactos de producción se generan en la carpeta `dist/`.

## 10. Pruebas

El proyecto contempla pruebas unitarias con Angular Testing + Vitest.

Ejecutar pruebas:

```bash
npm test
```

O directamente:

```bash
npx vitest
```

## 11. Estructura del proyecto

```text
tarifa-frontend/
├─ src/
│  ├─ app/
│  │  ├─ app.config.ts
│  │  ├─ app.routes.ts
│  │  ├─ app.component.ts
│  │  ├─ app.css
│  │  ├─ app.spec.ts
│  │  ├─ components/
│  │  │  ├─ tarifa-form/
│  │  │  │  ├─ tarifa-form.component.ts
│  │  │  │  ├─ tarifa-form.component.html
│  │  │  │  ├─ tarifa-form.component.css
│  │  │  │  └─ tarifa-form.component.spec.ts
│  │  │  └─ historial-primas/
│  │  │     ├─ historial-primas.component.ts
│  │  │     ├─ historial-primas.component.html
│  │  │     └─ historial-primas.component.spec.ts
│  │  ├─ services/
│  │  │  ├─ tarifa.service.ts
│  │  │  ├─ historial-tarifas.service.ts
│  │  │  └─ tarifa.ts
│  │  └─ routes/
│  ├─ assets/
│  ├─ styles.css
│  └─ main.ts
├─ angular.json
├─ package.json
├─ tsconfig.json
├─ vitest.config.ts
├─ .gitignore
├─ README.md
└─ ...
```

## 12. Arquitectura implementada

La aplicación usa una arquitectura Angular moderna basada en componentes standalone y servicios de dominio. La estructura se organiza en capas funcionales y de configuración.

### 12.1. Capa de configuración

- `app.config.ts`: responsable de configurar el enrutamiento global y el cliente HTTP.
- `app.routes.ts`: define la navegación de la aplicación.

Ejemplo de configuración real implementada:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

### 12.2. Capa de presentación

Los componentes forman la capa visual de la aplicación y utilizan Angular Standalone Components.

- `TarifaFormComponent`: recoge la información del usuario, valida los datos, realiza la petición HTTP y gestiona el resultado.
- `HistorialPrimasComponent`: muestra el historial de cálculos generados.

### 12.3. Capa de servicios

Los servicios encapsulan la lógica de acceso a datos y negocio.

- `TarifaService`: realiza la llamada al backend para calcular la tarifa.
- `HistorialTarifasService`: guarda y expone el historial en memoria usando `signal`.

### 12.4. Flujo principal del sistema

1. El usuario completa el formulario con los datos del vehículo y cliente.
2. El componente valida el formulario con `FormBuilder` y validadores.
3. Si el formulario es válido, se invoca `TarifaService.calcularTarifa()`.
4. El backend responde con un objeto de salida que contiene el resultado del cálculo.
5. El componente actualiza la vista con el resultado y muestra estados de carga/error.
6. Si la operación fue exitosa, se agrega el cálculo al historial mediante `HistorialTarifasService`.
7. La información del historial se gestiona con `signal`, lo que permite una actualización reativa ligera.

## 13. Descripción de componentes clave

### 13.1. TarifaFormComponent

Es el componente principal de la aplicación. Tiene las siguientes responsabilidades:

- crear y controlar el formulario reactivo,
- validar entradas como edad, antigüedad y valor del vehículo,
- impedir el envío si los datos no son válidos,
- llamar al servicio de cálculo,
- gestionar `cargando`, `resultado` y `errorTecnico`,
- guardar el resultado exitoso en el historial.

### 13.2. TarifaService

Este servicio encapsula la comunicación con el backend:

```ts
@Injectable({ providedIn: 'root' })
export class TarifaService {
  private apiUrl = 'http://localhost:8080/api/v1/tarifas/calcular';

  calcularTarifa(request: TarifaRequest): Observable<TarifaResponse> {
    return this.http.post<TarifaResponse>(this.apiUrl, request);
  }
}
```

### 13.3. HistorialTarifasService

El historial se mantiene en memoria usando Angular Signals:

```ts
@Injectable({ providedIn: 'root' })
export class HistorialTarifasService {
  private _historial = signal<PrimaGenerada[]>([]);
  historial = this._historial.asReadonly();

  agregarPrima(prima: PrimaGenerada) {
    this._historial.update(actual => [prima, ...actual]);
  }
}
```

## 14. Validaciones implementadas

Las validaciones se realizan en el formulario con `Validators` de Angular:

- `required`
- `min`
- `max`
- `pattern`

Campos involucrados:

- `pnuValcomVeh`
- `pnuAntgVeh`
- `pnuEdacli`
- `pnuCansini`

Reglas de negocio principales:

- La edad mínima permitida es 18 años.
- La antigüedad mínima válida es 1.
- Se valida el tipo y rango numérico.
- El formulario no puede enviarse con valores inválidos.

## 15. Manejo de errores

La aplicación gestiona escenarios de error de la siguiente manera:

- Estado de carga (`cargando`) mientras se ejecuta la petición.
- Resultado nulo antes de la respuesta.
- Indicador `errorTecnico` si la API falla.
- Uso de `console.error` para diagnóstico.
- Mensajes de validación visuales sobre los campos.

## 16. Buenas prácticas aplicadas

- separación de responsabilidades entre componente y servicio,
- validación reactiva en el formulario,
- servicios reutilizables y desacoplados,
- uso de patrones modernos de Angular,
- utilización de signals para estados pequeños y rápidos,
- pruebas unitarias para garantizar lógica del formulario y flujo de cálculo.

## 17. Flujo de trabajo recomendado

1. Crear una rama de desarrollo:

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Implementar la funcionalidad.
3. Ejecutar validaciones y pruebas.
4. Generar build de producción.
5. Revisar cambios antes de merge.
6. Subir a la rama correspondiente.

## 18. Riesgos y consideraciones de negocio

Durante el desarrollo del proyecto se identifican varios riesgos y factores que deben gestionarse con atención:

### 18.1. Riesgos funcionales

- Dependencia del backend para la validación final del cálculo.
- Cambios en las reglas de negocio pueden requerir ajustes tanto en frontend como en backend.
- Error de integridad en los datos enviados desde el formulario puede producir resultados inconsistentes.

### 18.2. Riesgos técnicos

- El historial está almacenado en memoria (`signal`), por lo que no persiste tras recarga de página.
- La app no implementa aún persistencia de datos en almacenamiento local o base de datos.
- Si se duplican validaciones entre frontend y backend, puede haber riesgo de divergencia de reglas.
- La aplicación está orientada a un entorno cercano a un microsistema, por lo que su escalabilidad depende de la evolución del backend asociado.

### 18.3. Riesgos de experiencia de usuario

- Si la API responde lento, la interfaz puede percibirse como poco fluida.
- Errores no previstos pueden dejar la app sin feedback claro para el usuario.
- En formularios complejos, la lógica de validación debe mantenerse clara para evitar frustración.

## 19. Limitantes actuales

La solución actual presenta las siguientes limitantes:

- Persistencia limitada del historial: los cálculos se almacenan solo en memoria durante la sesión.
- Dependencia explícita del backend para reglas de cálculo y validación final.
- No hay autenticación ni control de usuarios implementado en esta capa.
- No existe una estrategia formal de caché ni de reintentos para llamadas HTTP fallidas.
- La experiencia de usuario aún es funcional, pero no está optimizada para escenarios masivos o complejidad alta de datos.
- El manejo de errores está centralizado, pero no se integra con un sistema de logging profesional ni monitoreo de producción.

## 20. Alternativas consideradas

Durante la definición del proyecto se evaluaron varias alternativas de implementación:

### 20.1. Implementación con formularios tradicionales

Se consideró una solución basada en formularios simples y lógica directa en componentes. Esta opción reduce la complejidad inicial, pero escala peor cuando el código crece y la validación se vuelve más compleja.

### 20.2. Uso de gestión de estado centralizada

Se evaluó el uso de `NgRx`, `Akita` o un store global para manejar el historial y el resultado del cálculo. Aunque ofrece mayor control en aplicaciones complejas, resultó más pesado para una app de este alcance. La arquitectura actual simplifica el proyecto y mantiene buena mantenibilidad.

### 20.3. Persistencia local en navegador

Se analizó la posibilidad de guardar el historial en `localStorage` o `sessionStorage`. Esta alternativa es viable para persistencia básica y sin backend, pero requiere definir políticas de almacenamiento y limpieza. Si bien es útil, la solución actual prioriza simplicidad y rapidez de desarrollo.

### 20.4. Arquitectura con más capas y separación de dominio

Se contempló una estructura con módulos más formales, modelos de dominio y casos de uso separados. Esto sería adecuado para aplicaciones mucho más grandes, pero resulta excesivo para el alcance actual del proyecto.

## 21. Decisión adoptada

Se decidió implementar una solución con:

- Angular standalone components,
- formularios reactivos,
- servicios inyectados por raíz,
- comunicación HTTP con `HttpClient`,
- historial en memoria con `signal`.

Esta opción ofrece un equilibrio adecuado entre:

- simplicidad,
- rapidez de implementación,
- claridad de código,
- mantenibilidad,
- compatibilidad con Angular 21.

## 22. Recomendaciones futuras

Para mitigar límites y riesgos del proyecto, se recomienda en una siguiente fase:

- persistir el historial en localStorage o backend,
- centralizar alertas y manejo de errores con un servicio global,
- establecer consistencia entre validación frontend y backend,
- incorporar pruebas E2E con Cypress,
- definir una política de caché y reintentos para llamadas HTTP,
- evaluar la necesidad de estado global si la app crece en complejidad.

## 23. Despliegue

La aplicación puede desplegarse en entornos web estáticos o en infraestructura con Node/Angular SSR según el requerimiento del proyecto. Para producción se recomienda:

- configurar variables de entorno,
- validar endpoints del backend,
- revisar permisos y seguridad,
- mantener una build de producción,
- monitorear errores y rendimiento en ambiente real.

## 24. Mantenimiento y evolución

Para mantener el proyecto saludable y escalable, se recomienda:

- revisar dependencias periódicamente,
- refactorizar componentes complejos,
- mantener pruebas automatizadas,
- documentar cambios funcionales,
- validar compatibilidad con el backend y reglas de negocio.

## 25. Resumen ejecutivo

Tarifa Frontend es una aplicación Angular moderna, enfocada en la captura y cálculo de tarifas de seguros o primas. Su diseño actual combina formularios reactivos, servicios HTTP, enrutamiento, componentes standalone y señales para gestionar el historial en memoria. La arquitectura actual permite un desarrollo ordenado, fácil de mantener y adecuado para futuras ampliaciones del sistema.

## 26. Responsable del proyecto

- Frontend: Angular 21
- Estado: en desarrollo
- Repositorio: [adjuntar URL del repositorio]
- Backend asociado: [adjuntar URL o nombre del servicio]

## 27. Contacto

- Equipo de desarrollo: [nombre o responsable]
- Correo: [email]
- Documentación adicional: [ruta o enlace]

Servicio responsable de mantener el historial de cálculos realizados por el usuario. Permite consultar operaciones previas y reutilizar la información si es necesario.

## Lógica de formulario

El formulario normalmente incluye campos como:

- `pnuValcomVeh`: valor comercial del vehículo
- `pnuAntgVeh`: antigüedad del vehículo
- `pnuEdacli`: edad del cliente
- `pnuCansini`: cantidad de siniestros o factor equivalente

Las validaciones típicas contemplan:

- Edad mínima permitida
- Antigüedad mínima válida
- Campo obligatorio
- Números positivos o con rango definido

## Reglas de negocio

La aplicación implementa validaciones para evitar solicitudes inválidas al backend. Ejemplo:

- Si el cliente es menor de 18 años, el formulario no debe ser válido.
- Si la antigüedad es 0 o inválida, debe rechazarse.
- Si el cálculo falla en la API, se debe mostrar un error técnico.
- Si la operación tiene éxito, se debe mostrar el resultado y guardar el historial.

## Manejo de errores

La aplicación debe manejar adecuadamente los siguientes escenarios:

- Error de conexión
- Respuesta fallida del backend
- Validación local del formulario
- Carga en curso
- Resultado vacío

Se recomienda:

- Mostrar mensajes amigables al usuario
- Registrar errores en consola o log de sistema
- No bloquear la interfaz indefinidamente
- Restablecer el estado de carga al finalizar la petición

## Pruebas unitarias

El archivo `tarifa-form.component.spec.ts` valida lo siguiente:

- Se crea el componente correctamente.
- El formulario es inválido cuando está vacío.
- La edad menor a 18 invalida el formulario.
- La antigüedad 0 invalida el formulario.
- El formulario es válido con datos correctos.
- No se llama al servicio si el formulario es inválido.
- La operación exitosa guarda un resultado en el historial.
- Un error del backend activa el estado de error técnico.

Esto ayuda a asegurar que la lógica de validación y la interacción con servicios se mantengan correctas en futuras evoluciones.

## Buenas prácticas recomendadas

- Mantener los componentes pequeños y reutilizables.
- Separar lógica de formulario, servicios y presentación.
- Evitar lógica compleja dentro del template.
- Usar `ReactiveFormsModule` para formularios dinámicos.
- Documentar funciones complejas y servicios.
- Usar nombres claros y consistentes.
- Revisar y mantener pruebas ante cada cambio funcional.

## Flujo de trabajo recomendado

1. Crear una rama de trabajo:
```bash
git checkout -b feature/nueva-funcionalidad
```

2. Desarrollar la funcionalidad.
3. Ejecutar pruebas:
```bash
npm test
```

4. Validar compilación:
```bash
ng build
```

5. Hacer commit:
```bash
git add .
git commit -m "feat: agrega funcionalidad X"
```

6. Subir cambios:
```bash
git push origin feature/nueva-funcionalidad
```

## Despliegue

La aplicación puede desplegarse en entorno local, pruebas o producción usando la configuración de Angular y el servidor web correspondiente. Para despliegues reales, se recomienda:

- Usar variables de entorno adecuadas.
- Validar endpoint del backend.
- Revisar permisos y rutas.
- Mantener build de producción.
- Configurar dominio y certificados si aplica.

## Conclusión

Tarifa Frontend es una aplicación frontend enfocada en la captura, validación y cálculo de tarifas con una experiencia clara para el usuario. Su estructura modular, el uso de formularios reactivos y la separación entre servicios y componentes permiten escalar y mantener la aplicación con mayor seguridad y calidad.

Este README sirve como base documental para el desarrollo del proyecto y puede ampliarse a medida que la aplicación evoluciona.
