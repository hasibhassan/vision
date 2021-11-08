import React from 'react'
import { render, screen } from '@testing-library/react'
import ForgotPassword from '@sections/ForgotPassword/ForgotPassword'

describe('Forgot password screen', () => {
  it('renders Forgot Password heading', () => {
    render(<ForgotPassword />)

    const heading = screen.getByRole('heading', {
      level: 2,
    })

    expect(heading).toBeInTheDocument()
  })
})
