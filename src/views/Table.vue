<template>
  <div class="animated fadeIn">
    <Row>
      <Col :md="24">
        <div>
          <div id="container" style="margin-bottom:10px;">
            <Button
              type="primary"
              size="large"
              icon="ios-cloud-upload-outline"
              id="pickfiles"
              @click="qiniu_upload"
              style="padding-bottom:5px;"
            >上传文件</Button>
            <Progress
              :percent="progresscount"
              :status="progresstatus"
              style="width=90%;vertical-align:middle"
              v-if="progresshow"
            >
              <Icon type="checkmark-circled" v-if="progresscount==100"></Icon>
              <span v-if="progresscount===100">上传成功</span>
              <Icon type="close-circled" v-if="progresstatus==='wrong'"></Icon>
              <span v-if="progresstatus==='wrong'">上传失败</span>
              <span
                style="position:absolute;left:50%;top:-5px;"
                v-if="progresscount!==0&&progresscount!=100"
              >{{progressspeed}}</span>
            </Progress>
          </div>
          <div style="position:relative;">
            <Table :columns="columns7" :data="page_video_list" ref="table"></Table>
            <div
              style="position:absolute;top:0px;width:100%;height:100%;display: flex;
              align-items: center;
              justify-content: center;background: rgba(210, 216, 222, 0.5);"
              v-if="list_loadding"
            >
              <Spin size="large"></Spin>
              <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
            </div>
          </div>
          <Page
            :total="this.video_list.length"
            show-total
            @on-change="setInitPage"
            style="text-align:right;margin-top:50px"
          ></Page>
          <Button type="primary" size="large" @click="exportData(1)">
            <Icon type="ios-download-outline"></Icon>导出原始数据
          </Button>
          <Button type="primary" size="large" @click="exportData(2)">
            <Icon type="ios-download-outline"></Icon>导出排序和过滤后的数据
          </Button>
          <Button type="primary" size="large" @click="testAxios">
            <Icon type="ios-download-outline"></Icon>测试请求
          </Button>
          <Button type="primary" size="large" @click="testSingleAxios">
            <Icon type="ios-download-outline"></Icon>登录请求
          </Button>
        </div>
      </Col>
      <Col :md="12"></Col>
    </Row>
  </div>
</template>

<script>
import expandRow from "./table-expand.vue";
import axios from "axios";
import { mapMutations } from "vuex";

var vue;
var uploader;
function getVideoName(video_name) {
  var video_name = "";
  var img_ext_list = [".jpg", ".png", ".jpeg"];
  img_ext_list.forEach(function(e) {
    if (video_name.indexOf(e) !== -1) {
      let point_index = video_name.indexOf(e);
      let leaf_index = video_name.lastIndexOf("/", point_index);
      let line_index = video_name.lastIndexOf("_", point_index);
      video_name = video_name.substring(line_index + 1);
      return video_name;
    }
  });

  var video_ext_list = [".mp4"];
  video_ext_list.forEach(function(e) {
    if (video_name.indexOf(e) !== -1) {
      let point_index = video_name.indexOf(e);
      let leaf_index = video_name.lastIndexOf("/", point_index);
      let line_index = video_name.lastIndexOf("_", point_index);
      video_name = video_name.substring(line_index + 1);
      return video_name;
    }
  });
  return video_name;
}

function getVideoDuration(video_duration_before) {
  let video_duration = parseInt(video_duration_before);
  if (video_duration <= 60) {
    if (video_duration < 10) video_duration = "00:00:0" + video_duration;
    else video_duration = "00:00:" + video_duration;
  } else if (video_duration > 60 && video_duration <= 60 * 60) {
    const minute = Math.floor(video_duration / 60);
    const s = Math.floor(video_duration % 60);
    if (minute < 10) video_duration = "00:0" + minute;
    else video_duration = "00:" + minute;

    if (s < 10) video_duration = video_duration + ":0" + s;
    else video_duration = video_duration + ":" + s;
  } else if (video_duration > 60 * 60 && video_duration < 60 * 60 * 60) {
    const hour = Math.floor(video_duration / 3600);

    const minute = Math.floor((video_duration % 3600) / 60);
    const s = Math.floor((video_duration % 3600) % 60);
    if (hour < 10) video_duration = "0" + hour;
    else video_duration = hour + "";

    if (minute < 10) video_duration = video_duration + ":0" + minute;
    else video_duration = video_duration + ":" + minute;

    if (s < 10) video_duration = video_duration + ":0" + s;
    else video_duration = video_duration + ":" + s;
  }

  return video_duration;
}
function getVideoSize(video_size) {
  if (video_size < 1024) video_size = Math.round(video_size * 100) / 100 + " B";
  else if (video_size >= 1024 && video_size < 1024 * 1024)
    video_size = Math.round((video_size / 1024) * 100) / 100 + " Kb";
  else if (video_size >= 1024 * 1024 && video_size < 1024 * 1024 * 1024)
    video_size = Math.round((video_size / (1024 * 1024)) * 100) / 100 + " Mb";

  return video_size;
}

