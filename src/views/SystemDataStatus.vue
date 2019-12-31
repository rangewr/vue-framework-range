<template>
 <div class="animated fadeIn">
  <Row :gutter="16">
    <Col :span="24">
      <ImportExportData></ImportExportData>
    </Col>
  </Row>
  <Row :gutter="16" style="margin-top:45px">
    <Col :xs="24" :sm="12" :md="12" :lg="12">
    <!-- <Col :span="24"> -->
        <DictionaryDataChart></DictionaryDataChart>
    </Col>
    <Col :xs="24" :sm="12" :md="12" :lg="12">
        <IntelligentLearning></IntelligentLearning>
    </Col>
  </Row>
  </div>
</template>

<script>
  import DictionaryDataChart from './charts/DictionaryDataChart';
  import ImportExportData from './charts/ImportExportData';
  import IntelligentLearning from './charts/IntelligentLearning';
  export default {
    components: { DictionaryDataChart,ImportExportData,IntelligentLearning},
  }
</script>



<style scoped>
  .echarts {
    height: 500px;
    width: 100%;
    border-radius: 25px;
  }
</style>