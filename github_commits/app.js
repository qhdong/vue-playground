var commitItem = {
    template: '<li>\
    <a :href="htmlURL" target="_blank" class="commit">{{ sha }}</a>\
    - <span class="message">{{ message | truncate }}</span><br>\
    by <span class="author"><a :href="authorURL" target="_blank">{{ authorName }}</a></span>\
    at <span class="date">{{ date | formatDate }}</span>\
    </li>',
    props: ['record'],
    filters: {
        truncate: function (v) {
            var newline = v.indexOf('\n');
            return newline > 0 ? v.slice(0, newline) : v;
        },
        formatDate: function (v) {
            return v.replace(/T|Z/g, ' ');
        }
    },
    computed: {
        htmlURL: function () {
            return this.record.html_url;
        },
        sha: function () {
            return this.record.sha.slice(0, 7);
        },
        message: function () {
            return this.record.commit.message;
        },
        authorURL: function () {
            return this.record.author.html_url;
        },
        authorName: function () {
            return this.record.commit.author.name;
        },
        date: function () {
            return this.record.commit.author.date;
        }
    }
};

Vue.component('github-commit', {
    template: '\
    <div>\
        <h1>Latest {{ repo }} Commits</h1>\
        <p>{{ org }}/{{ repo }}@{{ sha }}</p>\
        <ul>\
            <commit-item v-for="record in commits" :record="record"></commit-item>\
        </ul>\
    </div>\
    ',
    props: ['org', 'repo', 'perPage', 'sha'],
    components: {
        'commit-item': commitItem
    },
    data: function () {
        return {
            commits: null
        }
    },
    created: function () {
        this.fetchData();
    },
    computed: {
        apiURL: function () {
            return `https://api.github.com/repos/${this.org}/${this.repo}/commits?per_page=${this.perPage}&sha=${this.sha}`;
        }
    },
    watch: {
        apiURL: 'fetchData'
    },
    methods: {
        fetchData: function () {
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', self.apiURL);
            xhr.onload = function () {
                self.commits = JSON.parse(xhr.responseText);
                console.log(self.commits[0].html_url)
            };
            xhr.send();
        }
    }
});


var vm = new Vue({
    el: '#app',
    data: {
        org: 'vuejs',
        repo: 'vue',
        sha: 'master',
        perPage: '3'
    }
});