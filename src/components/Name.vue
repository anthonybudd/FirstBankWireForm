<template>
    <v-card
        class="w-100"
        elevation="0"
    >
        <v-card-text>
            <h1>Full Name</h1>
            <v-text-field
                placeholder="Full Name"
                variant="outlined"
            ></v-text-field>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useNotification } from '@kyvg/vue3-notification';
import { ref, inject, onMounted, computed, watch, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { notify } = useNotification();
const errorHandler = inject('errorHandler');
const rules = inject('rules');
const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const step = ref(1);

const props = defineProps({
    bookID: String,
    isActive: Object,
});

const { bookID, isActive } = toRefs(props);


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



</script>