<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    const currentTab = ref("All");
    const newTask = ref('');
    const tabs = ref([
        { name: 'Current', icon: 'fas fa-spinner' },
        { name: 'Completed', icon: 'fas fa-check' },
        { name: 'All', icon: 'fas fa-list' },
        { name: 'Overdue', icon: 'fas fa-exclamation-triangle' }
    ])
    const items = ref([
        { name: 'Finish creating todo list', completed: false}
    ])

    function isValidAddItem(item: { completed: any; }) {
        if(this.currentTab == 'Current' && !item.completed) return true;
        if(this.currentTab == 'Completed' && item.completed) return true;
        if(this.currentTab == 'All') return true;
        return false;
    }

    function addTask() {
        this.items.push({name: this.newTask, completed: false});
        this.newTask= '';
    }
</script>

<template>
    <div class="section">
    <div class="columns">
        <div class="column is-one-fifth"> <!--COLUMN SIDEBAR-->
            <!--SideBar-->
        </div>
        <div class="column is-four-fifths"> <!--COLUMN BODY-->


            <div class="columns">
                <div class="column"> <!--COLUMN 1-->
                    <div class="panel">
                        <div class="tabs is-boxed">
                            <ul>
                                <li v-for="tab in tabs" :class="{'is-active': currentTab == tab.name}" @click="currentTab = tab.name">
                                    <a>
                                        <span class="icon is-small"><i :class = "tab.icon"></i></span>
                                        <span>{{tab.name}}</span>
                                        <span class="tag icon is-danger" v-show="tab.name == 'Current'">{{items.filter(item => !item.completed).length}}</span>
                                        <span class="tag icon is-success" v-show="tab.name == 'Completed'">{{items.filter(item => item.completed).length}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="control has-icons-left">
                            <input type="text" class="input" placeholder="New Task" v-model="newTask" @keypress.enter="addTask()">
                            <span class="icon is-small is-left">
                                <i class="fas fa-calendar-plus"></i>
                            </span>
                        </div>
                        <a v-for="item in items" class="panel-block" v-show="isValidAddItem(item)">
                            <input type="checkbox" v-model="item.completed"/>
                            {{ item.name }}
                        </a>
                    </div> 
                </div>
                <div class="column is-one-third"> <!--COLUMN 2-->
                    <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Inspirational Quote of the Day
                        </p>
                        <button class="card-header-icon">
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. 
                            <br />
                            -Albert Einstein
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Save</a>
                        <a href="#" class="card-footer-item">Edit</a>
                        <a href="#" class="card-footer-item">Delete</a>
                    </footer>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

</template>