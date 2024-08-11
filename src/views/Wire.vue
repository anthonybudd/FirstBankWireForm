<template>


    <v-card
        rounded="0"
        class="fill-height"
        flat
    >
        <v-progress-linear
            color="primary"
            :model-value="percentageComplete"
            :height="11"
            class="mt-1"
        ></v-progress-linear>



        <v-window
            v-if="!isLoading"
            v-model="stage"
            class="fill-height"
        >
            <v-window-item
                class="fill-height"
                align-self="center"
                v-for="stage in stages"
                :key="stage"
            >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <v-col
                        lg="4"
                        md="6"
                        xs="12"
                    >
                        <component :is="stage"></component>
                        <!-- @update:isValid="(isValid) => isValid" -->
                    </v-col>
                </v-row>
            </v-window-item>
            <v-window-item
                class="fill-height"
                align-self="center"
            >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <v-col
                        md="3"
                        xs="12"
                    >
                        <v-card
                            class="w-100"
                            elevation="0"
                        >
                            <v-card-text>
                                <p class="text-medium-emphasis">
                                    PDF Viewer
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-window-item>
        </v-window>

        <v-card-actions class="v-card-actions--bottom justify-space-between">
            <v-btn
                variant="text"
                size="x-large"
                :disabled="stage === 0"
                @click="back"
            >Back</v-btn>
            <v-item-group
                v-model="stage"
                class="text-center"
                mandatory
                v-if="!xs"
            >
                <v-item
                    v-for="n in stages.length"
                    :key="`btn-${n}`"
                    v-slot="{ isSelected, toggle }"
                >
                    <v-btn
                        :variant="isSelected ? 'outlined' : 'text'"
                        icon="mdi-record"
                        readonly
                    ></v-btn>
                </v-item>
            </v-item-group>
            <v-btn
                v-if="stage <= stages.length - 1"
                variant="flat"
                color="primary"
                @click="next"
                :disabled="!isValid || isLoading"
                :loading="isLoading"
                size="x-large"
            >
                Next
            </v-btn>
            <v-btn
                v-else
                variant="flat"
                color="primary"
                size="x-large"
            >
                Download
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import { ref, inject, onMounted, computed, watch } from 'vue';
import { useDisplay } from 'vuetify';

// Stages
import Name from './../components/Name.vue';
import AccountNumber from './../components/AccountNumber.vue';
import Address from './../components/Address.vue';


const { sm, xs } = useDisplay();
const { notify } = useNotification();
const errorHandler = inject('errorHandler');
const rules = inject('rules');

const isLoading = ref(false);
const language = ref('EN');
const stage = ref(0);
const stages = [
    Name,
    AccountNumber,
    Address
];

const percentageComplete = computed(() => {
    return ((stage.value) / stages.length) * 100;
});


const isValid = computed(() => {
    return true;

    switch (stage.value) {
        case 0:
            return (/^\d{6}$/gm.test(verificationCode.value));
        case 1:
            return isValidAddress.value;
        case 2:
            return true;
        default:
            return false;
    }
});

watch(stage, (value) => {
    // if (value === 2) initStripe();
});

const next = () => {
    stage.value = stage.value + 1;
};

const back = () => {
    stage.value = stage.value - 1;
};
</script>

<style scoped>
.v-card-actions--bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
}
</style>