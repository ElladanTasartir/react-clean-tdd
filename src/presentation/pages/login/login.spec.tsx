import React from 'react';
import faker from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react';
import Login from './login';
import { ValidationStub } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationStub} />);
  return { sut, validationStub };
};

describe('Login Component', () => {
  afterEach(cleanup);

  it('Should start with initial state', () => {
    const { sut, validationStub } = makeSut();
    // Caso, o elemento que tentamos pegar em tela não consiga ser pego
    // Ele crasha o teste, ao invés de falhar
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
