<template>
    <div style="height: 100%"> //div father 
        //div child
        <v-toolbar
            dark
            prominent
            :src="headerImage"
            height="340px"
        > <!-- bloco do header -->
            <v-btn icon disabled>
                <v-icon>mdi-arrow-left-thick</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-toolbar-title class="fontStyle" style="align-self: center; font-size:40px;">Menu</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn 
                icon
                @click="goToOrder"
            >
                <v-badge
                    v-if="order.pending"
                    color="deep amber"
                    content="..."
                    overlap
                >
                    <v-icon>mdi-cart-variant</v-icon>
                </v-badge>
                <v-icon v-if="!order.pending">mdi-cart-variant</v-icon>
            </v-btn>
        </v-toolbar>
        <div class="flex-box" style="height:calc(100% - 340px);">  <!-- bloco do body -->
            <v-list style="width: 100%;">
                <v-list-item-group
                    v-model="type"
                    color="grey"
                >
                    <v-list-item
                        v-for="item in items"
                        :key="item"
                        @click="goTo(item)"
                    >
                        <v-list-item-content>
                            <v-list-item-title class="fontStyle" style="text-align: center; font-size: 20px;" v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menu',
    data() {
        return {
            headerImage: require('../src/assets/food9.jpg'),
            items: [
                {text: 'Foods'},
                {text: 'Drinks'},
                {text: 'Snacks'}
            ],
            type: '',
            order:{
                pending:false
            }
        }
    },
    methods:{
        goTo({text}){
            this.$route.params.tableNumber
            this.$router.push(text+'/'+this.$route.params.tableNumber)
        },
        goToOrder(){
            this.$router.push('Order'+'/'+this.$route.params.tableNumber)
        }
    },
    mounted(){
        if(localStorage.getItem('order')) this.order = JSON.parse(localStorage.getItem('order'))
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.fontStyle {
    font-family: 'Pacifico', cursive;
}

.flex-box{
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>