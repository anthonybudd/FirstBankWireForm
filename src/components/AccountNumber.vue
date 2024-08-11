<template>
    <v-card
        class="w-100"
        elevation="0"
    >
        <v-card-text>
            <h1>Account Number</h1>
            <v-text-field
                placeholder="Full Name"
                variant="outlined"
            ></v-text-field>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import { ref, inject, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { notify } = useNotification();
const errorHandler = inject('errorHandler');
const rules = inject('rules');
const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const step = ref(1);

const isLoadingVerificationCode = ref(false);
const verificationCode = ref('');

const stages = ref([
    'Email',   // 0
    'ID',      // 1
    'Billing', // 2
    'Review',  // 3
]);



const isValid = computed(() => {
    return true;

    switch (step.value) {
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

watch(step, (value) => {
    // if (value === 2) initStripe();
});

const next = () => {
    step.value = step.value + 1;
};

const back = () => {
    step.value = step.value - 1;
};




////////////////////////////////////////////
// 1 - Email
const resendVerificationCode = async () => {
    isLoadingVerificationCode.value = true;
    await api.user.resendVerificationEmail();
    setTimeout(() => {
        isLoadingVerificationCode.value = false;
        verificationCode.value = '';
        notify('Verification sent. Check your email');
    }, 1500);
};

const maybeSubmitVerificationForm = async () => {
    try {
        if (!isValid.value) return;
        const { data } = await api.auth.verifyEmail(verificationCode.value);
        if (data.verified) step.value = 1;
    } catch (error) {
        errorHandler(error, () => {
            verificationCode.value = '';
        });
    } finally {
        isLoadingVerificationCode.value = false;
    }
};

////////////////////////////////////////////
// 2 - Address
const addressErrors = ref({});
const isValidAddress = ref(false);

const submitAddressForm = async () => {
    try {
        isLoading.value = true;
        await api.user.updateAddress({
            addressLine1: user.value.addressLine1,
            addressLine2: user.value.addressLine2,
            addressLine3: user.value.addressLine3,
            city: user.value.city,
            zipcode: user.value.zipcode,
            state: user.value.state,
        });
        step.value = 2;
    } catch (error) {
        errorHandler(error, (data, code) => {
            if (code === 422) addressErrors.value = data;
        });
    } finally {
        isLoading.value = false;
    }
};

////////////////////////////////////////////
// 3 - Billing
let elements;
let paymentElement;

const initStripe = async () => {
    const { data: cs } = await api.user.getSetupIntent();
    elements = stripe.elements({ clientSecret: cs.clientSecret });
    paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
};

const submitStripeForm = async () => {
    const { error } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required'
    });

    if (error) {
        console.error(error);
        const messageContainer = document.querySelector('#error-message');
        messageContainer.textContent = error.message;
    } else {
        step.value = 3;
        await api.user.getLast4();
    }
};

////////////////////////////////////////////
// 4 - Review
const isLoadingCheckAccountStatus = ref(false);

const checkAccountStatus = async () => {
    isLoadingVerificationCode.value = true;
    const { data: user } = await api.user.get();
    if (user.status === 'Approved') {
        notify('Account Approved');
        router.push('/');
    } else {
        notify('Account Pending');
    }
};


</script>

<style scoped>
.v-card-actions--bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
}
</style>