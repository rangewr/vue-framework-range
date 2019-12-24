<template>
    <Row>
        <Col span="24">
            <div class="doc-content">
                <h5>Iconfont </h5>
                <p>使用前在main.js中引入"import './assets/iconfont/iconfont.css'" </p>
                <p>详细使用说明地址:https://www.cnblogs.com/malng/p/9429982.html</p>
            </div>
            <div>
                <span>
                    <i class="iconfont icon-fabu">
                        点击发布
                    </i>
                </span>
                &emsp;&emsp;
                <span>
                    <i class="iconfont icon-dakai">
                        点击打开
                    </i>
                </span>
                &emsp;&emsp;
                <span>
                    <i class="iconfont icon-fenxiangfangshi">
                        点击分享
                    </i>
                </span>
                &emsp;&emsp;
                <span>
                    <i class="iconfont icon-gengduo">
                        查看更多
                    </i>
                </span>
                &emsp;&emsp;
                <span>
                    <i class="iconfont icon-icon_baocun">
                        点击保存
                    </i>
                </span>
            </div>


            <div class="doc-content">
                <h5>Iconfont </h5>
                <p>设置属性 class可以设置图标的样式,iconfont是基础样式 </p>
                <p>设置属性 style可以修改图标的颜色和大小</p>
            </div>

            <div>
                <span>
                    <i class="iconfont icon-fabu" style="color: orange;">
                        点击发布
                    </i>
                </span>
                &emsp;&emsp;
                <span>
                    <i class="iconfont icon-dakai" style="color: red;">
                        点击打开
                    </i>
                </span>
                &emsp;&emsp;
                <span>
                    <i class="iconfont icon-fenxiangfangshi" style="color:#1dc">
                        点击分享
                    </i>
                </span>
                <br>
                <br>
                <span>
                    <i class="iconfont icon-gengduo" style="font-size: 40px;">
                        查看更多
                    </i>
                    (文字与图标同时改变大小)
                </span>
                <br>
                <br>
                <span>
                    <i class="iconfont icon-icon_baocun" style="font-size: 40px; color: orange;">
                    </i>
                    点击保存
                </span>
            </div>
            <hr style="color: #999;">
            <div class="doc-content">
                <h5>Iview中Icon图标使用</h5>
                <p>设置属性 type改变图标的名称</p>
                <p>设置属性 size改变图标的大小</p>
                <p>设置属性 color改变图标的颜色</p>
                <p>图标使用详细说明地址:http://v2.iviewui.com/components/icon</p>
            </div>
            <div>
                <Icon type="arrow-expand" size="30" color="#e3e"></Icon>
            </div>
        </Col>
    </Row>

</template>

<script>
    export default {
        name: "Iconfont"
    }
</script>

<style scoped>

</style>