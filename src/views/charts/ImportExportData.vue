<template>
  <Row :gutter="16">
    <Col :span="24">
      <chart :options="option" class="echarts"></chart>
    </Col>
  </Row>
</template>

<script>
  var xData = function() {//定义横坐标, 根据实际值确定纵坐标
      var data = [];
      for (var i = 1; i < 32; i++) {
          data.push(i);
      }
      return data;
  }();
  export default {
    data: function () {
      let data = []
      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }
      return {
        option : {
            backgroundColor: "#344b58",
            "title": {
              "text": "本月导入任务数统计",
              x: "center",
              y: "5%",
              textStyle: {
                color: '#fff',
                fontSize: '20'
              },
              subtextStyle: {
                color: '#90979c',
                fontSize: '16',
              },
            },
            "tooltip": {
              "trigger": "axis",
              "axisPointer": {
                "type": "shadow",
                textStyle: {
                    color: "#fff"
                }
              },
            },
            "grid": {
                "borderWidth": 0,
                "top": 80,
                "bottom": 30,
                textStyle: {
                    color: "#fff"
                }
            },
            "legend": {
                x: '10%',
                top: '12%',
                textStyle: {
                    color: '#90979c',
                },
                "data": ['导入', '导出', '平均']
            },
            "calculable": true,
            "xAxis": [{
                "type": "category",
                "axisLine": {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                "splitLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "splitArea": {
                    "show": false
                },
                "axisLabel": {
                    "interval": 0,
                },
                "data": xData,
            }],
            "yAxis": [{
                "type": "value",
                "splitLine": {
                    "show": false
                },
                "axisLine": {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "interval": 0,
                },
                "splitArea": {
                    "show": false
                },
            }],
            "dataZoom": [{
                "show": true,
                "height": 30,
                "xAxisIndex": [0],
                bottom: 30,
                "start": 10,
                "end": 80,
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle:{
                    color:"#d3dee5",
                },
                  textStyle:{
                    color:"#fff"},
                  borderColor:"#90979c"
            }, {
                "type": "inside",
                "show": true,
                "height": 15,
                "start": 1,
                "end": 35
            }],
            "series": [{
                  "name": "导入",
                  "type": "bar",
                  "stack": "总量",
                  "barMaxWidth": 35,
                  "barGap": "10%",
                  "itemStyle": {
                      "normal": {
                          "color": "rgba(255,144,128,1)",
                          "label": {
                              "show": true,
                              "textStyle": {
                                  "color": "#fff"
                              },
                              "position": "insideTop",
                              formatter: function(p) {
                                  return p.value > 0 ? (p.value) : '';
                              }
                          }
                      }
                  },
                  "data": [
                      709,
                      1917,
                      2455,
                      2610,
                      1719,
                      1433,
                      1544,
                      3285,
                      1208,
                      3372,
                      2484,
                      4078,
                      709,
                      1917,
                      2455,
                      2610,
                      1719,
                      1433,
                      1544,
                      3285,
                      1208,
                      3372,
                      2484,
                      4078,
                      709,
                      1917,
                      2455,
                      2610,
                      1719,
                      1433,
                      1544,
                    
                  ],
              },

              {
                  "name": "导出",
                  "type": "bar",
                  "stack": "总量",
                  "itemStyle": {
                      "normal": {
                          "color": "rgba(0,191,183,1)",
                          "barBorderRadius": 0,
                          "label": {
                              "show": true,
                              "position": "top",
                              formatter: function(p) {
                                  return p.value > 0 ? (p.value) : '';
                              }
                          }
                      }
                  },
                  "data": [
                      327,
                      1776,
                      507,
                      1200,
                      800,
                      482,
                      204,
                      1390,
                      1001,
                      951,
                      381,
                      220,
                      327,
                      1776,
                      507,
                      1200,
                      800,
                      482,
                      204,
                      1390,
                      1001,
                      951,
                      381,
                      220,
                      327,
                      1776,
                      507,
                      1200,
                      800,
                      482,
                      204,
                    
                  ]
              }, {
                  "name": "总数",
                  "type": "line",
                  "stack": "总量",
                  symbolSize:10,
                  symbol:'circle',
                  "itemStyle": {
                      "normal": {
                          "color": "rgba(252,230,48,1)",
                          "barBorderRadius": 0,
                          "label": {
                              "show": true,
                              "position": "top",
                              formatter: function(p) {
                                  return p.value > 0 ? (p.value) : '';
                              }
                          }
                      }
                  },
                  "data": [
                      1036,
                      3693,
                      2962,
                      3810,
                      2519,
                      1915,
                      1748,
                      4675,
                      2209,
                      4323,
                      2865,
                      4298,
                      1036,
                      3693,
                      2962,
                      3810,
                      2519,
                      1915,
                      1748,
                      4675,
                      2209,
                      4323,
                      2865,
                      4298,
                      1036,
                      3693,
                      2962,
                      3810,
                      2519,
                      1915,
                      1748,
                    
                  ]
              },
            ]
        }
      }
    },
  }
</script>



<style scoped>
  .echarts {
    height: 400px;
    width: 100%;
    border-radius: 25px;
  }
</style>