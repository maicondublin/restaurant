<template>
    <div style="height: 100%">
        <v-toolbar
            dark
            prominent
            :src="headerImage"
            height="140px"
        >
            <v-btn 
                icon
                @click="goToMenu"
            >
                <v-icon>mdi-arrow-left-thick</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-toolbar-title class="fontStyle" style="align-self: center; font-size:40px;">Foods</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn 
                :disabled="!selectedItems.length"
                icon
                @click="addItemsIntoOrder"
            >
                <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
        </v-toolbar>
        <div style="height:calc(100% - 140px); padding: 8px !important;">
            <v-list shaped style="width:100%;">
                <v-list-item-group
                    v-model="selectedItems"
                    multiple
                >
                    <template v-for="(item, i) in items">
                        <v-divider
                            v-if="!item"
                            :key="`divider-${i}`"
                        ></v-divider>

                        <v-list-item
                            v-else
                            :key="`item-${i}`"
                            :value="item"
                            style="padding: 0 6px !important;"
                            active-class="deep-grey--text text--accent-4"
                        >
                            <template v-slot:default="{ active }">
                                <v-list-item-content style="flex-wrap: nowrap !important">
                                    <v-list-item-title class="fontStyle" style="text-align: left; font-weight: 600;" v-text="item.ITEM ? item.ITEM+' - '+item.DESCRIPTION : item.DESCRIPTION"></v-list-item-title>
                                    <v-list-item-title class="fontStyle" style="text-align: right; font-weight: 600;" v-text="'$'+item.PRICE"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-checkbox
                                        :input-value="active"
                                        color="deep-grey accent-4"
                                    ></v-checkbox>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>

<script>
import loadItemMenuByType from '../src/app/menu/loadItemMenuByType'

export default {
    name: 'foods',
    data() {
        return {
            headerImage: require('../src/assets/food9.jpg'),
            items: [
                {DESCRIPTION: ''}
            ],
            selectedItems: [],
            order: {
                ORDER_ITEMS: []
            }
        }
    },
    methods: {
        goToMenu(){
            this.$router.push('/'+ this.$route.params.tableNumber)
        },
        addItemsIntoOrder(){
            if(localStorage.getItem('order')) this.order = JSON.parse(localStorage.getItem('order'))
            for(var i=0; i < this.selectedItems.length; i++){
                this.order.ORDER_ITEMS.push(this.selectedItems[i])
            }
            this.order.pending = true
            localStorage.setItem('order', JSON.stringify(this.order))
            this.selectedItems = []
        }
    }, 
    async mounted(){
        await loadItemMenuByType('FOOD').then(function(response){
            this.items = response.data
        }.bind(this))
    }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.fontStyle {
    font-family: 'Pacifico', cursive;
}

</style>