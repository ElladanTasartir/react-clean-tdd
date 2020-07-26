import React from 'react';
import { render } from '@testing-library/react';
import Login from './login';

describe('Login Component', () => {
  it('Should start with initial state', () => {
    const { getByTestId } = render(<Login />);
    // Caso, o elemento que tentamos pegar em tela não consiga ser pego
    // Ele crasha o teste, ao invés de falhar
    const errorWrap = getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
    const passwordStatus = getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
