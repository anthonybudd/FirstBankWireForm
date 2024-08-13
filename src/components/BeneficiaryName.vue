<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Beneficiary Name</h1>
            <p class="text-subtitle-1 mb-4">
                Enter the name of the person who is receiving this wire. If the beneficiary is a business, enter the
                name of the business.
            </p>
            <v-form
                @submit.prevent="(e) => e.preventDefault()"
                v-model="isValid"
            >
                <v-text-field
                    v-model="beneficiaryName"
                    :rules="[rules.required]"
                    placeholder="Beneficiary Name"
                    variant="outlined"
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
const beneficiaryName = ref('');

const onClickNext = () => {
    store.commit('setBeneficiaryName', beneficiaryName.value);
    emit('next');
}; 
</script>