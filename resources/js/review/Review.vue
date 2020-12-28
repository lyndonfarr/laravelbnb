<template>
    <div>
        <div v-if="loading">
            <h3>Loading...</h3>
        </div>
        <div v-else-if="alreadyReviewed">
            <h3>You've already left a review for this booking!</h3>
        </div>
        <div v-else>
            <div class="form-group">
                <label class="text-muted">Select the star rating</label>
                <star-rating
                    class="fa-3x"
                    v-model="review.rating"
                ></star-rating>
            </div>
            <div class="form-group">
                <label for="content" class="text-muted">Describe your experience with</label>
                <textarea
                    name="content"
                    cols="30"
                    rows="10"
                    class="form-control"
                    v-model="review.content"
                ></textarea>
            </div>
            <button class="btn-lg btn-primary btn-block">Submit</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            review: {
                rating: 5,
                content: null,
            },
            existingReview: null,
            loading: false,
        }
    },

    computed: {
        alreadyReviewed() {
            return !!this.existingReview;
        },
    },

    created() {
        this.loading = true;
        axios
            .get(`/api/reviews/${this.$route.params.id}`)
            .then(res => this.existingReview = res.data.data)
            .catch(err => {})
            .then(() => this.loading = false)
        ;
    },
}
</script>