function qiniuInit(vue) {
  uploader = Qiniu.uploader({
    runtimes: "html5,flash,html4", // 上传模式，依次退化
    browse_button: "pickfiles", // 上传选择的点选按钮，必需
    uptoken_func: function() {
      // 在需要获取uptoken时，该方法会被调用
      // return "123";
    },
    get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的uptoken
    // downtoken_url: '/downtoken',
    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
    unique_names: false, // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
    save_key: false, // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
    domain: "http://qiniu-plupload.qiniudn.com/", // bucket域名，下载资源时用到，必需
    container: "container", // 上传区域DOM ID，默认是browser_button的父元素
    max_file_size: "102400mb", // 最大文件体积限制
    flash_swf_url: "static/bower_components/plupload/js/Moxie.swf", //引入flash，相对路径
    max_retries: 3, // 上传失败最大重试次数
    dragdrop: true, // 开启可拖曳上传
    drop_element: "container", // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: "10mb", // 分块上传时，每块的体积
    auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
    multi_selection: true,
    filters: {
      max_file_size: "102400mb",
      prevent_duplicates: false,
      // Specify what files to browse for
      mime_types: [
        { title: "Video files", extensions: "mp4" }, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
        { title: "Image files", extensions: "jpg,png,jpeg" } // 限定jpg,gif,png后缀上传
      ]
    },
    init: {
      FilesAdded: function(up, files) {
        // 文件添加进队列后,处理相关的事情
        plupload.each(files, function(file) {
          vue.progresshow = true;
        });
      },
      // 每个文件上传前,处理相关的事情
      BeforeUpload: function(up, file) {
        vue.progresscount = 10;
        vue.progresstatus = "active";

        vue.progressspeed = "1.5 Mb/s";

        var interval = setInterval(function() {
          if (vue.progresscount === 40) {
            clearInterval(interval);

            vue.$Notice.success({ title: "上传成功" });

            setTimeout(function() {
              vue.progressspeed = 0;
              vue.progresstatus = "wrong";

              vue.$Message.error("上传失败");
              setTimeout(function() {
                vue.progresscount = 0;

                vue.progresshow = false;

                var obj = {
                  task_status: 0,
                  timestamp: "2017-08-10 17:03:54",
                  video_duration: "11.121667",
                  video_size: 1732410,
                  video_name:
                    "http://otl6ypoog.bkt.clouddn.com/Objectstoarge/videos/2017-08-10/33337_p.mp4"
                };

                vue.video_list.push(obj);
                vue.setInitPage(1);
              }, 4000);
            }, 1000);
          } else {
            vue.progresscount += 2;
          }
        }, 100);
      },
      // 每个文件上传时,处理相关的事情
      UploadProgress: function(up, file) {},
      // 每个文件上传成功后,处理相关的事情
      // 其中 info 是文件上传成功后，服务端返回的json，形式如
      // {
      //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
      //    "key": "gogopher.jpg"
      //  }
      // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
      FileUploaded: function(up, file, info) {},
      Error: function(up, err, errTip) {
        //上传出错时，处理相关的事情
      },
      //队列文件处理完毕后，处理相关的事情
      UploadComplete: function() {},
      // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
      // 该配置必须要在 unique_names: false , save_key: false 时才生效
      Key: function(up, file) {
        // return key
      }
    }
  });
}
export default {
  components: { expandRow },

  name: "buttons",
  data() {
    return {
      progresshow: false,
      progresscount: 0,
      progresstatus: "active",
      progressspeed: 0,
      video_list: [
        {
          task_id: 1,
          task_name: "对E字典模板-20191210",
          template_type: "派生字典",
          task_status: 0, //0表示导入中,1表示清洗中,2表示已完成
          begin_time: "2019-12-10 17:03:54",
          end_time: "",
          is_pause: 1, //1表示暂停中,0表示执行中
          task_error: ""
        },
        {
          task_id: 2,
          task_name: "对R字典模板-20190810",
          template_type: "基础字典",
          task_status: 1,
          begin_time: "2019-08-10 17:03:54",
          end_time: "2019-08-11 12:03:04",
          is_pause: 0,
          task_error: "error"
        },
        {
          task_id: 3,
          task_name: "对C字典模板-20191010",
          template_type: "基础字典",
          task_status: 1,
          begin_time: "2019-10-10 17:06:44",
          end_time: "2019-10-12 07:03:54",
          is_pause: 1,
          task_error: ""
        },
        {
          task_id: 4,
          task_name: "对M字典模板-20180810",
          template_type: "基础字典",
          task_status: 2,
          begin_time: "2018-08-10 17:03:54",
          end_time: "2018-08-10 23:53:34",
          is_pause: 0,
          task_error: ""
        },
        {
          task_id: 5,
          task_name: "对H字典模板-20190810",
          template_type: "派生字典",
          task_status: 0,
          begin_time: "2019-08-10 17:03:54",
          end_time: "",
          is_pause: 0,
          task_error: "error"
        },
        {
          task_id: 6,
          task_name: "对A字典模板-20191110",
          template_type: "基础字典",
          task_status: 2,
          begin_time: "2019-11-10 17:03:54",
          end_time: "2019-11-15 18:06:54",
          is_pause: 0,
          task_error: ""
        },
        {
          task_id: 7,
          task_name: "对E字典模板-20191210",
          template_type: "派生字典",
          task_status: 0,
          begin_time: "2019-12-10 17:03:54",
          end_time: "",
          is_pause: 0,
          task_error: ""
        },
        {
          task_id: 8,
          task_name: "对R字典模板-20190810",
          template_type: "基础字典",
          task_status: 2,
          begin_time: "2019-08-10 17:03:54",
          end_time: "2019-08-11 12:03:04",
          is_pause: 0,
          task_error: ""
        },
        {
          task_id: 9,
          task_name: "对C字典模板-20191010",
          template_type: "基础字典",
          task_status: 1,
          begin_time: "2019-10-10 17:06:44",
          end_time: "2019-10-12 07:03:54",
          is_pause: 1,
          task_error: ""
        },
        {
          task_id: 10,
          task_name: "对M字典模板-20180810",
          template_type: "基础字典",
          task_status: 2,
          begin_time: "2018-08-10 17:03:54",
          end_time: "2018-08-10 23:53:34",
          is_pause: 0,
          task_error: ""
        },
        {
          task_id: 11,
          task_name: "对H字典模板-20190810",
          template_type: "派生字典",
          task_status: 0,
          begin_time: "2019-08-10 17:03:54",
          end_time: "",
          is_pause: 0,
          task_error: ""
        },
        {
          task_id: 12,
          task_name: "对A字典模板-20191110",
          template_type: "基础字典",
          task_status: 1,
          begin_time: "2019-11-10 17:03:54",
          end_time: "2019-11-15 18:06:54",
          is_pause: 0,
          task_error: ""
        }
      ],
      pageindex: 1,
      page_video_list: [],
      lodding: false,
      list_loadding: false,
      token: "",
      columns7: [
        {
          type: "expand",
          width: 30,
          ellipsis: "false",
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "任务编号",
          key: "task_id",
          align: "center",
          width: 100,
          ellipsis: "true"
        },
        {
          title: "任务名称",
          ellipsis: "true",
          align: "center",
          key: "task_name"
        },

        {
          title: "模板分类",
          ellipsis: "true",
          align: "center",
          key: "template_type"
        },
        {
          title: "状态",
          ellipsis: "true",
          align: "center",
          filters: [
            {
              label: "导入中",
              value: 0
            },
            {
              label: "清洗中",
              value: 1
            },
            {
              label: "已完成",
              value: 2
            },
            {
              label: "运行中",
              value: 3
            },
            {
              label: "暂停",
              value: 4
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.task_status === 0;
            } else if (value === 1) {
              return row.task_status === 1;
            } else if (value === 2) {
              return row.task_status === 2;
            } else if (value === 3) {
              return row.is_pause === 0 && row.task_status != 2;
            } else if (value === 4) {
              return row.is_pause === 1;
            }
          },
          render: (h, params) => {
            const task_status = parseInt(params.row.task_status);
            const is_pause = parseInt(params.row.is_pause);
            if (task_status === 0 && is_pause === 0)
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      type: "dot",
                      color: "#76EEC6"
                    }
                  },
                  "导入中[运行]"
                )
              ]);
            else if (task_status === 1 && is_pause === 0)
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      type: "dot",
                      color: "#548B54"
                    }
                  },
                  "清洗中[运行]"
                )
              ]);
            else if (task_status === 2)
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      type: "dot",
                      color: "#1E90FF"
                    }
                  },
                  "已完成[完成]"
                )
              ]);
            else if (task_status === 0 && is_pause === 1)
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      type: "dot",
                      color: "#76EEC6"
                    }
                  },
                  "导入中[暂停]"
                )
              ]);
            else if (task_status === 1 && is_pause === 1)
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      type: "dot",
                      color: "#548B54"
                    }
                  },
                  "清洗中[暂停]"
                )
              ]);
          }
        },

        {
          title: "开始时间",
          ellipsis: "true",
          align: "center",
          key: "begin_time"
        },

        {
          title: "结束时间",
          ellipsis: "true",
          align: "center",
          key: "end_time"
        },

        {
          title: "操作",
          key: "action",
          align: "center",
          ellipsis: "true",
          render: (h, params) => {
            const task_status = parseInt(params.row.task_status);
            const is_pause = parseInt(params.row.is_pause);
            var pasueStatus = "暂停";

            if (is_pause != 0) {
              pasueStatus = "启动";
            }
            if (task_status === 0 || task_status === 1) {
              return h("div", [
                h(
                  "Tooltip",
                  {
                    props: {
                      content: "还未处理完成，暂时不能查看"
                    }
                  },
                  [
                    h(
                      "Button",
                      {
                        props: {
                          type: "primary",
                          size: "small",
                          disabled: true
                        },
                        style: {
                          marginRight: "5px"
                        }
                      },
                      "查看结果"
                    )
                  ]
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: is_pause != 0 ? "success" : "warning",
                      size: "small"
                      // disabled:true,
                    },
                    on: {
                      click: () => {
                        //this.remove(params.index);
                      }
                    }
                  },
                  pasueStatus
                )
              ]);
            } else if (task_status === 2) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      disabled: false
                    },
                    on: {
                      click: () => {
                        //alert((this.pageindex - 1) * 10 + params.index)
                        this.$router.push({
                          path: "/tabledetail"
                          //+((this.pageindex - 1) * 10 + params.index)
                        });
                      }
                    }
                  },
                  "查看结果"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          } //render
        } //{
      ] //cloumn
    }; //return
  }, //data
  methods: {
    //vuex
    ...mapMutations(["changeLogin"]),
    remove(index) {
      this.video_list.splice(index, 1);
      this.page_video_list.splice(index, 1);
    },
    qiniu_upload() {
      uploader.start();
    },
    setInitPage(page) {
      this.page_video_list = [];
      this.pageindex = page;
      let video_list = this.video_list;
      for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
        if (i < video_list.length) {
          this.page_video_list.push(this.video_list[i]);
        } else {
          break;
        }
      }
    },
    testAxios() {
      let videoMove = {
        id: 1
      };
      axios
        .post("home/testDB", videoMove)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //登录login方法
    testSingleAxios() {
      let videoMove = {
        username: "wsl",
        password: "123456"
      };
      axios.post("user/login", videoMove)
        .then(response => {
          this.token = response.data.responseData ;
          this.changeLogin({ Authorization: this.token });
        })
        .catch(error => {
          console.log(error);
        });
    },
    exportData(type) {
      if (type === 1) {
        console.log(this.$refs);
        this.$refs.table.exportCsv({
          filename: "原始数据",
          columns: this.columns7,

          data: this.video_list
        });
      } else if (type === 2) {
        this.$refs.table.exportCsv({
          filename: "排序和过滤后的数据",
          original: false
        });
      }
    }
  },
  mounted() {
    const vue = this;
    this.setInitPage(1);
    this.list_loadding = true;
    setTimeout(function() {
      vue.list_loadding = false;
    }, 1000);
    qiniuInit(vue); //初始化七牛数据
  }
};
</script>

<style type="text/css" scoped>
.ivu-tag-dot {
  border: none !important;
}
tr.ivu-table-row-hover td .ivu-tag-dot {
  background-color: #ebf7ff !important;
}

.demo-i-circle-custom h1 {
  color: #3f414d;
  font-size: 10px;
  font-weight: normal;
}
.demo-i-circle-custom p {
  color: #657180;
  font-size: 8px;
  margin: 5px 0 2px;
}
.demo-i-circle-custom span {
  display: block;
  padding-top: 15px;
  color: #657180;
  font-size: 10px;
}
.demo-i-circle-custom span :before {
  content: "";
  display: block;
  width: 50px;
  height: 1px;
  margin: 0 auto;
  background: #e0e3e6;
  position: relative;
  top: -20px;
}
.demo-i-circle-custom span i {
  font-style: normal;
  color: #3f414d;
}
/*wz-btn wz-btn-primary wz-btn-small wz-btn-loading*/

.ivu-btn.ivu-btn-primary.ivu-btn-small:not(.ivu-btn-loading) {
  padding: 2px 10px !important;
}
td.ivu-table-expanded-cell {
  background-color: white !important;
}
</style>



