<template>

  <Col :span="24">
    <chart :options="option" class="echarts" id="chart" > </chart>

  </Col>

</template>

<style scoped>
.echarts {
  border-radius:25px;
    
  height: 300px;
  width: 100%;

}
</style>

<script>



var data = [{
    value: 3661,
    name: '对E字典模板'
}, {
    value: 5713,
    name: '对M字典模板'
}, {
    value: 9938,
    name: '测试字典模板'
}, {
    value: 17623,
    name: '对C字典模板'
}, {
    value: 3299,
    name: '本地字典模板'
}];


export default {
    mounted(){
    },
  data: function () {
   
    return {





option : {
    backgroundColor: '#49586e',
    title: {
        text: '智能学习统计表',
        x: 'center',
        y: '20px',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 20,
             color: '#fff',
        }
    },
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: '5%',
         top: '25%',
           textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
             color: '#fff',
        },
        data: ['对E字典模板', '对M字典模板', '测试字典模板', '对C字典模板', '本地字典模板']
    },
    series: [{
        type: 'pie',
        selectedMode: 'single',
         center: ['25%', '55%'],
        radius: ['30%', '80%'],
        // color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
        color: ['#FF3030', '#8E388E', '#6495ED', '#71C671', '#EEC900'],

        label: {
            normal: {
                position: 'inner',
                formatter: '{d}%',

                textStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 12
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: data
    }]
}
  
    



    }
  }
}
</script>