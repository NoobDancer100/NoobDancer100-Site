<script setup>
import { reactive,ref } from 'vue';
import { supabase } from '../supabase';
import { onMounted } from 'vue';

const modList = reactive({required:[],optional:[]})
const modCache = ref({});

async function getModList() {
    const { data } = await supabase.from("modlist").select()

    data.forEach(async (value) => {
        value.version = await getVersionFromModrinth(value.modrinth)
        value.mod = await getProjectFromModrinth(value.version.project_id)
        if (value.required) {
            modList.required.push(value)
        } else {
            modList.optional.push(value)
        }
    })
}

async function getVersionFromModrinth(versionId) {
    if (modCache.value[versionId]) {
        return modCache.value[versionId]
    } else {
        const version = await fetch("https://api.modrinth.com/v2/version/"+versionId)
        const data = version.json()
        modCache.value[versionId] = data
        return data
    }
}

async function getProjectFromModrinth(versionId) {
    if (modCache.value[versionId]) {
        return modCache.value[versionId]
    } else {
        const version = await fetch("https://api.modrinth.com/v2/project/"+versionId)
        const data = version.json()
        modCache.value[versionId] = data
        return data
    }
}

function downloadProject(mod) {
    
}

onMounted(() => {
    getModList()
})
</script>

<template>
    <h1>Strange Future: Mod List</h1>
    <h2>Download Neoforge</h2>
    <p>This is a neoforge sever, meaning it ONLY works with neoforge.</p>
    <a href="https://maven.neoforged.net/releases/net/neoforged/neoforge/21.1.139/neoforge-21.1.139-installer.jar" class="download"></a>
    <h2>Required Mods</h2>
    <div class="modList">
        <div class="mod" v-for="mod in modList.required">
            <img :src="mod.mod.icon_url" class="icon">
            <div class="modInfo">
                <h3>{{ mod.mod.title }} : {{ mod.version.version_number }}</h3>
                <p class="description">{{ mod.description }}</p>

                <a class="download" :href="mod.version.files[0].url">Download from Modrinth</a>
            </div>
        </div>
    </div>
    <h2>Reccomended Mods</h2>
    <div class="modList">
        <div class="mod" v-for="mod in modList.optional">
            <img :src="mod.mod.icon_url" class="icon">
            <div class="modInfo">
                <h3>{{ mod.mod.title }} : {{ mod.version.version_number }}</h3>
                <p class="description">{{ mod.description }}</p>

                <a class="download" :href="mod.version.files[0].url">Download from Modrinth</a>
            </div>
        </div>
    </div>
    <i>Mod Suggestions can ONLY be from <a href="https://modrinth.com/">modrinth</a></i>
</template>

<style scoped lang="scss">
.modList {
    margin: 10px;

    .mod {
        display: flex;
        margin-top: 15px;
        
        .icon {
            width: 100px;
            margin-right: 10px;
            border-radius: 5px;
        }

        .modInfo {
            display: flex;
            flex-direction: column;
        }
    }
}

.download {
                margin-top: auto;
                margin-bottom: 5px;
                margin-left: 15px;

                text-decoration: none;
                padding: 7px;
                background-color: green;
                width: fit-content;
                border-radius: 5px;

                font-weight: 700;
            }
</style>