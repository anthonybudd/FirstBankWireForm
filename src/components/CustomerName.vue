<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Your Name</h1>
            <p class="text-subtitle-1 mb-4">Enter your full name as it appears on your card</p>
            <v-form
                @submit.prevent="(e) => e.preventDefault()"
                v-model="isValid"
            >
                <v-text-field
                    v-model="name"
                    placeholder="Your Name"
                    :rules="[rules.required]"
                    variant="outlined"
                    validate-on="input lazy"
                ></v-text-field>
                <v-btn
                    block
                    color="primary"
                    size="large"
                    :disabled="!isValid"
                    @click="onClickNext"
                >
                    Next
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, defineEmits, inject } from 'vue';
import { useStore } from 'vuex';

const rules = inject('rules');
const emit = defineEmits(['next']);
const store = useStore();

const isValid = ref(false);
const name = ref('');

const onClickNext = () => {
    store.commit('setCustomerName', name.value);
    emit('next');
}; 
</script>