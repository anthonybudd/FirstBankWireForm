<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Account Number</h1>
            <p class="text-subtitle-1 mb-4">Enter your FirstBank account number</p>
            <v-form v-model="isValid">
                <v-text-field
                    v-model="accountNumber"
                    placeholder="Account Number"
                    variant="outlined"
                    :rules="[rules.required, rules.isValidAccountNumber]"
                    :suffix="`${accountNumberLength}/10`"
                    @input="sanitizeAccountNumber"
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
import { ref, defineEmits, inject, computed } from 'vue';
import { useStore } from 'vuex';

const rules = inject('rules');
const emit = defineEmits(['next']);

const isValid = ref(false);
const accountNumber = ref('');
const store = useStore();

const accountNumberLength = computed(() => accountNumber.value.length);

const sanitizeAccountNumber = () => {
    if (accountNumber.value) accountNumber.value = accountNumber.value.replace(/\D/g, '').substring(0, 10);
};

const onClickNext = () => {
    store.commit('setCustomerAccountNumber', accountNumber.value);
    emit('next');
}; 
</script>