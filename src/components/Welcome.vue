<template>
    <v-card
        class="w-100 text-center"
        elevation="0"
    >
        <v-card-text>
            <h1>FirstBank Wire Form</h1>
            <p class="text-subtitle-1 mb-4">
                This website was made by <a href="https://anthonybudd.io">Anthony Budd</a> to generate
                FirstBank Wire Transfer Forms.
                <br>
                <br>
                The code for this website is open-sorce and free on GitHub <a
                    href="https://github.com/anthonybudd/FirstBankWireForm"
                >AnthonyBudd/FirstBankWireForm</a>
            </p>
            <v-btn
                block
                color="primary"
                size="large"
                @click="emit('next')"
            >
                Get Started
            </v-btn>

            <p class="text-subtitle-1 mt-4">
                <span class="text-red">
                    THIS IS FOR DEMO PURPOSES ONLY! DO NOT USE THIS FORM FOR REAL TRANSACTIONS! <br /><br />
                    ¡ESTE ES SOLO PARA PROPÓSITOS DEMOSTRATIVOS! ¡NO UTILICE ESTE FORMULARIO PARA TRANSACCIONES
                    REALES!
                </span>
            </p>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['next']);
</script>