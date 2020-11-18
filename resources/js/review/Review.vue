<template>
    <div>
        <div class="form-group">
            <label class="text-muted">Select the star rating</label>
            <star-rating
                :rating="5"
                class="fa-3x"
            ></star-rating>
        </div>
        <div class="form-group">
            <label for="content" class="text-muted">Describe your experience with</label>
            <textarea name="content" cols="30" rows="10" class="form-control"></textarea>
        </div>
        <button class="btn-lg btn-primary btn-block">Submit</button>
    </div>
</template>