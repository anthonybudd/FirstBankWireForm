import ReceivingBank from '@/components/ReceivingBank.vue';
import { createStore } from "vuex";

export default createStore({
    state: {
        amount: '0.00',
        reason: '',
        customerName: '',
        customerOccupation: '',
        customerAccountNumber: '',
        customerAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            zipcode: '',
            state: '',
        },

        beneficiaryName: '',
        beneficiaryAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            zipcode: '',
            state: '',
        },
        beneficiaryOccupation: '',

        // ReceivingBank
        // -isSame?
        // BeneficiaryBank
        // Intermediary
        // Credit Under Advice
    },
    mutations: {
        setAmount(state, amount) {
            state.amount = amount;
        },
        setReason(state, reason) {
            state.reason = reason;
        },
        setCustomerName(state, customerName) {
            state.customerName = customerName;
        },
        setCustomerOccupation(state, customerOccupation) {
            state.customerOccupation = customerOccupation;
        },
        setCustomerAccountNumber(state, customerAccountNumber) {
            state.customerAccountNumber = customerAccountNumber;
        },
        setCustomerAddress(state, customerAddress) {
            state.customerAddress = customerAddress;
        },


        setBeneficiaryName(state, beneficiaryName) {
            state.beneficiaryName = beneficiaryName;
        },
        setBeneficiaryAddress(state, beneficiaryAddress) {
            state.beneficiaryAddress = beneficiaryAddress;
        },
        setBeneficiaryOccupation(state, beneficiaryOccupation) {
            state.beneficiaryOccupation = beneficiaryOccupation;
        },


    },
    getters: {

    }
});