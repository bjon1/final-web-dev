<script setup lang="ts">
    //import Router Link
    import { RouterLink, useRouter } from 'vue-router';
    import { ref, type Ref } from 'vue';
    import { useSession, setLogin } from '@/model/session';
    import router from '@/router';

    const session = useSession();
    let isMenuActive = ref(false);
    let isModalActive = ref(false);
    let isInvalidForm = ref(false);
    let isLoggedIn = ref(false);
    
    const email: Ref<HTMLInputElement | undefined> = ref(undefined);
    const password: Ref<HTMLInputElement | undefined> = ref(undefined);

    function toggleMenu() {
      isMenuActive.value = !isMenuActive.value;
    }

    function logIn(bool: boolean){
        isLoggedIn.value = bool;
        if(bool){
            router.push('/stats');
        } else {
            session.user = null;
            router.push('/');
            console.log(session.user);
        }
        return isLoggedIn;
    }

    function checkLogin() {
        let email = this.email.value;
        let password = this.password.value;

        if(setLogin(email, password)){
            logIn(true);
            isModalActive.value = false;
        } else {
            isInvalidForm.value = true;
        }
    }

</script>

<template>


<nav class="navbar is-spaced is-link" v-if="isLoggedIn == false"> <!--#2D1E2F--> <!--'is-spaced': session.user == null-->
    <div class="navbar-brand">
        <a class="navbar-item logo" href="/">
            <img src='../assets/eLogger-logo.png' style="margin-right: 0.3em;">
            <div class="subtitle is-5 has-text-white">ELOGGER</div>
        </a>
        <a class="navbar-burger" data-target="navMenu" :class="{'is-active': isMenuActive}" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </a>
    </div>
    <div class="navbar-menu menu" :class="{'is-active': isMenuActive}" id="navMenu">    
        <div class="navbar-start">
        </div>
        <!--show if the user hasn't logged in yet-->
        <div class="navbar-end">
            <RouterLink to="/" class="navbar-item">Home</RouterLink>
            <RouterLink to="/services" class="navbar-item">Services</RouterLink>
            <RouterLink to="/about" class="navbar-item">About</RouterLink>
            <RouterLink to="/contact" class="navbar-item">Contact</RouterLink>
            <div class="navbar-item">
            <div class="buttons">
                <a class="button is-danger is-rounded" v-show="isMenuActive != true">
                <strong>Sign up</strong>
                </a>
                <a class="button is-light is-rounded" @click="isModalActive=true, isInvalidForm=false">
                Log in
                </a>
            </div>
            </div>
        </div>
    </div>
</nav>

<nav class="sidebar" v-else>
    <div class="m-4">
        <a class="navbar-item" to="/stats" style="height: 90px;" >
            <img src='../assets/eLogger-logo-black.png' class="logo-sidebar">
            <div class="logo-sidebar subtitle is-6" style="margin-left: 53px;">eLogger</div>
        </a>
        <RouterLink to="/stats" class="navbar-item">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa fa-line-chart"></i>
                </span>
                <span>Statistics</span>
            </span>
        </RouterLink>
        <RouterLink to="/exercise" class="navbar-item">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-wave-pulse"></i>
                </span>
                <span>Exercise</span>
            </span>
        </RouterLink>
        <RouterLink to="/list" class="navbar-item">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-wave-pulse"></i>
                </span>
                <span>Habits</span>
            </span>
        </RouterLink>
        <RouterLink to="/friends" class="navbar-item">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-wave-pulse"></i>
                </span>
                <span>Friends</span>
            </span>
        </RouterLink>
        <RouterLink to="/products" class="navbar-item">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-wave-pulse"></i>
                </span>
                <span>Products</span>
            </span>
        </RouterLink>
        <RouterLink v-show="session.user.id == 5" to="/admin" class="navbar-item">
            <span class="icon-text is-large">
                <span class="icon">
                    <i class="fa-solid fa-wave-pulse"></i>
                </span>
                <span>Admin</span>
            </span>
        </RouterLink>
        <div class="navbar-item" v-if="session.user != null">
            <span class="icon-text is-large">
                <span class="icon">
                    <img :src="session.user.photo" class="image is-16x16 profile" alt="profile picture"/>
                </span>
                <span>{{ session.user.name }}</span>
            </span>
        </div>
        <div class="buttons navbar-item">
            <a class="button is-danger" @click = "logIn(false)">
            <strong>Sign out</strong>
            </a>
        </div>
    </div>
    
</nav>


<!--Login screen-->
<div class="modal" :class="{ 'is-active': isModalActive }" id="signup">
    <div class="modal-background"></div>
    <div class="modal-content">
        <form @submit.prevent="() => checkLogin()" class="box">
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
                <p class="is-size-7"> Don't have an account? <a href="#" class="has-text-primary">Sign up</a>
                </p>
            </div>
        </form>
    </div>

    <button class="modal-close is-large" @click="isModalActive=false" aria-label="close"></button>
    <button class="js-modal-trigger is-warning" data-target="signup">
        Signup
    </button>
</div> 
</template>

<style scoped>
.navbar-brand {
    padding-bottom: 0.5em;
}



.logo {
    transform: scale(1.7);
    margin-left: 4em;
    margin-top: 0.5em;
}

.logo-sidebar {
    transform: scale(2.0);  
    margin-left: 0.6em;
}

.menu {
    padding-left: 2em;
}

.nav-border {
    border-bottom: 1px solid #d7d6d6;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
}

.profile {
    transform: scale(1.3);
    border-radius: 30px;
}

.sidebar {
    background-color: white;
    border-right: 1px solid #d7d6d6;
    height: 100vh;
    width: 250px;
    position: fixed;
    z-index: 999;
}

</style>
