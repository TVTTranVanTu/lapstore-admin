import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IIventory } from 'src/app/models/inventory.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private http: HttpClient, private router: Router) {}

  getInventory() {
    return this.http.get<any>(environment.api_url + 'inventory');
  }

  updateInventory(id: string, data: any) {
    return this.http.put<any>(environment.api_url + 'inventory/' + id, data);
  }

  deleteInventory(id: string) {
    return this.http.delete<any>(environment.api_url + 'inventory/' + id);
  }

  getInventoryById(id: string) {
    return this.http.get<IIventory>(environment.api_url + 'inventory/' + id);
  }

  getUser(id: string | null) {
    return this.http.get<{ user: User }>(
      environment.api_url + 'auth/users/' + id
    );
  }
}
