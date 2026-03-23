import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:5289/api/Categories';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {})
  }
}
