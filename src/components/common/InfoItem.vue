<template>
    <v-card>
        <v-card-title primary-title>
            <v-icon
                    large
                    left
            >
                mdi-bookmark
            </v-icon>
            <div>
                <div class="headline">{{name}}</div>
            </div>
        </v-card-title>
        <v-card-text>
            {{buildCardContent(value,itemType)}}
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "InfoItem",
        props:{
            name: {
                type: String,
                require: false
            },
            value: {
                type: String,
                require: false,
                default: 'N/A'
            },
            itemType: {
                type: String,
                require: false,
                default: 'text'
            }
        },
        computed:{
            ...mapState(['CRUDModel'])
        },
        methods: {
            buildCardContent(nameValue, type){
                let value = this.CRUDModel[nameValue];
                if(value !== undefined){
                    switch (type) {
                        case 'text':
                            return value;
                        case 'number':
                            return value;
                        case 'date':
                            return this.formatDate(value);
                        case 'datetime':
                            return this.formatDateTime(value);
                        case 'money':
                            return '$ ' + value;
                        case 'time':
                            return this.formatTime(value);
                        case 'array':
                            return value.map(function (item) {
                                return item['nombre'];
                            }).join(', ');
                        case 'obj':
                            return value.nombre;
                        default:
                            return value;
                    }
                }
            },
            formatDate(text){
                return text.split('T')[0];
            },
            formatTime(text){
                return text.split('T')[1];
            },
            formatDateTime(text){
                let datetime = text.split('T');
                return datetime[0] + ' ' + datetime[1];
            }
        }
    }
</script>

<style scoped>

</style>