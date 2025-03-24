import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UpdateAddressDto, UpdateLanguageDto, UpdateThemeDto, UserEntity } from '@zenith-erp/shared-types';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly urlBase = `${environment.apiUrl}/users`;
  private readonly httpClient = inject(HttpClient);

  public usersGetAll(): Observable<UserEntity[]> {
    return this.httpClient.get<UserEntity[]>(this.urlBase);
  }

  public usersGet(id: string): Observable<UserEntity> {
    return this.httpClient.get<UserEntity>(`${this.urlBase}/${id}`);
  }

  public usersDelete(id: string): Observable<UserEntity> {
    return this.httpClient.delete<UserEntity>(`${this.urlBase}/${id}`);
  }

  public usersUpdateLanguage(language: UpdateLanguageDto): Observable<void> {
    return this.httpClient.patch<void>(`${this.urlBase}/language`, language);
  }

  public usersUpdateTheme(theme: UpdateThemeDto): Observable<void> {
    return this.httpClient.patch<void>(`${this.urlBase}/theme`, theme);
  }

  public usersUpdateAddress(address: UpdateAddressDto): Observable<void> {
    return this.httpClient.patch<void>(`${this.urlBase}/address`, address);
  }
}
