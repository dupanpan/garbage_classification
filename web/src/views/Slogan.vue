<template>
  <div class="sloganPage">
      <div class="hotSearch bg-white  d-flex jc-start px-2 py-3 border-bottom" v-for="slogan in slogans" :key="slogan.id" >
      <p ><span class="fs-lg mb-2" >{{slogan.title}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
   data(){
        return {
            slogans:[]
        }
    },
    methods: {
    async fetchslogan(){
        const res = await this.$http.get(`slogans/list`)
        this.slogans = res.data
        }
    },
    created() {
      this.fetchslogan()
    },
}
</script>

<style>

</style>