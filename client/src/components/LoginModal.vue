<script setup lang="ts">

    import { useLogin, useLogout } from '@/model/session';
    import router from '@/router';
    import { ref, type Ref } from 'vue';

    const email: Ref<HTMLInputElement | undefined> = ref(undefined);
    const password: Ref<HTMLInputElement | undefined> = ref(undefined);
        
    let isInvalidForm = ref(false);

    const props = defineProps<{
        isModalActive: boolean
    }>();

    const emit = defineEmits<{
        (e:'updateModal'): void;
    }>();


    const signIn = (bool: boolean) => { //handles the UI 
        if(bool){
            emit('updateModal');
            router.push('/exercise/feed'); //send the user to /stats
        } else {
            useLogout();
            router.push('/');
        }
    }

    async function checkLogin(emailRef: string | undefined, passwordRef: string | undefined) {
        const response = await useLogin(emailRef, passwordRef)
            .catch(error => {
                isInvalidForm.value = true;  
                return;
            });

        if(response && response.isSuccess) { //if login was successful
            signIn(true); //update the UI
        } 
    }

    const signupPage = () => {
        emit('updateModal');
        router.push('/signup');
    }

</script>

<template>
    <!--Login screen-->
    <div class="modal" :class="{ 'is-active': props.isModalActive }" id="signup">
        <div class="modal-background"></div>
        <div class="modal-content">
            <form @submit.prevent="() => checkLogin(email?.value as string, password?.value as string)" class="box">
                <div class="column field">
                    <label for="" class="label">Email</label>
                    <div class="control has-icons-left">
                        <input type="email" placeholder="Enter your email" class="input" :class="{'is-danger': isInvalidForm}" required ref="email">
                        <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                        </span>
                    </div>
                </div>
                <div class="column field">
                    <label for="" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input type="password" placeholder="Enter your password" class="input" :class="{'is-danger': isInvalidForm}" required ref="password">
                        <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                        </span>
                    </div>
                    <a class="is-size-7 has-text-primary">forgot your password?</a>
                </div>
                <div class="column">
                    <div class="icon-text" v-show="isInvalidForm == true">
                        <span class="icon">
                            <i class='fa fa-warning is-large' style="color:red"></i>
                        </span>
                        <span class="has-text-danger is-size-7">Invalid Email or Password</span>
                    </div>
                    <button class="button is-primary is-fullwidth" type="submit">Login</button>
                </div>
                <div class="has-text-centered">
                    <p class="is-size-7"> Don't have an account? <a class="has-text-primary" @click="signupPage()">Sign up</a>
                    </p>
                </div>
            </form>
        </div>

        <button class="modal-close is-large" @click="emit('updateModal')" aria-label="close"></button>
        <button class="js-modal-trigger is-warning" data-target="signup">
            Signup
        </button>
    </div>

</template>