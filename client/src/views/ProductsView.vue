<script setup lang="ts">
    import { ref } from 'vue';
    import { getProducts } from '../model/products'
    const products = ref(getProducts());

    let isModalActive = ref(false);
    let productModal = {};

    function toggleModal(title, price, description, thumbnail) {
        productModal = {
            thumbnail: thumbnail,
            title: title,
            description: description,
            price: price
        }
        isModalActive.value = !isModalActive.value;
    }
</script>

<template>
    <div class="section">
        <h1 class="title">
            What would you like to buy?
        </h1>
        <h2 class="subtitle">
            If you got here then you are logged in
        </h2>
        <div class="product-list">
            <div class="product box" v-for="product in products" :key="product.id">
                <a @click="toggleModal(product.title, product.price, product.description, product.thumbnail)">
                    <img :src="product.thumbnail" alt="product-image" style="border-radius: 15px;" />
                    <h1 class = 'title is-4 '>{{ product.title }}</h1>
                    <p class = 'subtitle is-6'>{{ product.description }}</p>
                </a>
                <div class="modal" :class="{'is-active': isModalActive}"> 
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="box">
                            <img :src="productModal.thumbnail" alt="product-image" />
                            <h1 class = 'title is-4 '>{{ productModal.title }}</h1>
                            <p class = 'subtitle is-6'>{{ productModal.description }}</p>
                            <p class = 'subtitle is-6 has-text-weight-bold'>${{ productModal.price }}.00</p>
                        </div>
                    </div>
                <button class="modal-close is-large" @click="isModalActive=false" aria-label="close"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .product-list > .box {
        width: 250px;
        max-height: 530px;
    }

    .modal-content > .box {
        margin: 0 auto;
        width: 300px;
        height: fit-content;
    }

    .product-list {
        display: flex;
        flex-wrap: wrap;     
        gap: 25px;
        justify-content: center;   
    }

</style>