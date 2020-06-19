<template>
  <div>
    <h1>{{id ? "编辑":"新建"}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories" :key="item._id"
            :label="item.name" :value="item._id"
          >

          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="详情">
        <vue-editor v-model="model.body" id="editor" useCustomImageHandler @image-added="handleImageAdded" ></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type='primary' native-type="submit">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
// 导入富文本编辑第三方插件
import {VueEditor} from 'vue2-editor';

export default {
  // 接收路由传递过来的各种参数
  props: {
    id: {}
  },
  components:{
    VueEditor
  },
  data(){
    return {
      model: {

      },
      categories: []
    }
  },
  methods:{
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData);
      console.log(res);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
      
    },
    async save(){
      // 增加和修改数据的方法
      let res;
      if (this.id){
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      }else{
        res = await this.$http.post('/rest/articles', this.model);
      }
      // console.log(res)
      this.$router.push('/articles/list');
      this.$message({
        type:'success',
        message: '保存成功'
      })
    },
    async fetchCategories(){
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data;
    },
    async fetch(){
      const res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data;
    },
  },
  created(){
    // 获取下拉选中的数据
    this.fetchCategories();
    // 判断是不是从编辑数据来的，如果是则进行编辑数据
    this.id && this.fetch();
  }
}
</script>
