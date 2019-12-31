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
    value: 4960,
    name: '对E字典模板'
}, {
    value: 5713,
    name: '对M字典模板'
}, {
    value: 4938,
    name: '测试字典模板'
}, {
    value: 7623,
    name: '对C字典模板'
}, {
    value: 13299,
    name: '本地字典模板'
}];


export default {
    mounted(){
    },
  data: function () {
   
    return {





option : {
    backgroundColor: '#3D3D3D',
    title: {
        text: '字典数据统计表',
        x: 'center',
        y: '20px',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 20,
             color: '#FCFCFC',
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
             color: '#FCFCFC',
        },
        data: ['对E字典模板', '对M字典模板', '测试字典模板', '对C字典模板', '本地字典模板']
    },
    series: [{
        type: 'pie',
        selectedMode: 'single',
         center: ['25%', '55%'],
        radius: ['30%', '80%'],
        // color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
        color: ['#C0FF3E', '#5ab6df', '#4169E1', '#6a8bc0', '#fe8676'],

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