<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app>
        <toolbar/>
        <Navigation/>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    import toolbar from './components/common/Toolbar'
    import Navigation from './components/common/Navigation-Drawer'
    export default {
        name: 'App',
        components: {
            toolbar,
            Navigation
        },
        data() {
            return {
            }
        },
        methods: {
        }
    };
</script>
