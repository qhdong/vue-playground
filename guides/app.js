var vm = new Vue({
    el: '#app',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!',
        isTyping: false,
        styleObject: {
            color: 'red',
            fontSize: '13px'
        }
    },
    watch: {
        question: function (newQuestion) {
            this.isTyping = true;
            this.answer = 'Waiting for you to stop typing...';
            this.getAnswer();
        }
    },
    methods: {
        getAnswer: _.debounce(
            function () {
                var vm = this;
                if (this.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)';
                    return;
                }
                vm.answer = 'Thinking...';
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer);
                        vm.isTyping = false;
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error;
                    });
            },
            500
        )
    },
    computed: {
        classObject: function () {
            return {
                typing: this.isTyping,

            }
        }
    }
});
