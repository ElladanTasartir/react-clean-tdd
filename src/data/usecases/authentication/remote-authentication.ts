import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { AuthenticationParams } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    await this.httpClient.post({
      url: this.url,
      body: params
    });
  }
}
