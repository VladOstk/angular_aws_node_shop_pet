import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url) =>
        this.http.put(url, file, {
          headers: {
            /* eslint-disable @typescript-eslint/naming-convention */
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const url = this.getUrl('import', 'import');
    const authorization_token = localStorage.getItem('authorization_token');
    let httpHeaders = new HttpHeaders();

    if (authorization_token) {
      httpHeaders = httpHeaders.set(
        'Authorization',
        'Basic ' + btoa(authorization_token)
      );
    }

    return this.http.get(url, {
      params: {
        name: fileName,
      },
      headers: httpHeaders,
      responseType: 'text',
    });
  }
}
