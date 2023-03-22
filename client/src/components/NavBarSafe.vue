<script setup lang="ts">
    //import Router Link
    import { RouterLink, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { useSession, login } from '@/model/session';
    import type { Ref } from '@vue/runtime-core';
    import { computed } from 'vue';
    
    import logoBlack from '../assets/eLogger-logo-black.png';
    import logoWhite from '../assets/eLogger-logo.png'; 
    const router = useRouter();
    function logoChooser() {
        return session.user == null ? logoWhite : logoBlack;
    }
    const session = useSession();
    let isMenuActive = ref(false);
    let isModalActive = ref(false);
    let isInvalidForm = ref(false);
    let isLoggedIn = ref(false);
    function currentView() { //const currentView = computed(() => isLoggedIn.value ? 'LoggedIn' : 'LoggedOut')
        return isLoggedIn.value ? 'LoggedIn' : 'LoggedOut';
    }
    
    const LoggedIn = {
        template: '<div>Logged In Content</div>'
    }
    const LoggedOut = {
        template: '<div>Logged Out Content</div>'
    }
    
    const email: Ref<HTMLInputElement | undefined> = ref(undefined);
    const password: Ref<HTMLInputElement | undefined> = ref(undefined);
    function toggleMenu() {
      isMenuActive.value = !isMenuActive.value;
    }
    function checkLogin() {
        let email = this.email.value;
        let password = this.password.value;
        if(email == "jonb1@newpaltz.edu" && password == "webdev"){
            let loginData = {
                name: 'Benjamin'
            }
            isModalActive.value = false;
            router.push('/stats');
            login(loginData); //set the session data
        } else {
            isInvalidForm.value = true;
            email.value = '';
            password.value = '';
        }
    }
</script>

<template>
<nav class="navbar is-spaced" :class="{'is-link': session.user == null, 'nav-border': session.user != null}"> <!--#2D1E2F--> <!--'is-spaced': session.user == null-->
    <div class="navbar-brand" style="padding-bottom: 0.5em">
        <a class="navbar-item logo" href="/">
            <img :src="logoChooser()" style="margin-right: 0.3em;">
            <div class="subtitle is-5" :class="{'has-text-white': session.user == null}">ELOGGER</div>
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
        <div class="navbar-end" v-if="session.user == null">
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
        
        <div class="navbar-end" v-else> <!-- This stuff will be shown once the user logs in -->
            <div class="navbar-item has-dropdown is-hoverable">
                <a class ="navbar-link">
                    <RouterLink to="/stats" class="navbar-item">My Statistics</RouterLink>
                </a>
                <div class="navbar-dropdown">
                    <a href="" class="navbar-item">
                        <RouterLink to="/exercise" class="navbar-item">Exercise</RouterLink>
                    </a>
                    <a href="" class="navbar-item">
                        <RouterLink to="/list" class="navbar-item">Habits</RouterLink>
                    </a>
                </div>
            </div>
            <RouterLink to="/friends" class="navbar-item">Friends</RouterLink>    
            <div class="navbar-item">
                Welcome, {{ session.user.name }}!
            </div>
            <div class="buttons navbar-item">
                <a class="button is-danger is-rounded" @click = "session.user = null">
                <strong>Sign out</strong>
                </a>
            </div>
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
              <a href="forget.html" class="is-size-7 has-text-primary">forgot your password?</a>
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

<style scoped></style>
