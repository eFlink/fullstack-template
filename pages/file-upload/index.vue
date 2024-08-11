<script setup lang="ts">

const supabase = useSupabaseClient()

const fileList = ref<FileList | null>(null)
const name = ref<string>("")

const { $client } = useNuxtApp()

const getImages = $client.image.getImages.useQuery()
const createImage = $client.image.createImage.useMutation()

interface ImageData {
    name: string | null;
    url: string;
}

const images = ref<ImageData[]>([])

watchEffect(async () => {
    if (getImages.data.value) {
        images.value = await Promise.all(
            getImages.data.value.map(async (value) => {
                const urlResponse = await supabase.storage.from("test").createSignedUrl(value.path!, 120)
                let url = ""
                if (urlResponse.data) {
                    url = urlResponse.data.signedUrl
                }
                return {
                    name: value.name,
                    url: url
                }
            })
        )
    } else {
        images.value = []
    }
})

watch(() => createImage.status.value, () => {
    if (createImage.status.value === "success") {
        getImages.refresh()
    }
})

const uploadImage = async () => {
    if (!fileList.value || name.value.length === 0) {
        console.log("file list or name is empty")
        return
    }
    const file = fileList.value[0]
    if (!file) {
        console.log("file empty")
        return
    }
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error: uploadError } = await supabase.storage.from('test').upload(filePath, file)
    if (!data || uploadError) {
        return
    }
    createImage.mutate({
        name: name.value,
        path: data.path
    })
}

</script>
<template>
    <div class="space-y-4">
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="name">Name</Label>
            <Input id="name" type="text" placeholder="File Name" v-model="name" />
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="picture">Picture</Label>
            <Input id="picture" type="file" @change="(event: Event) => {
                const target = event.target as HTMLInputElement
                fileList = target.files
            }" />
        </div>
        <Button @click.stop="() => uploadImage()">
            Upload
        </Button>
    </div>
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
        Gallery
    </h3>
    <ClientOnly>
        <div v-if="getImages.status.value === 'success'" class="grid grid-cols-3 gap-6">
            <div v-for="image in images">
                <img :src="image.url" class="w-full h-full" />
            </div>
        </div>
    </ClientOnly>
</template>