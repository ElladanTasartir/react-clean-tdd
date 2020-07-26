import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Login from './login';

type SutTypes = {
  sut: RenderResult
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />);
  return { sut };
};

describe('Login Component', () => {
  it('Should start with initial state', () => {
    const { sut } = makeSut();
    // Caso, o elemento que tentamos pegar em tela não consiga ser pego
    // Ele crasha o teste, ao invés de falhar
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
