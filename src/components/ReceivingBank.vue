<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Receiving Bank</h1>
            <p class="text-subtitle-1 mb-4">Enter the full address for the bank that will be receiving this wire.</p>

            <v-row class="mb-2">
                <v-col cols="4">
                    <v-btn
                        variant="outlined"
                        class="w-100 mr-2 flex-1-0"
                        block
                        @click="onClickSetBank('chase')"
                    >
                        <v-img
                            :width="100"
                            :src="chaseLogo"
                        ></v-img>
                    </v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn
                        variant="outlined"
                        class="w-100 mr-2 flex-1-0"
                        block
                        @click="onClickSetBank('boa')"
                    >
                        <v-img
                            :width="100"
                            :src="bankOfAmericaLogo"
                        ></v-img>
                    </v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn
                        variant="outlined"
                        class="w-100 mr-2 flex-1-0"
                        @click="onClickSetBank('citi')"
                        block
                    >
                        <v-img
                            :width="45"
                            :src="citiLogo"
                        ></v-img></v-btn>
                </v-col>
            </v-row>

            <v-divider class="mb-4"></v-divider>

            <v-form
                @submit.prevent="(e) => e.preventDefault()"
                v-model="isValid"
            >
                <v-text-field
                    v-model="bankName"
                    :rules="[rules.required]"
                    placeholder="Bank Name"
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <v-text-field
                    v-model="addressLine1"
                    :rules="[rules.required]"
                    placeholder="Address Line 1"
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <v-text-field
                    v-model="addressLine2"
                    placeholder="Address Line 2"
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <v-text-field
                    v-model="city"
                    :rules="[rules.required]"
                    placeholder="City"
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="d-flex">
                    <v-text-field
                        v-model="zipcode"
                        :rules="[rules.required, rules.isValidZipCode]"
                        placeholder="Zip Code"
                        variant="outlined"
                        density="compact"
                        class="flex-1-0"
                    ></v-text-field>

                    <v-select
                        v-model="state"
                        placeholder="State"
                        variant="outlined"
                        density="compact"
                        :items="helpers.states"
                        :rules="[rules.required]"
                        class="ml-4 flex-1-0"
                    ></v-select>
                </div>

                <v-text-field
                    v-model="ABA"
                    :rules="[rules.required]"
                    placeholder="ABA/SWIFT Code"
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <v-checkbox
                    v-model="sameRecievingAndBenificiaryBank"
                    class="text-left"
                    label="Check this box if the recieving bank and the benificiary bank are the same"
                ></v-checkbox>

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
import helpers from "@/plugins/helpers";
import { useStore } from 'vuex';

import chaseLogo from "@/assets/chase.svg";
import bankOfAmericaLogo from "@/assets/bank-of-america.svg";
import citiLogo from "@/assets/citi.svg";

const rules = inject('rules');
const emit = defineEmits(['next']);
const store = useStore();

const isValid = ref(false);
const bankName = ref('');
const addressLine1 = ref('');
const addressLine2 = ref('');
const city = ref('');
const zipcode = ref('');
const state = ref('');
const ABA = ref('');
const sameRecievingAndBenificiaryBank = ref(false);

const onClickSetBank = (bank) => {
    if (!helpers.banks[bank]) return;
    bankName.value = helpers.banks[bank].bankName;
    addressLine1.value = helpers.banks[bank].addressLine1;
    city.value = helpers.banks[bank].city;
    zipcode.value = helpers.banks[bank].zipcode;
    state.value = helpers.banks[bank].state;
    ABA.value = helpers.banks[bank].ABA;
};

const onClickNext = () => {
    store.commit('setRecievingBank', {
        bankName: bankName.value,
        addressLine1: addressLine1.value,
        addressLine2: addressLine2.value,
        city: city.value,
        zipcode: zipcode.value,
        state: state.value,
        ABA: ABA.value
    });
    store.commit('setSameRecievingAndBenificiaryBank', sameRecievingAndBenificiaryBank.value);
    emit('next');
};
</script>