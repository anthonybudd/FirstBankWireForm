<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Address</h1>
            <p class="text-subtitle-1 mb-4">Enter the address associated with this account.</p>
            <v-form v-model="isValid">
                <v-text-field
                    v-model="addressLine1"
                    :rules="[rules.required]"
                    placeholder="Address Line 1"
                    variant="outlined"
                ></v-text-field>
                <v-text-field
                    v-model="addressLine2"
                    placeholder="Address Line 2"
                    variant="outlined"
                ></v-text-field>
                <v-text-field
                    v-model="city"
                    :rules="[rules.required]"
                    placeholder="City"
                    variant="outlined"
                ></v-text-field>

                <div class="d-flex">
                    <v-text-field
                        v-model="zipcode"
                        :rules="[rules.required, isValidZipCode]"
                        placeholder="Zip Code"
                        variant="outlined"
                        class="mb-4 flex-1-0"
                    ></v-text-field>


                    <v-select
                        v-model="state"
                        placeholder="State"
                        disabled
                        variant="outlined"
                        :items="['Puerto Rico']"
                        class="mb-4 ml-4 flex-1-0"
                    ></v-select>
                </div>
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
const addressLine1 = ref('');
const addressLine2 = ref('');
const city = ref('');
const zipcode = ref('');
const state = ref('Puerto Rico');

const isValidZipCode = (value) => (!value || /^[0-9]{5}$/.test(value) || 'Enter a valid zip code');
</script>