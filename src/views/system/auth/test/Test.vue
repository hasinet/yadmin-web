<template>
  <a-card>

    <MultiSpec ref="MultiSpecModel"/>


    <SelectImage
        multiple
        :maxNum="10"
        v-decorator="['imagesIds', {rules: [{required: true, message: '请至少上传1张商品图片'}]}]"
    />

  </a-card>
</template>

<script>
 import MultiSpec from '@/components/sku/MultiSpec'
import SelectImage from '@/components/image/SelectImage'

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
