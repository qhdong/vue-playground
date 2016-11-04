Vue.component('grid-table', {
    template: '#grid-template',
    replace: true,
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    computed: {
        filteredData: function () {
            var data = this.data;
            var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var sortKey = this.sortKey;
            var order = this.sortOrders[sortKey] || 1;
            if (filterKey) {
                data = data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                    });
                });
            }
            if (sortKey) {
                data = data.slice().sort(function (a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }
            return data;
        }
    },
    data: function () {
        var sortOrders = {};
        this.columns.forEach(function (key) {
            sortOrders[key] = 1;
        });
        return {
            sortKey: '',
            sortOrders: sortOrders
        };
    },
    filters: {
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    methods: {
        sortBy: function (key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
        }
    }
});

var vm = new Vue({
    'el': '#app',
    data: {
        searchQuery: '',
        gridColumns: ['name', 'age', 'power'],
        gridData: [
            { name: 'Chuck Norris', age: 45, power: Infinity },
            { name: 'Bruce Lee', age: 50, power: 9000 },
            { name: 'Jackie Chan', age: 60, power: 7000 },
            { name: 'Jet Li', age: 49, power: 8000 }
        ]
    }
});