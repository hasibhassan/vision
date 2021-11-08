describe('e2eTestVision', () => {
  it('Auth flow', () => {
    cy.visit('/profile')

    cy.contains('Need an account?').click()

    cy.location('pathname').should('eq', '/signup')

    // Create Account
    cy.signup('admin@admin.com', 'Password1')

    cy.wait(8000)

    cy.get('nav').contains('Settings').click()

    // Sign out of account
    cy.contains('Sign Out').click()

    cy.wait(8000)

    cy.visit('/profile')

    // Log back in
    cy.login('admin@admin.com', 'Password1')

    // Delete Account
    cy.contains('Delete Account').click()
  })
})
