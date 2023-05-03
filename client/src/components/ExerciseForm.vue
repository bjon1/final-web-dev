<script setup lang="ts">
    import Modal from '../components/Modal.vue';
    import router from '@/router';
    import { ref } from 'vue';
    import { useSession } from '@/model/session';
    import { addExercise, type Exercise } from '../model/exercises';

    const session = useSession();
    const isOpen = ref(false);

    const exercise = ref<Exercise>({} as Exercise);

    function toggleModal() {
        isOpen.value = !isOpen.value;
    }

    const addWorkout = () => { //make this function exportable
        exercise.value.name = session.user?.name;
        addExercise(exercise.value)
            .then(data => {
                console.log(data);
            });
        exercise.value.duration = '';
        exercise.value.workout = '';
        exercise.value.description = '';
        toggleModal();
    }
    
</script>

<template>
    <div class="button is-link" id="add-btn" @click="toggleModal">
        <i class="fa-solid fa-plus fa-2x"></i>
    </div>

    <Modal v-model:is-open="isOpen" :title="'Add a Workout'">
        <template #default>
            <div class="form">
                <div class="column field">
                    <label for="" class="label">Workout</label>
                    <div class="control has-icons-left">
                        <input type="workout" placeholder="Workout" class="input" required v-model="exercise.workout">
                    </div>
                </div>

                <div class="column field">
                    <label for="" class="label">Description</label>
                    <div class="control has-icons-left">
                        <textarea 
                            class="textarea"
                            placeholder="Description" 
                            v-model="exercise.description"
                            required>
                        </textarea>
                    </div>
                </div>

                <div class="column field">
                    <label for="" class="label">Duration</label>
                    <div class="control has-icons-left">
                        <input type="duration" placeholder="Duration" class="input" required v-model="exercise.duration">
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <button class="button is-link is-fullwidth" @click="() => addWorkout()">Add Workout</button>
        </template>
    </Modal>



</template>

<style scoped>
    /* add-btn is in main.css */
</style>


