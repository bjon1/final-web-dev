<script setup lang="ts">
  import { ref } from 'vue';
  import { getAllUsers, deleteUser, type User } from '../../model/session';
  import ThreeColumnLayout from '../../components/ThreeColumnLayout.vue';

  const defaultPhoto = "https://i.pinimg.com/1200x/47/77/ae/4777ae0906dd0113ad0bb00d61125d1b.jpg";
  const users = ref<User[]>([]);
  const fetchUsers = () => {
      getAllUsers().then((data) => {
          users.value = data.data.reverse();
      })
      setTimeout(fetchUsers, 500);
  }
  fetchUsers();
  
  const deleteItem = (id: string) => {
    console.log("delete Item with id: ", id);
    deleteUser(id).then((data) => {
        console.log(data);
    });
  }
  
</script>

<template>
  <ThreeColumnLayout>
    <template #right-column>
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
              <tr v-for="(user, index) in users.sort((a, b) => (a.role === 'admin' && b.role !== 'admin') ? -1 : 0)" :key="index">
                <td>
                  <img :src="user.photo ? user.photo : defaultPhoto" class="table-photo">
                </td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <div class="field is-grouped">
                    <button class="button">
                      <i class="fas fa-trash" @click="deleteItem(user._id)"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span class="has-text-primary">*Admins are shown on top</span>
      </div>
    </template>
  </ThreeColumnLayout>
</template>
