<template>

    <div v-if="helpItem.propsType&&helpItem.propsType[k]">
      <el-date-picker v-if="helpItem.propsType[k]=='Time'" @change="elechange"
             v-model="curv"
             type="datetime"
                      placeholder="选择日期时间"></el-date-picker>
      <div v-else-if="helpItem.propsType[k]=='imgUrl'">
        <el-col>
          <el-input type="textarea" :title="helpItem.editHelp[k]" placeholder="请输入" v-model="curv"></el-input>
        </el-col>
        <el-button type="primary" round @click="uploadFile">图片上传</el-button>
      </div>
      <div v-else-if="helpItem.propsType[k]=='Switch'">
        <el-switch
          v-model="curv"
          active-color="#13ce66">
        </el-switch>
      </div>

      <div v-else-if="['Number','plusInt','plusNumber'].indexOf(helpItem.propsType[k])>-1">
        <el-input-number @change="elechange" controls-position="right" v-model="curv"></el-input-number> {{helpItem.propsType[k+'Unit']}}
      </div>
      <div v-else-if="helpItem.propsType[k]=='Rem'">
        <el-input-number @change="elechange" controls-position="right" v-model="curv"></el-input-number>px
      </div>

      <el-color-picker @change="elechange" v-else-if="helpItem.propsType[k]=='Color'" v-model="curv"></el-color-picker>
      <el-select @change="elechange" v-model="curv" v-else-if="helpItem.propsType[k]=='Selector'" placeholder="请选择">
        <el-option v-for="(v2,k2) in helpItem.propsType[k+'Options']"  :label="v2.value" :value="v2.key" :key="v2.key"></el-option>
      </el-select>
      <el-input type="textarea" @change="elechange" v-else-if="helpItem.propsType[k]=='Textarea'" v-model="curv"></el-input>
      <el-input v-else-if="helpItem.propsType[k]=='Url'" @change="elechange" v-model="curv" placeholder="请输入url"></el-input>
    </div>
    <el-input v-else @change="elechange" v-model="curv" placeholder="请输入"></el-input>


</template>

<script>

  import Bus from '../../marvel/bus';
  import File from '@/utils/file';
  export default{
    components: {

    },
    data() {
      return {
        key:0,
        curv:undefined,
      };
    },
    props:['v','helpItem','card','k','path'],
    watch:{
      curv:function (nv,ov) {
        if(ov===undefined){

          this.$emit('eleinit',nv,ov,this.path)
        }else{
          //正整数
          if(this.helpItem.propsType[this.k]=="plusInt"){
            if(parseInt(nv)!=nv||nv<1){
              this.$nextTick(()=>{
                if(parseInt(ov)!=ov||ov<1){
                  this.curv=1;
                }else{
                  this.curv=ov;
                }
              })
              return;
            }
            //整数
          }else if(this.helpItem.propsType[this.k]=="Int"){
            if(parseInt(nv)!=nv){
              this.$nextTick(()=>{
                if(parseInt(ov)!=ov){
                  this.curv=0;
                }else{
                  this.curv=ov;
                }
              })
              return;
            }
            //正数
          }else if(this.helpItem.propsType[this.k]=="plusNumber"||this.helpItem.propsType[this.k]=="Rem"){
            if(nv<=0){
              this.$nextTick(()=>{
                if(ov<=0){
                  this.curv=1;
                }else{
                  this.curv=ov;
                }
              })
              return;
            }
          }
          if(nv!=ov){
            this.$emit('elechange',nv,ov,this.path)
          }

        }
      }
    },
    methods:{
      elechange:function () {

      },
      uploadFile:function () {
        var the=this
        File.get(function (data) {
          var data=data;
          if(process.env.NODE_ENV=="development"){
            the.curv=data.data;
          }else{
            the.$http.post("/subject/h5/ajaxuploadphoto?page_id=6225&uploadtype=file",{
              file:data.data
            }).then(function (response) {
              var url=response.data.data.url
              the.curv=url;
            })
          }
          the.key++
        })
      },
    },
    mounted:function () {
      this.curv=this.v;
      this.prev=this.v;
    },
  };

</script>
<style>


</style>
