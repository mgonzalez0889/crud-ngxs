import { Injectable } from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Todos} from './todo.actions';
import {Todo} from '../../../models/Todo';
import {TodoService} from '../../../services/todo.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

export class TodoStateModel {
  public todos: Todo[];
  selectedTodo: Todo;
}

const defaults: TodoStateModel = {
  todos: [],
  selectedTodo: undefined
};


@State<TodoStateModel>({
  name: 'todos',
  defaults
})
@Injectable()
export class TodoState {

  constructor(private todoService: TodoService) {
  }

  @Selector()
  static getTodoList(state: TodoStateModel): Todo[] {
    return state.todos;
  }

  @Selector()
  static getSelectedTodo(state: TodoStateModel): Todo {
    return state.selectedTodo;
  }

  @Action(Todos.GetTodos)
  getTodos({ getState, setState }: StateContext<TodoStateModel> ): Observable<any> {
    return this.todoService.fetchTodos().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          todos: result
        });
      }));
  }

  @Action(Todos.AddTodo)
  addTodo({getState, patchState}: StateContext<TodoStateModel>, {payload}: Todos.AddTodo): Observable<any> {
    return this.todoService.addTodo( payload ).pipe(
      tap(result => {
        const state = getState();
        patchState({
          todos: [...state.todos, result]
        });
      }));
  }

  @Action(Todos.UpdateTodo)
  updateTodo({getState, setState}: StateContext<TodoStateModel>, {payload, id}: Todos.UpdateTodo): Observable<any> {
    return this.todoService.updateTodo(payload, id).pipe(
      tap(result => {
        const state = getState();
        const todoList = [...state.todos];
        const todoIndex = todoList.findIndex(item => item.id === id);
        todoList[todoIndex] = result;
        setState({
          ...state,
          todos: todoList,
        });
      }));
  }

  @Action(Todos.DeleteTodo)
  deleteTodo({getState, setState}: StateContext<TodoStateModel>, {id}: Todos.DeleteTodo): Observable<any>{
    return this.todoService.deleteTodo(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.todos.filter(item => item.id !== id);
        setState({
          ...state,
          todos: filteredArray,
        });
      }));
  }

  @Action(Todos.SetSelectTodo)
  setSelectedTodoId({getState, setState}: StateContext<TodoStateModel>, {payload}: Todos.SetSelectTodo) {
    const state = getState();
    setState({
      ...state,
      selectedTodo: payload
    });
  }

}
