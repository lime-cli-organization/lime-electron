<template>
  <div class="wrapper">
    这是一个Template
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="试卷" label="试卷"></el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button
            type="text"
            class="el-icon-edit"
            @click="toTemplateEdit(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="toTemplateEdit">编辑</el-button>
  </div>
</template>

<script>
import { GetTemplateList } from '@/apis/Template';
export default {
  name: 'Template',
  data() {
    return {
      tableData: [],
      total: 0,
    };
  },
  created() {
    console.log('================= init ==============');
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.GetTemplateList();
    },
    async GetTemplateList() {
      let { data, total } = await GetTemplateList();
      this.total = total;
      this.tableData = data;
    },
    toTemplateEdit(item) {
      this.$router.push({
        path: '/template/edit',
        query: {
          id: item['编号'],
          scanId: item['样卷'],
        },
      });
    },
  },
};
</script>
