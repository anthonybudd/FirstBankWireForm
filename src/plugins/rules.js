export default {
    required: (value) => !!value || 'This field is required.',
    isFullName: (value) => !value || /^[a-zA-Z]+ [a-zA-Z]+$/.test(value) || 'Enter a full name',
    isValidZipCode: (value) => (!value || /^[0-9]{5}$/.test(value) || 'Enter a valid zip code'),
    isValidAccountNumber: (value) => (!value || /^[0-9]{10}$/.test(value) || 'Enter a valid account number'),
};