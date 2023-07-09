<template>
    <div>
        <v-card :to="'/book/' + book.slug">
            <v-img :src="getImage(book.cover)" class="text-white align-end">
                <v-card-title class="fill-height text-wrap" height="200px">
                    {{ book.title }}
                </v-card-title>
            </v-img>
            <v-card-actions>
                <v-icon>mdi-cash</v-icon>
                <span class="text-blue"> Rp. {{ book.price.toLocaleString('id-ID') }} </span>
                <v-spacer></v-spacer>
                <v-icon>mdi-eye</v-icon> {{ book.views }}
            </v-card-actions>
        </v-card>
    </div>
</template>
<script setup>

const props = defineProps({
    book: Object
})

function getImage(image) {
    if (image != null && image.length > 0) {
        return "http://localhost/apishop/" + image
    }

    return "/img/unavailable.png"
}
</script>