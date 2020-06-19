<template>
  <div>
    <h1>{{id ? "编辑":"新建"}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>

      <el-form-item label="密  码">
        <el-input type="password" v-model="model.password"></el-input>
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

      },
    }
  },
  methods:{
    async save(){
      // 增加和修改数据的方法
      let res;
      if (this.id){
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
      }else{
        res = await this.$http.post('/rest/admin_users', this.model);
      }
      // console.log(res)
      this.$router.push('/admin_users/list');
      this.$message({
        type:'success',
        message: '保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`/rest/admin_users/${this.id}`)
      this.model = res.data;
    },
  },
  created(){
    // 判断是不是从编辑数据来的，如果是则进行编辑数据
    this.id && this.fetch();
  }
}
</script>
