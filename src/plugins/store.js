import { createStore } from "vuex";

export default createStore({
    state: {
        amount: '',
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
        beneficiaryAccountNumber: '',
        beneficiaryAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            zipcode: '',
            state: '',
        },
        beneficiaryOccupation: '',

        sameRecievingAndBenificiaryBank: false,
        receivingBank: {
            bankName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            zipcode: '',
            state: '',
            ABA: '',
        },
        beneficiaryBank: {
            bankName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            zipcode: '',
            state: '',
            ABA: '',
        },
        intermediaryBank: {
            bankName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            zipcode: '',
            state: '',
            ABA: '',
        },
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
        setBeneficiaryAccountNumber(state, beneficiaryAccountNumber) {
            state.beneficiaryAccountNumber = beneficiaryAccountNumber;
        },
        setBeneficiaryAddress(state, beneficiaryAddress) {
            state.beneficiaryAddress = beneficiaryAddress;
        },
        setBeneficiaryOccupation(state, beneficiaryOccupation) {
            state.beneficiaryOccupation = beneficiaryOccupation;
        },


        setSameRecievingAndBenificiaryBank(state, sameRecievingAndBenificiaryBank) {
            state.sameRecievingAndBenificiaryBank = sameRecievingAndBenificiaryBank;
        },
        setReceivingBank(state, bank) {
            state.receivingBank = {
                bankName: bank.bankName,
                addressLine1: bank.addressLine1,
                addressLine2: bank.addressLine2,
                city: bank.city,
                zipcode: bank.zipcode,
                state: bank.state,
                ABA: bank.ABA,
            };
        },
        setBeneficiaryBank(state, bank) {
            state.beneficiaryBank = {
                bankName: bank.bankName,
                addressLine1: bank.addressLine1,
                addressLine2: bank.addressLine2,
                city: bank.city,
                zipcode: bank.zipcode,
                state: bank.state,
                ABA: bank.ABA,
            };
        },
        setIntermediaryBank(state, bank) {
            state.intermediaryBank = {
                bankName: bank.bankName,
                addressLine1: bank.addressLine1,
                addressLine2: bank.addressLine2,
                city: bank.city,
                zipcode: bank.zipcode,
                state: bank.state,
                ABA: bank.ABA,
            };
        },
    },
});