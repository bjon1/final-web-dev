<script setup lang="ts">
    import { useSession } from '@/model/session';
    import { useRoute } from 'vue-router';
    import ExerciseForm from '../components/ExerciseForm.vue';
    import ThreeColumnLayout from '../components/ThreeColumnLayout.vue'
    import { getExercises, deleteExercise, type Exercise } from '@/model/exercises';
    import { ref, computed } from 'vue';
    import userDatabase from '../../data/database.json'


    const route = useRoute();
    const name = computed(() => route.params.name);

    const session = useSession();

    const exercises = ref<Exercise[]>([]);
    getExercises().then((data) => {
        console.log(data);
        exercises.value = data.data.reverse();
    })

    const deleteItem = (id: string | string[]) => {
        deleteExercise(id).then((data) => {
            console.log(data);
        });
    }

    function userImg(name: string | undefined) {
        for(let i = 0; i < userDatabase.users.length; i++){
            if(userDatabase.users[i].name == name){
                return userDatabase.users[i].photo;
            }
        }
    }

</script>

<template>
    <ThreeColumnLayout>
        <template #right-column-left>
            <h1 class="title" v-show="!name">Your Exercise Activity</h1>
            <div v-for="(exercise, index) in (name === 'feed' ? exercises : exercises.filter((elem) => elem.name == session.user?.name))" :key="index" class="box">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img :src="userImg(exercise.name)">
                        </p>    
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <strong>{{ exercise.name }}</strong> <small>@johnsmith</small> <small>{{ exercise.timestamp }}</small>
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
                            <a class="level-item" @click="() => deleteItem(exercise._id)">
                                <span class="icon is-small"><i class="fa-solid fa-trash"></i></span>
                            </a>
                        </div>
                    </nav>
                </article>
            </div>
        </template>
    </ThreeColumnLayout>
</template>

<style scoped>

</style>