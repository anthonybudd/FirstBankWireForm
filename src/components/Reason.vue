<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Reason For Payment</h1>
            <p class="text-subtitle-1 mb-4">
                Enter the reason for this payment, e.g. "Rent", "Invoice".
            </p>
            <v-form
                @submit.prevent="(e) => e.preventDefault()"
                v-model="isValid"
            >
                <v-textarea
                    :rules="[rules.required]"
                    v-model="reason"
                    rows="2"
                    placeholder="Reason"
                    variant="outlined"
                ></v-textarea>
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
const reason = ref('');

const onClickNext = () => {
    store.commit('setReason', reason.value);
    emit('next');
}; 
</script>