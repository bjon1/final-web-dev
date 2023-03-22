<script setup lang="ts">
  import database from '../../data/database.json'
  import database2 from '../../data/exercises.json'
</script>

<template>
  <div class="section">
    <div class="container has-text-centered">
      <div class="notification is-link">
        <p class="subtitle is-6">
          All of the registered users for the site and their activity. <b>Admins only.</b>
        </p>
      </div>
      <div class="is-flex is-justify-content-center">
        <table class="table">
          <thead>
            <tr class="has-text-centered">
              <th class="has-text-centered">Photo</th>
              <th class="has-text-centered">Name</th>
              <th class="has-text-centered">Email</th>
              <th class="has-text-centered">Role*</th>
              <th>
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in database.users" :key="index">
              <td>
                <img :src="user.photo" style="height: 100px">
              </td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.id }}</td>
              <td>
                <div class="field is-grouped">
                  <button class="button">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="button">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span class="has-text-primary">*A higher number indicates more privileges. Adminstrators have a number of 5.</span>
    </div>
  </div>
</template>
