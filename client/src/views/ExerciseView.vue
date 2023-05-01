<script setup lang="ts">
    import { useSession } from '@/model/session';
    import { useRoute } from 'vue-router';
    import ExerciseForm from '../components/ExerciseForm.vue';
    import { getExercises, type Exercise } from '@/model/exercises';
    import { ref } from 'vue';
    import userDatabase from '../../data/database.json'

    const route = useRoute();
    const name = route.params.name;

    const session = useSession();

    const exercises = ref<Exercise[]>([]);
    getExercises().then((data) => {
        console.log(data);
        exercises.value = data.data;
    })

    function userImg(name: string | undefined) {
        for(let i = 0; i < userDatabase.users.length; i++){
            if(userDatabase.users[i].name == name){
                return userDatabase.users[i].photo;
            }
        }
    }

</script>

<template>
    <div class="section mx-5">  
        
        <ExerciseForm />

        <div class="columns is-variable is-8">
            <div class="column is-one-fifth">
                <!--Sidebar-->
            </div>
            <div class="column" v-if="!name">
                <h1 class="title">Your Exercise Activity</h1>
                <div v-for="(exercise, index) in exercises.filter((elem) => elem.name == session.user?.name)" :key="index" class="box">
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
                                        <div class="title" style="margin: 0px">{{ exercise.workout }}</div>
                                        <div class="heading ">Workout</div>
                                    </div>
                                    <div>
                                        <div class="title" style="margin: 0px">{{ exercise.duration }}s</div>
                                        <div class="heading">Duration</div>
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
            <div v-else >

                <h1 class="title">Friends Activity</h1>
                <div v-for="(exercise, index) in exercises" :key="index" class="box">
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
                                        <div class="title" style="margin: 0px">{{ exercise.workout }}</div>
                                        <div class="heading ">Workout</div>
                                    </div>
                                    <div>
                                        <div class="title" style="margin: 0px">{{ exercise.duration }}s</div>
                                        <div class="heading">Duration</div>
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


</style>