<template>
  <!-- :class="{'border-bottom':!plain,' pb-4':!plain}" -->
  <div class="card p-3 bg-white ">
        <div class="card-header d-flex ai-center"  >
          <i class="iconfont" :class="`icon-${icon}`"></i>
          <div class="fs-xl flex-1 px-2"><strong>{{title}}</strong></div>
          <i class="iconfont icon-more2 fs-xl" v-if="!plain"></i>
        </div>
        <div class="card-body pt-2">
          <slot></slot>
        </div>
  </div>

</template>

<script>
export default {
    // 参数
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        plain:{type:Boolean}

    }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.card{
    
        border-bottom:1px solid $border-color;

}
</style>