describe('Autenticação', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('deve exibir página de login', () => {
    cy.get('h1').should('contain', 'Login');
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('deve mostrar erro com credenciais inválidas', () => {
    cy.get('input[type="email"]').type('usuario@invalido.com');
    cy.get('input[type="password"]').type('senha123');
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="error-message"]')
      .should('exist')
      .and('contain', 'Email ou senha inválidos');
  });

  it('deve fazer login com sucesso', () => {
    cy.get('input[type="email"]').type('usuario@teste.com');
    cy.get('input[type="password"]').type('senha123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-menu"]').should('exist');
  });

  it('deve fazer logout com sucesso', () => {
    // Login primeiro
    cy.login('usuario@teste.com', 'senha123');

    // Verificar se está logado
    cy.url().should('include', '/dashboard');

    // Fazer logout
    cy.get('[data-testid="user-menu"]').click();
    cy.get('[data-testid="logout-button"]').click();

    // Verificar se voltou para login
    cy.url().should('include', '/login');
  });

  it('deve redirecionar para login em rotas protegidas', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

  it('deve permitir recuperação de senha', () => {
    cy.get('[data-testid="forgot-password"]').click();
    cy.url().should('include', '/reset-password');

    cy.get('input[type="email"]').type('usuario@teste.com');
    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="success-message"]')
      .should('exist')
      .and('contain', 'Email de recuperação enviado');
  });
}); 