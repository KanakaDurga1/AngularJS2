"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var todo_1 = require("./models/todo");
var TodoService = (function () {
    function TodoService(http) {
        this.http = http;
        this.baseURL = 'https://doit-5db57.firebaseio.com/todo';
        this.todoListSub = new rxjs_1.BehaviorSubject([]);
        this.todoList$ = this.todoListSub.asObservable();
        this.fetchAllTodos();
    }
    TodoService.prototype.fetchAllTodos = function () {
        var _this = this;
        var todoList = [];
        return this.http.get(this.baseURL + ".json")
            .subscribe(function (data) {
            var resp = data.json();
            var keysArr = Object.keys(resp);
            for (var i = 0; i < keysArr.length; i++) {
                var key = keysArr[i];
                var todoRspObj = resp[key];
                var todoModel = new todo_1.Todo(todoRspObj.title, todoRspObj.category, key, todoRspObj.isDone, todoRspObj.endDate);
                todoList.push(todoModel);
            }
            console.log(todoList);
            _this.todoListSub.next(todoList);
        });
    };
    TodoService.prototype.addTaskToProjects = function (taskName) {
        this.postTask(new todo_1.Todo(taskName, 'project'));
    };
    TodoService.prototype.addTaskToPersonal = function (taskName) {
        this.postTask(new todo_1.Todo(taskName, 'personal'));
    };
    TodoService.prototype.postTask = function (todo) {
        var _this = this;
        this.http.post(this.baseURL + ".json", todo)
            .subscribe(function (data) {
            // console.log(data.json());
            todo.id = data.json().name;
            var todoList = _this.todoListSub.getValue();
            todoList.push(todo);
            _this.todoListSub.next(todoList);
        }, function (err) {
            console.log(err);
        });
    };
    TodoService.prototype.deleteTodo = function (id) {
        var _this = this;
        this.http["delete"](this.baseURL + "/" + id + ".json")
            .subscribe(function (res) {
            console.log(res.json());
            // Delete the Object
            var todoList = _this.todoListSub.getValue();
            _.remove(todoList, function (todo) { return todo.id === id; });
            _this.todoListSub.next(todoList);
        });
    };
    TodoService.prototype.markTodoAsDone = function (todo) {
        var _this = this;
        // todo.isDone = true;
        // todo.endDate = Date.now();
        var updatedTodo = Object.assign({}, todo);
        updatedTodo.isDone = true;
        updatedTodo.endDate = Date.now();
        this.http.put(this.baseURL + "/" + todo.id + ".json", updatedTodo)
            .subscribe(function (res) {
            console.log(res.json());
            var respTodo = res.json();
            var todoList = _this.todoListSub.getValue();
            todoList.forEach(function (todo) {
                if (todo.id === respTodo.id) {
                    todo.isDone = true;
                    todo.endDate = respTodo.endDate;
                }
            });
            _this.todoListSub.next(todoList);
        });
    };
    TodoService.prototype.revertTodo = function (todo) {
        var _this = this;
        var updatedTodo = Object.assign({}, todo);
        updatedTodo.isDone = false;
        updatedTodo.endDate = 0;
        this.http.put(this.baseURL + "/" + todo.id + ".json", updatedTodo)
            .subscribe(function (res) {
            console.log(res.json());
            var respTodo = res.json();
            var todoList = _this.todoListSub.getValue();
            todoList.forEach(function (todo) {
                if (todo.id === respTodo.id) {
                    todo.isDone = false;
                    todo.endDate = 0;
                }
            });
            _this.todoListSub.next(todoList);
        });
    };
    return TodoService;
}());
TodoService = __decorate([
    core_1.Injectable()
], TodoService);
exports.TodoService = TodoService;
