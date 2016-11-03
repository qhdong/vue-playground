Vue.component('todo-item', {
    template: '\
    <li>\
        {{ title }}\
        <button @click="$emit(\'remove\')">X</button>\
    </li>\
    ',
    props: ['title']
});

var vm = new Vue({
    el: '#todolist',
    data: {
        newTodoText: '',
        todos: [
            'wash dishes',
            'clean window'
        ],
        inputNumber: 0
    },
    methods: {
        addTodoText: function () {
            this.todos.push(this.newTodoText);
            this.newTodoText = '';
        }
    }
});