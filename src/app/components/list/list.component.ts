import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../../models/Todo';
import {TodoState} from '../../core/root-states/state/todo.state';
import {Select, Store} from '@ngxs/store';
import {Todos} from '../../core/root-states/state/todo.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Select (TodoState.getTodoList) todos: Observable<Todo[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new Todos.GetTodos());
  }

  deleteTodo(id: number): void {
    this.store.dispatch(new Todos.DeleteTodo(id));
  }

  editTodo(payload: Todo): void {
    console.log(payload);
    this.store.dispatch(new Todos.SetSelectTodo(payload));
  }

}
