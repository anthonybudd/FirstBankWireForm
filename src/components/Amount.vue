<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Amount</h1>
            <p class="text-subtitle-1 mb-4">
                Enter the amount in USD that you would like to send in this wire transfer.
            </p>
            <v-form v-model="isValid">
                <v-text-field
                    v-model="amount"
                    placeholder="100.00"
                    prepend-inner-icon="mdi-currency-usd"
                    variant="outlined"
                    :rules="[rules.required, isGreaterThanMinWire]"
                    required
                    @blur="formatToTwoDecimals"
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
import { ref, defineEmits, inject } from 'vue';
import BN from 'bignumber.js';

const rules = inject('rules');
const emit = defineEmits(['next']);

const amount = ref('');
const isValid = ref(false);

const isGreaterThanMinWire = (value) => (!value || BN(value).isGreaterThanOrEqualTo('1') || 'Wire amount must be greater than $1.00');

const formatToTwoDecimals = () => {
    if (amount.value) amount.value = parseFloat(amount.value).toFixed(2);
    if (isNaN(amount.value)) amount.value = '0.00';
};
</script>