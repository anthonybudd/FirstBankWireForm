<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Credit Under Advice Account Number</h1>
            <p class="text-subtitle-1 mb-4">Check the checkbox to credit under advice account number</p>
            <v-form v-model="isValid">
                <v-checkbox
                    v-model="shouldCreditUnderAdviceAccountNumber"
                    label="Credit Under Advice Account Number"
                ></v-checkbox>
                <v-text-field
                    v-if="shouldCreditUnderAdviceAccountNumber"
                    v-model="accountNumber"
                    placeholder="Account Number"
                    :rules="[rules.required, rules.isValidAccountNumber]"
                    :suffix="`${accountNumberLength}/10`"
                    @input="sanitizeAccountNumber"
                    variant="outlined"
                    validate-on="input lazy"
                ></v-text-field>
                <v-btn
                    block
                    color="primary"
                    size="large"
                    :disabled="!isValid"
                    @click="emit('next')"
                >
                    Next
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, defineEmits, inject, computed } from 'vue';

const rules = inject('rules');
const emit = defineEmits(['next']);

const isValid = ref(false);
const shouldCreditUnderAdviceAccountNumber = ref(false);
const accountNumber = ref('');

const accountNumberLength = computed(() => accountNumber.value.length);

const sanitizeAccountNumber = () => {
    if (accountNumber.value) accountNumber.value = accountNumber.value.replace(/\D/g, '').substring(0, 10);
};  
</script>