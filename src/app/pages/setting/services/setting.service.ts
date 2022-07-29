import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { catchError, of, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { environment } from 'src/environments/environment';
import { IBrand } from 'src/app/models/brand.model';
import { id } from 'date-fns/locale';

@Injectable({ providedIn: 'root' })
export class SettingService {
  private user!: User;

  constructor(private http: HttpClient, private router: Router) {}

  getLocation() {
    return fromFetch(environment.province_api).pipe(
      switchMap((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError((err) => {
        return of({ error: true, message: err.message });
      })
    );
  }

  getUser(id: string | null) {
    return this.http.get<{ user: User }>(
      environment.api_url + 'auth/users/' + id
    );
  }

  editUserInfor(id: string | null, data: any) {
    return this.http.post<any>(environment.api_url + 'auth/users/' + id, data);
  }

  getBrands() {
    return this.http.get<any>(environment.api_url + 'brands');
  }

  getCategories() {
    return this.http.get<any>(environment.api_url + 'category');
  }

  getSubCategories(id: string) {
    return this.http.get<any>(environment.api_url + 'subcategory/CT/' + id);
  }

  editBrand(id: string, data: any) {
    return this.http.put<any>(environment.api_url + 'brands/' + id, data);
  }

  addBrand(data: IBrand) {
    return this.http.post<any>(environment.api_url + 'brands', data);
  }

  changeActiveBrand(id: string, data: any) {
    return this.http.put<any>(
      environment.api_url + 'brands/active/' + id,
      data
    );
  }
}
