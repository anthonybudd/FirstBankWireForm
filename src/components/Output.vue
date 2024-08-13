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
                    @click="onClickDownload"
                >Download</v-btn>
                <v-icon
                    v-if="hasNavigatorShare"
                    color="primary"
                    icon="mdi-export-variant"
                    class="mb-4 ma-4"
                    size="large"
                    @click="onClickShare"
                ></v-icon>
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
import { jsPDF } from 'jspdf';
import PDF from 'pdf-vue3';
import { useStore } from 'vuex';
import moment from 'moment';

import FirstBankLogo from '@/assets/logo.png';
import WireFormTemplate from '@/assets/wire-form.png';

const pdf = new jsPDF();
const store = useStore();
const wireForm = ref(false);
const hasNavigatorShare = 'share' in navigator;

const state = store.state;


onMounted(() => {
    generatePDF();
});

const generatePDF = () => {
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.addImage(WireFormTemplate, 'PNG', 1, 1, 208, 295);
    pdf.addImage(FirstBankLogo, 'PNG', 18.5, 24, 34, 11);
    pdf.text(state.customerAccountNumber, 30, 54);
    pdf.text(state.customerName, 30, 63);
    pdf.text(`${state.customerAddress.addressLine1}, ${state.customerAddress.addressLine2}`, 30, 66.5);
    pdf.text(`${state.customerAddress.city}, ${state.customerAddress.state}, ${state.customerAddress.zipcode}`, 30, 70);
    pdf.text(`${state.customerOccupation}`, 30, 78.5);
    pdf.text(`${state.amount}`, 30, 87);
    pdf.text(`x`, 29, 91.5);

    pdf.text(state.beneficiaryName, 30, 101.5);
    pdf.text(state.beneficiaryAddress.addressLine1, 30, 105.5);
    pdf.text(state.beneficiaryAddress.addressLine2, 30, 109);
    pdf.text(`${state.beneficiaryAddress.city}, ${state.beneficiaryAddress.state}, ${state.beneficiaryAddress.zipcode}`, 30, 113);

    pdf.text(state.beneficiaryOccupation, 30, 121);

    pdf.text(state.receivingBank.bankName, 30, 130);
    pdf.text(`${state.receivingBank.addressLine1}, ${state.receivingBank.addressLine2}`, 30, 133.5);
    pdf.text(`${state.receivingBank.city}, ${state.receivingBank.state}, ${state.receivingBank.zipcode}`, 30, 137);
    pdf.text(`${state.receivingBank.ABA}`, 44, 141);

    pdf.text(state.beneficiaryBank.bankName, 30, 149);
    pdf.text(`${state.beneficiaryBank.addressLine1}, ${state.beneficiaryBank.addressLine2}`, 30, 152.5);
    pdf.text(`${state.beneficiaryBank.city}, ${state.beneficiaryBank.state}, ${state.beneficiaryBank.zipcode}`, 30, 156);
    pdf.text(`${state.beneficiaryBank.ABA}`, 44, 160);
    if (state.sameRecievingAndBenificiaryBank || state.receivingBank.ABA == state.beneficiaryBank.ABA) pdf.text(`x`, 145, 164);

    if (state.intermediaryBank.bankName) pdf.text(state.intermediaryBank.bankName, 30, 175);
    if (state.intermediaryBank.addressLine1) pdf.text(`${state.intermediaryBank.addressLine1}, ${state.intermediaryBank.addressLine2}`, 30, 179);
    if (state.intermediaryBank.city) pdf.text(`${state.intermediaryBank.city}, ${state.intermediaryBank.state}, ${state.intermediaryBank.zipcode}`, 30, 182.5);
    if (state.intermediaryBank.ABA) pdf.text(`${state.intermediaryBank.ABA}`, 44, 186);

    pdf.text(`${state.reason}`, 30, 195);
    pdf.text(`${state.beneficiaryAccountNumber}`, 95, 208);

    wireForm.value = btoa(pdf.output());
};
const onClickDownload = () => pdf.save(`wire-form-${moment().format('YYYY-MM-DD')}.pdf`);

const onClickShare = () => {
    navigator.share({
        files: [new File([pdf.output()],
            `wire-form-${moment().format('YYYY-MM-DD')}.pdf`,
            { type: 'application/pdf' })
        ],
    });
};
</script>

<style>
.target {
    position: absolute;
    top: 1px;
    width: 617px;
    left: 324px;
    top: 79px;
    opacity: 0;
}
</style>