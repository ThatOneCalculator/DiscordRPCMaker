<style src="~/assets/styles/style.scss" />

<style lang="scss">
.spinner {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
}

.cube1,
.cube2 {
    background-color: #7289da;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
    animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
    25% {
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
    }

    50% {
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
    }

    75% {
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    }

    100% {
        -webkit-transform: rotate(-360deg);
    }
}

@keyframes sk-cubemove {
    25% {
        transform: translateX(42px) rotate(-90deg) scale(0.5);
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
    }

    50% {
        transform: translateX(42px) translateY(42px) rotate(-179deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
    }

    50.1% {
        transform: translateX(42px) translateY(42px) rotate(-180deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
    }

    75% {
        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    }

    100% {
        transform: rotate(-360deg);
        -webkit-transform: rotate(-360deg);
    }
}

h1 {
    text-align: center;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #7289da;
    align-items: center;
    font-family: logo;
    font-kerning: none;
    letter-spacing: 0.05em;
    top: 200%;
}

.screen-size {
    width: 100vw;
    height: 100vh;
}

.center-grid {
    display: grid;
    place-items: center;
}
</style>

<template>
    <div class="screen-size center-grid">
        <div class="center container">
            <h1 class="lang-loading">Loading</h1>
            <div class="spinner">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>
            <div v-if="props.noInternet" class="lang-nointernet">
                <h2>Please connect to the internet to use Discord RPC Maker.</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// TODO: Change this to a store
const props = defineProps<{
    noInternet: boolean
}>();
</script>