<template>
    <div class="main-grid modal-background">
        <div class="modal" hidden>
            <span class="close-wrapper">
                <span class="close">
                    <img class="far fa-times-circle fa-2x" />
                </span>
                <span class="text title">ESC</span>
            </span>
            <span class="modaltitle">
                <h1 class="modalbody">{{ $t("instruction") }}</h1>
                <hr style="width:100%;margin-bottom: 3rem;" class="modalbody">
                <span class="modalbody modalbodytext">
                    <h2>FAQ goes here</h2>
                </span>
            </span>
        </div>
        <div class="modal" hidden>
            <span class="close-wrapper">
                <span class="close">
                    <img class="far fa-times-circle fa-2x" />
                </span>
                <span class="text title">ESC</span>
            </span>
            <span class="modaltitle">
                <h1 class="modalbody">{{ $t("settings") }}</h1>
                <hr style="width:100%;margin-bottom: 3rem;" class="modalbody">
                <span class="modalbody modalbodytext">
                    <h2>{{ $t("language") }}</h2>
                    <div class="customdropdown">
                        <div class="select">
                            <form>
                                <select v-model="locale">
                                    <option v-for="locale of (locales as LocaleObject[])" :key="locale.code">
                                        {{ locale.name ?? locale.code }}
                                    </option>
                                </select>

                            </form>
                        </div>
                    </div>
                    <div class="button-setup showtimestamp">
                        <label class="matter-switch max-content mr">
                            <input type="checkbox" role="switch">
                            <span class="text default">{{ $t("show_elapsed_time") }}</span>
                        </label>
                    </div>
                    <div class="button-setup autostart">
                        <label class="matter-switch max-content mr">
                            <input type="checkbox" role="switch">
                            <span class="text default">{{ $t("auto_start_last_presence") }}</span>
                        </label>
                    </div>
                    <div class="button-setup quitonclose">
                        <label class="matter-switch max-content mr">
                            <input type="checkbox" role="switch">
                            <span class="text default">{{ $t("quit_on_close") }}</span>
                        </label>
                    </div>
                    <p class="text secondary version">Build: v2.1.1</p>
                </span>

            </span>
        </div>
        <h2 class="presence-title lang-presence-title">{{ $t('presence-title') }}</h2>
        <button id="new-presence-button" class="grey-btn white-btn"><i class="fas fa-plus-circle"><br></i></button>
        <div class="presence-list grid-comp">
            <div class="presence-scroller">
            </div>
        </div>
        <input type="text" style="display: none" />

        <div class="settings-wrapper grid-comp">

        </div>
        <div class="social-wrapper grid-comp">
            <span class="left-grey-buttons">
                <button class="grey-btn"><i class="fas fa-donate"></i></button>
                <button class="grey-btn"><i class="fab fa-discord"></i></button>
                <button class="grey-btn"><i class="fab fa-github"></i></button>
                <button class="grey-btn"><i class="fas fa-globe"></i></button>
            </span>
            <span class="right-grey-buttons">
                <button class="grey-btn"><i class="fas fa-question-circle"></i></button>
                <button class="grey-btn"><i class="fas fa-cog"></i></button>
            </span>
        </div>
        <div class="logo grid-comp">
            <div class="htest">
                <h1 class="zoom lang-title">
                    <NuxtImg src="/icon.png" width="70" height="70" />&nbsp;{{ $t("title") }}
                </h1>
            </div>
        </div>
        <div class="pad-left presence-name grid-comp">
            <input class="single-input mr lang-presence-name lang-presence-name-placeholder"
                style="width: auto !important;" placeholder="Presence Name" maxlength="20" name="Presence Name"
                type="text" value="">
            <button class="btn primary enable-on-clientid mr lang-save" disabled>{{ $t("save") }}</button>
            <button class="btn primary enable-on-clientid mr lang-test" disabled>{{ $t("test") }}</button>
            <button class="btn danger enable-on-clientid mr lang-stop" hidden>{{ $t("stop") }}</button>
        </div>
        <div class="pad-left client-id grid-comp">
            <input class="single-input client-id-enabler lang-client-id lang-client-id-placeholder" maxlength="20"
                placeholder="Client ID" name="Client ID" type="text" value="">
        </div>
        <div class="pad-left large-image-name grid-comp">
            <div class="customdropdown customdisabled enable-on-clientid">
                <div class="select">
                    <form>
                        <select name="Large Image" class="enable-on-clientid" disabled>
                            <option class="lang-large-image-placeholder">{{ $t("large-image") }}
                            </option>
                            <option>None</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
        <div class="pad-left small-image-name grid-comp">
            <div class="customdropdown customdisabled enable-on-clientid">
                <div class="select">
                    <form>
                        <select name="Small Image" class="enable-on-large-image" disabled>
                            <option class="small-image-placeholder">{{ $t("small-image") }}</option>
                            <option>None</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
        <div class="pad-left description-line-1 grid-comp">
            <input class="single-input enable-on-clientid" maxlength="64" minlength="2"
                :placeholder="$t('description-1-placeholder')" name="Description" type="text" value="" disabled>
        </div>
        <div class="pad-left description-line-2 grid-comp">
            <input class="single-input enable-on-clientid" maxlength="64" minlength="2"
                :placeholder="$t('description-2-placeholder')" name="Description" type="text" value="" disabled>
        </div>
        <div class="pad-left button1 button-setup grid-comp ">
            <label class="matter-switch max-content mr">
                <input type="checkbox" role="switch">
                <span class="text secondary">{{ $t("button-1") }}</span>
            </label>
            <input class="single-input autowidth mr" maxlength="32" :placeholder="$t('button-1-label')"
                name="Button 1 label" type="text" value="" disabled>
            <input class="single-input autowidth" :placeholder="$t('button-1-url')" name="Button 1 URL" type="text"
                value="" disabled>
        </div>
        <div class="pad-left button2 button-setup grid-comp">
            <label class="matter-switch max-content mr" style="float: left;">
                <input type="checkbox" role="switch" disabled>
                <span class="text secondary">{{ $t("button-2") }}</span>
            </label>
            <input class="single-input autowidth mr" maxlength="32" :placeholder="$t('button-2-label')"
                name="Button 2 label" type="text" value="" disabled>
            <input class="single-input autowidth" :placeholder="$t('button-2-url')" name="Button 2 URL" type="text"
                value="" disabled>
        </div>
        <div id="delete-presence" class="pad-left grid-comp">
            <button class="danger outline btn" id="del-btn" disabled>{{ $t("del-btn") }}</button>
            <button class="secondary outline btn file-btn" id="file-btn">{{ $t("file-btn") }}</button>
        </div>
        <div class="grid-vr grid-comp">
            <hr class="hr-vr">
        </div>
        <div class="grid-preview grid-comp mr">
            <div class="grid-preview-pfp grid-com">
                <NuxtImg src="/wumpsearch.gif" class="preview-pfp" alt="you" />
                <span class="preview-name">{{ $t("preview-name") }}<span class="text secondary">#0001</span></span>
            </div>
            <div class="grid-preview-rpc grid-comp">
                <div class="preview-playingagame">{{ $t("preview-playingagame") }}</div>
                <div class="preview-top-section">
                    <!--we just hide this when images are off-->
                    <div class="preview-image-wrapper">
                        <NuxtImg src="/placeholder.png" class="preview-big-pic" />
                        <NuxtImg class="preview-small-pic" src="/blank.png" />
                    </div>

                    <strong class="preview-title">{{ $t("preview-title") }}</strong>
                    <p class="preview-description">
                    </p>
                    <p class="preview-description class-desc2">
                    </p>

                </div>
                <button class="btn primary outline preview-button initially-hidden">
                </button>
                <button class="btn primary outline preview-button initially-hidden">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type LocaleObject } from 'vue-i18n-routing';

const { locale, locales } = useI18n();
</script>