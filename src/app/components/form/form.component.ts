import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Todo} from '../../models/Todo';
import {TodoState} from '../../core/root-states/state/todo.state';
import {Select, Store} from '@ngxs/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Todos} from '../../core/root-states/state/todo.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Select (TodoState.getSelectedTodo) selectedTodo: Observable<Todo>;
  todoForm: FormGroup;
  public editTodo = false;
  private formSubcription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private store: Store,
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.formSubcription.add(
      this.selectedTodo.subscribe(todo => {
        if (todo) {
          this.todoForm.patchValue({
            id: todo.id,
            userId: todo.userId,
            title: todo.title
          });
          this.editTodo = true;
        }else {
          this.editTodo = false;
        }
      })
    );
  }

  createForm(): void {
    this.todoForm = this.fb.group({
      id: [''],
      userId: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.editTodo) {
      this.formSubcription.add(
        this.store.dispatch(new Todos.UpdateTodo(this.todoForm.value, this.todoForm.value.id)).subscribe(() => {
          this.clearForm();
        })
      );
    }else {
      this.formSubcription.add(
        this.formSubcription = this.store.dispatch(new Todos.AddTodo(this.todoForm.value)).subscribe(() => {
          this.clearForm();
        })
      );
    }
  }

  clearForm(): void {
    this.todoForm.reset();
    this.store.dispatch(new Todos.SetSelectTodo(null));
  }

}
