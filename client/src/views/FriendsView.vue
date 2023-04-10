<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import { useSession, setLogin } from '@/model/session';
  import database from '../../data/exercises.json'
  import userDatabase from '../../data/database.json'
  const session = useSession();

  let isModalActive = ref(false);

  let distance = ref('');
  let duration = ref('');
  let pace = ref('');
  let description = ref('');

    function toggleModal() {
        isModalActive.value = !isModalActive.value;
    }

    function addWorkout() { //make this function exportable

        let workout = {
            "name": session.user?.name as string,
            "distance": distance.value as unknown as number,
            "duration": duration.value as string,
            "pace": pace.value as unknown as number,
            "description": description.value as string
        }
        database.exercises.unshift(workout);
        distance.value = '';
        duration.value = '';
        pace.value = '';
        description.value = ''
        toggleModal();
    }

    function userImg(name: string) {
        for(let i = 0; i < userDatabase.users.length; i++){
            if(userDatabase.users[i].name == name){
                return userDatabase.users[i].photo;
            }
        }
    }

</script>

<template>
    <div class="section mx-5">
        <div class="columns">
            <div class="column is-one-fifth">
                <!--NavBar-->
            </div>
            <div class="column">
                <h1 class="title">Your Friend's Workouts</h1>

                <div class="button is-link" id="add-workout" @click = "toggleModal">
                    <i class="fa-solid fa-plus fa-2x"></i>
                </div>

                <div class="modal" :class="{ 'is-active': isModalActive }">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <form @submit.prevent="() => addWorkout()" class="box">

                            <div class="column field">
                                <label for="" class="label">Description</label>
                                <div class="control has-icons-left">
                                    <input type="description" placeholder="Description" class="input" required v-model="description">
                                </div>
                            </div>

                            <div class="column field">
                                <label for="" class="label">Duration</label>
                                <div class="control has-icons-left">
                                    <input type="duration" placeholder="Duration" class="input" required v-model="duration">
                                </div>
                            </div>

                            <div class="column field">
                                <label for="" class="label">Distance</label>
                                <div class="control has-icons-left">
                                    <input type="distance" placeholder="Distance" class="input" required v-model="distance">
                                </div>
                            </div>

                            <div class="column field">
                                <label for="" class="label">Pace</label>
                                <div class="control has-icons-left">
                                    <input type="pace" placeholder="Pace" class="input" required v-model="pace">
                                </div>
                            </div>

                            <div class="column">
                                <button class="button is-link is-fullwidth" type="submit">Add Workout</button>
                            </div>

                        </form>
                    </div>
                    <button class="modal-close is-large" @click = "toggleModal" aria-label="close"></button>
                </div>
                
                <div v-for="(exercise, index) in database.exercises" :key="index" class="box">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-64x64">
                                <img :src="userImg(exercise.name)">
                            </p>    
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <strong>{{ exercise.name }}</strong> <small>@johnsmith</small> <small>31m</small>
                                <br>
                                {{ exercise.description }}
                                <br>
                                <div class="column is-flex is-centered is-justify-content-space-around" >
                                    <div>
                                        <div class="title" style="margin: 0px">{{ exercise.distance }}m</div>
                                        <div class="heading ">Distance</div>
                                    </div>
                                    <div>
                                        <div class="title" style="margin: 0px">{{ exercise.duration }}s</div>
                                        <div class="heading">Duration</div>
                                    </div>
                                    <div>
                                        <div class="title" style="margin: 0px">{{ exercise.pace }}mph</div>
                                        <div class="heading">Pace</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <a class="level-item">
                                <span class="icon is-small"><i class="fas fa-reply"></i></span>
                                </a>
                                <a class="level-item">
                                <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                                </a>
                                <a class="level-item">
                                <span class="icon is-small"><i class="fas fa-heart"></i></span>
                                </a>
                            </div>
                        </nav>
                    </article>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<style scoped>
    #add-workout {
        position: fixed;
        height: 100px;
        width: 100px;
        bottom: 60px;
        right: 60px;
        border-radius: 50%;
    }

    #add-workout:hover {
        transform: scale(1.05);
    }
</style>