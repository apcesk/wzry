<template>
  <div>
    <h1>{{id ? "编辑":"新建"}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">

          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'avatar', res.url)">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner', res.url)">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id"
                :label="item.name" :value="item._id" 
              ></el-option>

            </el-select>
          </el-form-item>
    
          <el-form-item label="难度">
            <el-rate :max="9" style="margin-top:0.6rem;" showScore v-model="model.scores.difficult"></el-rate>
          </el-form-item>

          <el-form-item label="技能">
            <el-rate :max="9" style="margin-top:0.6rem;" showScore v-model="model.scores.skills"></el-rate>
          </el-form-item>

          <el-form-item label="攻击">
            <el-rate :max="9" style="margin-top:0.6rem;" showScore v-model="model.scores.attack"></el-rate>
          </el-form-item>

          <el-form-item label="生存">
            <el-rate :max="9" style="margin-top:0.6rem;" showScore v-model="model.scores.servive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id"
                :label="item.name" :value="item._id" 
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id"
                :label="item.name" :value="item._id" 
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧" >
            <el-input type="textarea" v-model="model.usageTips">
            </el-input>
          </el-form-item>
          
          <el-form-item label="对抗技巧" >
            <el-input type="textarea" v-model="model.battleTipes">
            </el-input>
          </el-form-item>

          <el-form-item label="团战思路" >
            <el-input type="textarea" v-model="model.teamTipes">
            </el-input>
          </el-form-item>

        </el-tab-pane>
     
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})" size="small"> <i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon' , res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>

              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>

              <el-form-item label="描述">
                <el-input type="text" v-model="item.description"></el-input>
              </el-form-item>

              <el-form-item label="小提示">
                <el-input type="text" v-model="item.tips"></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>

            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳搭档" name="partners">
          <el-button @click="model.partners.push({})" size="small"> <i class="el-icon-plus"></i> 添加英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.partners" :key="index">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name">

                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input type="text" v-model="item.description"></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(index, 1)">删除</el-button>
              </el-form-item>

            </el-col>
          </el-row>
        </el-tab-pane>

     </el-tabs>
      <el-form-item style="margin-top: 1rem;">
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
      categories:[], // 存放英雄类型的数组
      items:[], // 存放装备的数组
      model: {
        name: '',
        avatar: '',
        partners: [],
        scores: {
          difficult: 0
        },
        skills: []
      },
      heroes: []
    }
  },
  methods:{
    async save(){
      // 增加和修改数据的方法
      let res;
      if (this.id){
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      }else{
        res = await this.$http.post('/rest/heroes', this.model);
        // console.log(res);
      }
      // console.log(res)
      // 添加成功后跳转
      // this.$router.push('/heroes/list');
      this.$message({
        type:'success',
        message: '保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchItems(){
      const res = await this.$http.get(`/rest/items`)
      // this.model = res.data;
      this.items = res.data;
    },
    async fetchHeroes(){
      const res = await this.$http.get(`/rest/heroes`)
      // this.model = res.data;
      this.heroes = res.data;
    },
    async fetchCategories(){
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data;
      // console.log(this.categories);
    },
    // 上传图片成功后执行的函数
    afterUpload(res){
      // console.log(res)
      // this.$set(this.model, 'avatar', res.url);
      this.model.avatar = res.url;
      
    }
  },
  created(){
    this.fetchCategories();
    this.fetchItems(); 
    this.fetchHeroes(); 
    // 判断是不是从编辑数据来的，如果是则进行编辑数据
    this.id && this.fetch();
  }
}
</script>
