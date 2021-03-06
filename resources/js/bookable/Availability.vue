<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <span
                v-if="noAvailability"
                class="text-danger"
            >
                (NOT AVAILABLE)
            </span>
            <span
                v-if="hasAvailability"
                class="text-success"
            >
                (AVAILABLE)
            </span>
        </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    type="text"
                    name="from"
                    class="form-control form-control-sm"
                    placeholder="Start Date"
                    v-model="from"
                    @keyup.enter="check"
                    :class="[
                        {
                            'is-invalid': this.errorFor('from'),
                        }
                    ]"
                >
                <div
                    :key="from + index"
                    class="invalid-feedback"
                    v-text="error"
                    v-for="(error, index) in this.errorFor('from')"
                ></div>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    type="text"
                    name="to"
                    class="form-control form-control-sm"
                    placeholder="End Date"
                    v-model="to"
                    @keyup.enter="check"
                    :class="[
                        {
                            'is-invalid': this.errorFor('to'),
                        }
                    ]"
                >
            </div>
        </div>
        <button
            class="btn btn-secondary btn-block"
            @click="check"
            :disabled="loading"
        >
            Check
        </button>
    </div>
</template>

<script>
export default {
    props: {
        bookableId: String,
    },

    data() {
        return {
            from: null,
            to: null,
            loading: false,
            status: null,
            errors: null,
        }
    },

    computed: {
        hasErrors() {
            return this.status === 422 && this.errors !== null;
        },
        hasAvailability() {
            return 200 === this.status;
        },
        noAvailability() {
            return 404 === this.status;
        },
    },

    methods: {
        check() {
            this.loading = true;
            this.errors = null;
            axios
                .get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
                .then(res => {
                    this.status = res.status;
                })
                .catch(err => {
                    if (422 === err.response.status) {
                        this.errors = err.response.data.errors;
                    }
                    this.status = err.response.status;
                })
                .then(() => {
                    this.loading = false;
                })
            ;
        },
        errorFor(field) {
            return this.hasErrors && this.errors[field] ?
                this.errors[field] :
                null;
        },
    },
}
</script>

<style lang="scss" scoped>
    label {
        font-size: 0.7em;
        text-transform: uppercase;
        color: gray;
        font-weight: bolder;
    }

    .is-invalid {
        border-color: #b22222;
        background-image: none;
    }

    .invalid-feedback {
        color: #b22222;
    }
</style>