<template>
    <div v-if="loading">Data is loading...</div>
    <div v-else>
        <div
            class="row mb-4"
            v-for="row in rows"
            :key="`row${row}`"
        >
            <div
                class="col d-flex align-items-stretch"
                v-for="(bookable, column) in bookablesInRow(row)"
                :key="`bookable-x${row}-y${column}`"
            >
                <bookable-list-item
                    v-bind="bookable"
                ></bookable-list-item>
            </div>
            <div
                class="col"
                v-for="(placeholder, column) in placeholdersInRow(row)"
                :key="`placeholder-x${row}-y${column}`"
            ></div>
        </div>
    </div>
</template>

<script>
import BookableListItem from './BookableListItem';

export default {
    components: {
        BookableListItem,
    },
    data() {
        return {
            bookables: null,
            loading: false,
            columns: 3,
        }
    },
    computed: {
        rows() {
            return !this.bookables ?
                0 :
                Math.ceil(this.bookables.length / this.columns);
        },
    },
    methods: {
        bookablesInRow(row) {
            return this.bookables.slice((row - 1) * this.columns, row * this.columns);
        },
        placeholdersInRow(row) {
            return this.columns - this.bookablesInRow(row).length;
        },
    },
    created() {
        this.loading = true;
        const p = new Promise((resolve, reject) => {
            console.log(resolve);
            console.log(reject);
            setTimeout(() => {
                reject('hello')
            }, 3000)
        }).then(result => {
            console.log(`success ${result}`)
        }).catch(error => {
            console.log(`error ${error}`)
        });
        const request = axios
            .get("/api/bookables")
            .then(response => {
                this.bookables = response.data.data;
                this.loading = false;
            });
        console.log(request);
    }
}
</script>