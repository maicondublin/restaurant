<template>
    <div style="height: 100%">
        <v-toolbar
            dark
            prominent
            :src="headerImage"
            height="80px"
        >
            <v-btn 
                icon
                @click="goToMenu"
            >
                <v-icon>mdi-arrow-left-thick</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-toolbar-title class="fontStyle" style="align-self: center; font-size:40px;">Order</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>
        <div style="height:calc(100% - 80px); padding: 8px !important;">
            <v-list shaped style="width:100%; height:100%; padding-right:0" v-if="this.order.ORDER_ITEMS.length">
                <v-subheader class="fontStyle" style="font-weight: 600; font-size: 1.4rem; color:#212121;">Items</v-subheader>
                <v-list-item-group style="overflow-y: auto; min-height: 14rem; max-height: 14rem; border: 2px outset;">
                    <template v-for="(item, i) in this.order.ORDER_ITEMS">
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
                            <template>
                                <v-list-item-content style="flex-wrap: nowrap !important">
                                    <v-list-item-title class="fontStyle" style="text-align: left;" v-text="item.ITEM ? item.ITEM+' - '+item.DESCRIPTION : item.DESCRIPTION"></v-list-item-title>
                                    <v-list-item-title class="fontStyle" style="text-align: right;" v-text="'$'+item.PRICE"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn icon @click="removeItemToOrder(item)" color="red">
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </template>
                </v-list-item-group>
                <v-list-item>
                    <v-textarea
                        style="position: relative; top:14px"
                        class="fontStyle"
                        v-model="observation"
                        filled
                        auto-grow
                        label="Observations"
                        rows="6"
                        row-height="22"
                        shaped
                    ></v-textarea>
                </v-list-item>
                <v-list-item style="position: fixed; width: 100%; bottom: 8%;">
                    <template>
                        <v-list-item-content style="flex-wrap: nowrap !important">
                            <v-list-item-title 
                                class="fontStyle" 
                                style="text-align: left; font-weight: 600; font-size: 1.4rem;">
                                Price
                            </v-list-item-title>
                            <v-list-item-title 
                                class="fontStyle" 
                                style="text-align: right; font-weight: 600; font-size: 1.4rem; position:relative; right: 6%"
                                v-text="'$'+totalValue.toFixed(2)">
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-list-item>
                <v-list-item style="position: fixed; width: 100%; bottom: 0; padding: 0 15px 10px 0;">
                    <v-btn
                        class="fontStyle"
                        block
                        @click="save"
                        color="green"
                        dark
                    >
                        Save
                    </v-btn>
                </v-list-item>
            </v-list>
        </div>
        <v-dialog
            v-model="dialogShow"
            max-width="300"
        >
            <v-card>
                <v-card-title class="fontStyle">
                    {{messageDialog}}
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="fontStyle"
                        text
                        color="blue"
                        @click="dialogShow = !dialogShow"
                    >
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import insertNewOrder from '../src/app/order/insertNewOrder'
import saveOrder from '../src/app/order/saveOrder'

export default {
    name: 'order',
    data() {
        return {
            headerImage: require('../src/assets/food9.jpg'),
            order: {
                ORDER_ITEMS: []
            },
            selectedItems: [],
            totalValue: 0,
            observation: '',
            dialogShow: false,
            messageDialog: ''
        }
    },
    methods: {
        goToMenu(){
            this.$router.push('/'+ this.$route.params.tableNumber)
        },
        removeItemToOrder(item) {
            this.order.ORDER_ITEMS = this.order.ORDER_ITEMS.filter(function(orderItem) {
                return orderItem !== item
            })
            this.calculateTotal()
        },
        calculateTotal(){
            var amount = 0
            this.order.ORDER_ITEMS.map(function(item){
                amount += item.PRICE
            })
            this.totalValue = amount
        },
        async save() {
            this.order.OBSERVATIONS = this.observation
            this.order.TABLE_NUMBER = this.$route.params.tableNumber
            if(this.order.alreadySent){
                await saveOrder(this.order).then(function(response){
                    this.messageDialog = response.data.message
                    this.dialogShow = true
                }.bind(this))
            }
            else {
                await insertNewOrder(this.order).then(function(response){
                    this.messageDialog = response.data.message
                    this.dialogShow = true
                }.bind(this))
                this.order.alreadySent = true
            }
            this.order.pending = false
            localStorage.setItem('order', JSON.stringify(this.order))
        }
    }, 
    async mounted(){
        if(localStorage.getItem('order')){
            this.order = JSON.parse(localStorage.getItem('order'))
            this.calculateTotal()
            this.observation = this.order.OBSERVATIONS
        }
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