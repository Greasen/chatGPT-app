<script setup lang="ts">
import { reactive, ref } from "vue";
import { useOpenAi } from "./openai";
import { ElMessage } from "element-plus";

const fullscreenLoading = ref(false);

const items = ref<any[]>([]);

const form = reactive({
  desc: "",
});

function setQuestion() {
  if (form.desc) {
    fullscreenLoading.value = true;
    setMesssage(form.desc);
  } else {
    ElMessage.warning("请输入问题~");
  }
}

function cancel() {
  form.desc = "";
}

async function setMesssage(msg: string) {
  const aiData = await useOpenAi(msg);
  items.value.push(aiData)
  console.log(items.value, "data");
  fullscreenLoading.value = false;
}
</script>

<template>
  <div class="card">
    <h1>河马的呆狗子</h1>
    <el-card>
      <el-form :model="form" label-width="80px">
        <el-form-item label="提问题">
          <el-input v-model="form.desc" type="textarea" placeholder="请输入问题......" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="setQuestion"
            v-loading.fullscreen.lock="fullscreenLoading"
            >确定</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-card class="box-card">
      <div class="answer">
        <span class="label"><img src="/vite.svg" alt="" />机器人回复=></span>
        <span v-for="item in items" :key="item">{{ item }}</span>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
span {
  display: inline-block;
}
.card {
  padding: 4em;
}

.answer {
  margin: 12px;
}

.label {
  display: flex;
  align-items: center;
  margin-right: 24px;
  color: #b181ff;
}
</style>
