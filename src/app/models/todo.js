"use strict";
exports.__esModule = true;
var Todo = (function () {
    function Todo(title, category, id, isDone, endDate) {
        if (id === void 0) { id = ''; }
        if (isDone === void 0) { isDone = false; }
        if (endDate === void 0) { endDate = 0; }
        this.isDone = isDone;
        this.createdDate = new Date().getTime();
        this.title = title;
        this.category = category;
        this.id = id;
        this.endDate = endDate;
    }
    return Todo;
}());
exports.Todo = Todo;
