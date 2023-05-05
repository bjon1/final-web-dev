<script setup lang = "ts">

    import { ref } from 'vue';
    let isInvalidForm = ref(false);
    const createUser = async () => {

    }


</script>

<template>
    <form @submit.prevent="() => createUser()" class="box">
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
            <p class="is-size-7"> Don't have an account? <a class="has-text-primary">Sign up</a>
            </p>
        </div>
    </form>
</template>