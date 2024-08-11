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
                        lg="3"
                        md="6"
                        xs="12"
                    >
                        <!-- <v-col
                        lg="12"
                        md="12"
                        xs="12"
                    > -->
                        <component
                            :is="stage"
                            @next="next"
                        ></component>
                    </v-col>
                </v-row>
            </v-window-item>
        </v-window>

        <v-card-actions class="v-card-actions--bottom justify-space-between">
            <v-spacer></v-spacer>
            <v-item-group
                v-model="stage"
                class="text-center"
                mandatory
                v-if="xs !== true && stage !== stages.length - 1"
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
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';

// Stages
import Welcome from './../components/Welcome.vue';
import Amount from './../components/Amount.vue';
import Reason from './../components/Reason.vue';
import CustomerName from './../components/CustomerName.vue';
import CustomerOccupation from './../components/CustomerOccupation.vue';
import CustomerAccountNumber from './../components/CustomerAccountNumber.vue';
import CustomerAddress from './../components/CustomerAddress.vue';
import BeneficiaryName from './../components/BeneficiaryName.vue';
import BeneficiaryAddress from './../components/BeneficiaryAddress.vue';
import BeneficiaryOccupation from './../components/BeneficiaryOccupation.vue';
import ReceivingBank from './../components/ReceivingBank.vue';
import BeneficiaryBank from './../components/BeneficiaryBank.vue';
import IntermediaryBank from './../components/IntermediaryBank.vue';
import CreditUnderAdviceAccountNumber from './../components/CreditUnderAdviceAccountNumber.vue';
import Output from './../components/Output.vue';

const { xs } = useDisplay();

const isLoading = ref(false);
const stage = ref(0);
const stages = [
    Welcome,
    Amount,
    Reason,
    CustomerName,
    CustomerOccupation,
    CustomerAccountNumber,
    CustomerAddress,
    BeneficiaryName,
    BeneficiaryAddress,
    BeneficiaryOccupation,
    ReceivingBank,
    BeneficiaryBank,
    IntermediaryBank,
    CreditUnderAdviceAccountNumber,
    Output,
];

const percentageComplete = computed(() => {
    if (stage.value === stages.length - 1) return 100;
    return ((stage.value) / stages.length) * 100;
});

const next = () => {
    stage.value = stage.value + 1;
};
</script>

<style scoped>
.v-card-actions--bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
}
</style>