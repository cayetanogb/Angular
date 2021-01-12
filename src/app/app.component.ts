import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component } from '@angular/core';
import { Model, TodoItem } from "./model";

@Component({
  selector: 'todo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  model;

  constructor() { }

  ngOnInit(): void {
    this.model = new Model();
    this.model.filtro = this.model.items;
  }

  getName() {
    return this.model.user;
  }

  getTodoItems() {
    return this.model.filtro;
  }

  addItem(newItem) {
    if (newItem != "") {
    this.model.items.push(new TodoItem(newItem, false));
    }
  }

  botonEliminar(elem: TodoItem) {
    const indexFound = this.model.items.findIndex((item) => item.action === elem.action);

    if (indexFound >= 0) {
      this.model.items.splice(indexFound, 1);
    }
  }

  filtro(list: string) {
    let tarea;

    switch (list) {
      case 'listIncomplete':
        tarea = this.model.items.filter(item => !item.done);
        break;
      case 'listComplete':
        tarea = this.model.items.filter(item => item.done);
        break;
      case 'listTodo':
        tarea = this.model.items;
        break;
    }

    this.model.filtro = tarea;
  }
}
