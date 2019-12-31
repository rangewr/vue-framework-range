// expand-row.vue
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
  
</style>
<template>
    <Steps :current="1"   v-if="row.task_status===0"  :status="row.task_error!='error'?'':'error'">
        <Step title="已提交" ></Step>
        <Step title="导入中" content="正在导入,文件过大可能需要一点时间..." v-if="row.task_error!='error'"></Step>
        <Step title="导入中" content="导入失败,请删除本任务之后重新尝试..." v-else-if="row.task_error==='error'"></Step>
        <Step title="清洗中" ></Step>
        <Step title="完成"></Step>
    </Steps>

    <Steps :current="2"   v-else-if="row.task_status===1" :status="row.task_error!='error'?'':'error'">
        <Step title="已提交" ></Step>
        <Step title="导入中" ></Step>
        <Step title="清洗中"  content="正在清洗分析，大约需要几分钟..." v-if="row.task_error!='error'"></Step>
        <Step title="清洗中"  content="清洗数据失败，请联系系统管理员..." v-else-if="row.task_error==='error'"></Step>
        <Step title="完成"></Step>
    </Steps>

     <Steps :current="3"   v-else-if="row.task_status===2" >
        <Step title="已提交" ></Step>
        <Step title="导入中" ></Step>
        <Step title="清洗中" ></Step>
        <Step title="完成" content="处理完成，请点击查看"></Step>
    </Steps>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
