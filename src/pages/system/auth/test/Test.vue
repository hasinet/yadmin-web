<template>
  <div>

    <MultiSpec ref="MultiSpec" />


    <SelectImage
        multiple
        :maxNum="10"
        v-decorator="['imagesIds', {rules: [{required: true, message: '请至少上传1张商品图片'}]}]"
    />

  </div>
</template>

<script>
    import MultiSpec from './modules/MultiSpec'
    import SelectImage from './modules/SelectImage'
    export default {
        name: "Test",
        components: {
            MultiSpec,
          SelectImage
        },
    }
</script>

<style scoped>

</style>
