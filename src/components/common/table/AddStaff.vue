<template>
  <div class="add-staff">
    <el-form :inline="true" :model="addUserForm" class="add-user-form">
      <div class="header-wrap">
        <el-row>
          <el-col :span="6">
            <el-form-item label="入职时间" prop="in_time">
              <el-date-picker
                v-model="addUserForm.in_time"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录入人">
              <el-input v-model="addUserForm.in_time"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="cancelAddStaff">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </div>
</template>

<script>
import eventVue from 'common/eventVue'
export default {
  name: "AddStaff",
  data() {
    return {
      // 添加用户数据
      addUserForm: {
        in_time: "",
        entry_person: "",
        person_state: "",
        recruiters: {
          name: "",
          telphone: "",
        },
        name: "",
        zodiac: "",
        address: "",
        wiring: "",
        sex: "",
        education: "",
        english: "",
        mobile: "",
        blood_type: "",
        political_outlook: "",
        healthy: "",
        computer: "",
        census: "",
        height: "",
        registration_address: "",
        cooking: "",
        nation: "",
        marital: "",
        service_skills: "",
        identity: "",
        leave_request: "",
      },
    };
  },
  created() {
    
  },
  methods: {
    cancelAddStaff() {
      eventVue.$emit('canceladdstaff')
    }
  }
};
</script>

<style lang='less' scoped>
</style>