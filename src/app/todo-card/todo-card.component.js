"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var TodoCardComponent = (function () {
    function TodoCardComponent(todoService) {
        this.todoService = todoService;
    }
    TodoCardComponent.prototype.ngOnInit = function () {
    };
    TodoCardComponent.prototype["delete"] = function (id) {
        this.todoService.deleteTodo(id);
    };
    TodoCardComponent.prototype.revert = function (todo) {
        this.todoService.revertTodo(todo);
    };
    return TodoCardComponent;
}());
__decorate([
    core_1.Input()
], TodoCardComponent.prototype, "todo");
TodoCardComponent = __decorate([
    core_1.Component({
        selector: 'app-todo-card',
        templateUrl: './todo-card.component.html',
        styleUrls: ['./todo-card.component.css']
    })
], TodoCardComponent);
exports.TodoCardComponent = TodoCardComponent;
