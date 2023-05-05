<script setup lang="ts">
    import Modal from '../components/Modal.vue';
    import { ref } from 'vue';
    import { useSession } from '@/model/session';
    import { addExercise, type Exercise } from '../model/exercises';

    const props = defineProps<{
        isOpen: boolean
    }>()

    const emit = defineEmits<{
        (e:'update'): void;
    }>();

    const session = useSession();
    const exercise = ref<Exercise>({} as Exercise);

    const addWorkout = () => { //make this function exportable
        exercise.value.name = session.user?.name;
        addExercise(exercise.value)
            .then(data => {
                console.log(data);
            });
        exercise.value.duration = '';
        exercise.value.workout = '';
        exercise.value.description = '';
        emit('update');
    }
    
</script>

<template>
    <Modal :title="'Add a Workout'" :is-open="props.isOpen" @update="() => emit('update')">
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


