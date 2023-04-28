<script setup lang="ts">
    import { ref } from 'vue';
    import router from '@/router';
    import { deleteProduct, getProducts, type Product } from '../../model/products'

    const products = ref<Product[]>([]);

    getProducts().then((data) => {
      products.value = data.data;
    })

    const submitDelete = (id: number) => {
        //show modal 
        deleteProduct(id)
          .then((data) => {
            console.log(data);
          });
    }

    

</script>

<template>
    <div class="section mx-5">

      <router-link to='/admin/products/edit/'>
        <div class="button is-link is-light" id="add-btn" >
            <i class="fa-solid fa-plus fa-2x"></i>
        </div>
      </router-link>

    <div class="columns is-variable is-8">
      <div class="column is-one-fifth">
          <!--Sidebar-->
      </div>
      <div class="column">
        <div class="container has-text-centered">
          <div class="notification is-info">
            <div class="flex-container">
              <p class="subtitle is-6 ">
                All of the products offered by eLogger
              </p>
            </div>           
          </div>
          <div class="is-flex is-justify-content-center">
            <table class="table">
              <thead>
                <tr class="has-text-centered">
                  <th class="has-text-centered">Photo</th>
                  <th class="has-text-centered">Title</th>
                  <th class="has-text-centered">Price</th>
                  <th class="has-text-centered">Category</th>
                  <th class="has-text-centered">Stock</th>
                  <th class="has-text-centered">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in products" :key="index">
                  <td>
                    <img :src="product.thumbnail" class="table-photo">
                  </td>
                  <td>{{ product.title }}</td>
                  <td>${{ product.price }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.stock }}</td>
                  <td>
                    <div class="field is-grouped">
                      <router-link :to="'/admin/products/edit/' + product._id" class="button" >
                        <i class="fas fa-edit"></i>
                      </router-link>

                      <button class="button" @click="submitDelete(product._id)" >
                          <div class="icon">
                              <i class="fas fa-trash"></i>
                          </div>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <span class="has-text-primary">.</span>
        </div>
      </div>
    </div>
    </div>
  </template>
  
<style scoped>
  
</style>