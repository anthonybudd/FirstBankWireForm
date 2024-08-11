<template>
    <v-card
        class="w-75 m-auto text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>Form Ready</h1>
            <p class="text-subtitle-1 mb-4">
                Click the download button to save the wire form.
            </p>
            <div class="d-flex">
                <v-btn
                    color="primary"
                    size="large"
                    class="mb-4 ma-2 flex-1-0"
                    @click="doc.save('wire-form.pdf')"
                >Download</v-btn>
                <v-btn
                    v-if="hasNavigatorShare"
                    color="primary"
                    size="large"
                    class="mb-4 ma-2 flex-1-0"
                    @click="onClickShare"
                >Share</v-btn>
            </div>
            <PDF
                v-if="wireForm !== false"
                :src="wireForm"
            />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jsPDF } from "jspdf";
import PDF from "pdf-vue3";
import FirstBankLogo from "@/assets/logo.png";

const doc = new jsPDF();
const wireForm = ref(false);
const hasNavigatorShare = 'share' in navigator;

onMounted(() => {
    doc.setFontSize(12);
    doc.text("Customer Request for Wire Transfer", 130, 10);
    doc.addImage(FirstBankLogo, 'PNG', 10, 10, 40, 12);
    doc.text("To be Completed by Customer", 10, 30);
    wireForm.value = btoa(doc.output());
});

const onClickShare = () => {
    navigator.share({
        files: [new File([doc.output()], 'wire-form.pdf', { type: 'application/pdf' })],
    });
};
</script>