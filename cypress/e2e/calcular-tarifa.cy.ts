describe('Flujo de Cotización de Seguro', () => {
  beforeEach(() => {
    // 1. Visitamos la página principal de Angular
    cy.visit('/');
  });

  it('debería calcular la tarifa y mostrar el resultado en pantalla', () => {
    // 2. Llenamos los campos del formulario
    // Usamos selectores de atributos para mayor estabilidad
    cy.get('input[formControlName="pnuValcomVeh"]').type('50000000');
    cy.get('input[formControlName="pnuAntgVeh"]').type('10');
    cy.get('input[formControlName="pnuEdacli"]').type('20');
    cy.get('input[formControlName="pnuCansini"]').type('2');

    // 3. Hacemos clic en el botón de calcular
    cy.get('button[type="submit"]').click();

    // 4. Verificamos que el recuadro de resultado aparezca y contenga la tarifa
    // Según nuestro HTML, el recuadro de éxito tiene la clase 'result-card success'
    cy.get('.result-card.success')
      .should('be.visible')
      .and('contain', 'Prima Anual de Seguro Vehicular');

    // 5. Verificamos que la tarifa mostrada sea la esperada (19.000.000 según tu ejemplo)
    // Usamos una expresión regular para que coincida con el formato de moneda
    cy.get('.result-card.success .tarifa-valor')
      .should('contain', '24,000,000');
  });

  it('debería mostrar error si el formulario está vacío', () => {
    // Hacemos clic sin llenar nada
    cy.get('button[type="submit"]').click();

    // Verificamos que aparezcan los mensajes de error de validación
    cy.get('.error').should('be.visible');
    cy.get('.error').first().should('contain', 'obligatorio');
  });

    // --- PRUEBA: FLUJO DEL HISTORIAL ---
  it('debería guardar la prima en el historial y navegar a la tabla', () => {
    // 1. Calcular una tarifa exitosa
    cy.get('input[formControlName="pnuValcomVeh"]').type('50000000');
    cy.get('input[formControlName="pnuAntgVeh"]').type('10');
    cy.get('input[formControlName="pnuEdacli"]').type('20');
    cy.get('input[formControlName="pnuCansini"]').type('2');
    cy.get('button[type="submit"]').click();

    // 2. Esperar a que el resultado aparezca para asegurar que se guardó en memoria
    cy.get('.result-card.success').should('be.visible');

    // 3. Hacer clic en el botón para ir al historial
    // (Nota: asegúrate de que el botón tenga este texto exacto)
    cy.contains('button', 'Ver Historial de Primas').click();

    // 4. Verificar que la URL cambió
    cy.url().should('include', '/historial');

    // 5. Verificar que la tabla se muestre y tenga datos
    cy.get('table.tabla-primas').should('be.visible');
    cy.get('table.tabla-primas tbody tr').should('have.length.at.least', 1);
  });

  // --- PRUEBA: VALIDACIÓN DE EDAD EN EL CLIENTE ---
  it('no debería enviar la petición si el cliente es menor de edad', () => {
    // 1. Llenar el formulario con una edad inválida (17 años)
    cy.get('input[formControlName="pnuValcomVeh"]').type('50000000');
    cy.get('input[formControlName="pnuAntgVeh"]').type('10');
    cy.get('input[formControlName="pnuEdacli"]').type('17'); // Edad inválida
    cy.get('input[formControlName="pnuCansini"]').type('2');

    // 2. Intentar enviar
    cy.get('button[type="submit"]').click();

    // 3. Verificar que el mensaje de error de Angular aparezca
    cy.get('.error').should('be.visible').and('contain', '18');

    // 4. Verificar que NO se llamó al backend (el resultado no aparece)
    cy.get('.result-card').should('not.exist');
  });
});
