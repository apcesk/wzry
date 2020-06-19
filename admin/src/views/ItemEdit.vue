<template>
  <div>
    <h1>{{id ? "编辑":"新建"}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type='primary' native-type="submit">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  // 接收路由传递过来的各种参数
  props: {
    id: {}
  },
  data(){
    return {
      model: {

      }
    }
  },
  methods:{
    async save(){
      // 增加和修改数据的方法
      let res;
      if (this.id){
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
      }else{
        res = await this.$http.post('/rest/items', this.model);
      }
      // console.log(res)
      this.$router.push('/items/list');
      this.$message({
        type:'success',
        message: '保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`/rest/items/${this.id}`)
      this.model = res.data;
    },
    // 上传图片成功后执行的函数
    afterUpload(res){
      // console.log(res)
      this.$set(this.model, 'icon', res.url);
      // this.model.icon = res.url;
    }
  },
  created(){
    // 判断是不是从编辑数据来的，如果是则进行编辑数据
    this.id && this.fetch();
  }
}
</script>
