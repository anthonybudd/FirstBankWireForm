<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Your Name</h1>
            <p class="text-subtitle-1 mb-4">Enter your full name as it appears on your card</p>
            <v-form v-model="isValid">
                <v-text-field
                    v-model="name"
                    placeholder="Your Name"
                    :rules="[rules.required, rules.isFullName]"
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
import { ref, defineEmits, inject } from 'vue';

const rules = inject('rules');
const emit = defineEmits(['next']);

const isValid = ref(false);
const name = ref('');
</script>