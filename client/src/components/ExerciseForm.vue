<script setup lang="ts">
    import Modal from '../components/Modal.vue';
    import { ref } from 'vue';
    import { useSession } from '@/model/session';
    import database from '../../data/exercises.json'

    const session = useSession();
    const isOpen = ref(false);

    let distance = ref('');
    let duration = ref('');
    let pace = ref('');
    let description = ref('');

    function toggleModal() {
        isOpen.value = !isOpen.value;
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
    
</script>

<template>
    <div class="button is-link" id="add-btn" @click="toggleModal">
        <i class="fa-solid fa-plus fa-2x"></i>
    </div>

    <Modal v-model:is-open="isOpen" :title="'Add a Workout'">
        <template #default>
            <div class="form">
                <div class="column field">
                    <label for="" class="label">Description</label>
                    <div class="control has-icons-left">
                        <textarea 
                            class="textarea"
                            placeholder="Description" 
                            v-model="description"
                            required>
                        </textarea>
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


