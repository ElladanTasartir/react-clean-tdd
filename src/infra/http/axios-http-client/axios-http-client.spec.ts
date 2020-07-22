import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';
import { mockAxios } from '@/infra/test';
import { mockPostRequest } from '@/data/test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
};

describe('AxiosHttpClient', () => {
  it('Should call Axios with correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());
    // Pegamos aqui o mockresolvedValue inserido no post
    // Se fosse o rejected value, seria o índice 1
    // Pelo mockedresolvedValue retornar uma promise, se compararmos
    // O valor de forma síncrona, ele irá dar erro, por isso
    // Podemos ao invés disso, capturar a promise do post, sem o await
    // E comparar essa promise com a promise retornada pelo mockedresolvedValue
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
