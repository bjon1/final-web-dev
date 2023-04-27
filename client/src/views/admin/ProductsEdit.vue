<script setup lang="ts">
    import router from '@/router';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { getProduct, addProduct, updateProduct, type Product } from '../../model/products'

    const route = useRoute();
    const product = ref<Product>({} as Product);
    const productId = +route.params.id;
    
    getProduct(productId)
        .then((data) => {
            product.value = data.data ?? {} as Product;
    })

    const submitAdd = () => {
        addProduct(product.value)
            .then((data) => {
                console.log(data);
            });    

        console.log("Product Added");
        router.push('/admin/products');
        
    }

    const submitUpdate = () => {
        updateProduct(productId, product.value)
            .then((data) => {
                console.log(data);
        });   
        console.log("Product Updated");
        router.push('/admin/products');
    }
</script>

<template>
    <div class="section mx-5">
        <div class="columns is-variable is-8">
            <div class="column is-one-fifth">
                <!--Sidebar-->
            </div>
            <div class="column">
                <div class="admin-product-edit">
                    <h1 class="title" v-if="product.id">Edit Product</h1>
                    <h1 class="title" v-else>Add New Product</h1>
                    <div class="field">
                        <label class="label">Title</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Title" v-model="product.title">
                        </div>

                        <div class="field">
                            <label class="label">Description</label>
                            <div class="control">
                                <textarea class="textarea" placeholder="Description" v-model="product.description"></textarea>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Price</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="Price" v-model="product.price">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Category</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Category" v-model="product.category">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Brand</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Brand" v-model="product.brand" >
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Stock</label>
                            <div class="control">
                                <input class="input" type="number" placeholder="Stock" v-model="product.stock">
                            </div>
                        </div>

                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-link" @click="() => submitUpdate()" v-if="product.id">Update</button>
                                <button class="button is-link" @click="() => submitAdd()" v-else>Add</button>
                            </div>
                            <div class="control">
                                <button class="button is-light" @click="() => router.push('/admin/products')">Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>   
            </div>
        </div>
    </div>
   
</template>

<style scoped>

</style>