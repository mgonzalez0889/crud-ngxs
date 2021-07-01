import {Todo} from '../../../models/Todo';

// tslint:disable-next-line:no-namespace
export namespace Todos {

  export class AddTodo {
    static readonly type = '[Todo] Add ';
    constructor(public payload: Todo) {
    }
  }

  export class GetTodos {
    static readonly type = '[Todo] Get';
  }

  export class UpdateTodo {
    static readonly type = '[Todo] Update';
    constructor(public payload: Todo, public id: number) {
    }
  }

  export class DeleteTodo {
    static readonly type = '[Todo] Delete';
    constructor(public id: number) {
    }
  }

  export class SetSelectTodo {
    static readonly type = '[Todo] Set';
    constructor(public payload: Todo) {
    }
  }
}
