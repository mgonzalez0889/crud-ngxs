import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../models/Todo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.Typicode.Com/todos');
  }

  deleteTodo( id: number ): Observable<any> {
    return this.http.delete(`https://jsonplaceholder.Typicode.Com/todos/${id} `);
  }

  addTodo( payload: Todo ): Observable<Todo>{
    return this.http.post<Todo>(` https://jsonplaceholder.Typicode.Com/todos`, payload);
  }

  updateTodo( payload: Todo, id: number ): Observable<Todo> {
    return this.http.put<Todo>(`https://jsonplaceholder.Typicode.Com/todos/${id}`, payload);
  }

}
