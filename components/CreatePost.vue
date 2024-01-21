<template>
  <div class="editor">
    <q-field ref="fieldRef" dense v-bind:model-value="modelValue" no-error-icon borderless
      :rules="[val => isEmpty ? (!!val && val !== null) || isEmpty : true]">

      <template #control>
        <q-editor v-bind:model-value="modelValue" v-bind="$attrs" :dense="$q.screen.lt.md" ref="disc_uz"
          @update:model-value="emits('update:modelValue', $event)" min-height="10rem" max-height="20rem"
          class="q-my-sm full-width" :style="fieldRef && fieldRef.hasError ? 'border-color: #C10015' : ''" :definitions="{
            upload: {
              tip: 'Upload to cloud',
              icon: 'cloud_upload',
              handler: uploadIt
            },

          }" :toolbar="[
  [
    {
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: 'only-icons',
      options: ['left', 'center', 'right', 'justify']
    },

  ],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
  ['token', 'hr', 'link'],
  ['print', 'upload'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: [
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code'
      ]
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
      ]
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'default_font',
        'arial',
        'arial_black',
        'comic_sans',
        'courier_new',
        'impact',
        'lucida_grande',
        'times_new_roman',
        'verdana'
      ]
    },
    'removeFormat'
  ],
  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

  ['viewsource'],
  ['fullscreen']
]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}" />
      </template>
    </q-field>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },

  isEmpty: {
    type: String,
    default: ""
  }

});

const emits = defineEmits(["update:modelValue", "uploadImage"])

const fieldRef = ref(null)

const uploadIt = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.png, .jpg, .jpeg' // file extensions allowed
  let file
  input.onchange = _ => {
    const files = Array.from(input.files)
    file = files[0]
    if (file.size > 1097152) return alert("Rasm hajmi 1 MIB dan oshmasligi lozim!");

    // lets load the file as dataUrl
    const reader = new FileReader();
    let dataUrl = ''
    reader.onloadend = function () {
      dataUrl = reader.result;
      return  emits('uploadImage', '<div><img style="max-width:800px; max-height=500px;" src="' + dataUrl + '" /></div>')
    }


    reader.readAsDataURL(file)
  }
  input.click()
}



</script>

<style lang="scss" scoped></style>