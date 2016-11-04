var usersRef = firebase.database().ref('users');

var app = new Vue({
    el: '#app',
    data: {
        newUser: {
            name: '',
            email: ''
        },
        emailRE: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    firebase: {
        users: usersRef
    },
    computed: {
        validation: function () {
            return {
                name: !!this.newUser.name.trim(),
                email: this.emailRE.test(this.newUser.email)
            }
        },
        isValid: function () {
            var validation = this.validation;
            return Object.keys(validation).every(function (key) {
                return validation[key];
            })
        }
    },
    methods: {
        addUser: function () {
            if (this.isValid) {
                usersRef.push(this.newUser);
                this.newUser.name = '';
                this.newUser.email = '';
            }
        },
        removeUser: function (user) {
            usersRef.child(user['.key']).remove();
        }
    }
});