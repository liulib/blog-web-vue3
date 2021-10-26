<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import SkeletonBox from '@/components/SkeletonBox/SkeletonBox.vue'
import { decodeBase64 } from '@/utils/decodeBase64'

interface IContactInfo {
    phone: string,
    email: string,
    wechat: string,
    qq: string
}

interface IState {
    contactInfo: IContactInfo,
    handleFlag: boolean,
    loading: boolean
}

const state: IState = reactive({
    contactInfo: {
        phone: 'MTU5NzMxMzM3MzQ=',
        email: 'bGl1bGlienpAMTYzLmNvbQ==',
        wechat: 'bGwzNDYwMDE4OQ==',
        qq: 'MzQ2MDAxODk='
    },
    handleFlag: true,
    loading: true
})

const handle64 = () => {
    if (state.handleFlag) {
        Object.keys(state.contactInfo).forEach((key) => {
            state.contactInfo[key] = decodeBase64(
                state.contactInfo[key]
            );
        })

    }
    state.handleFlag = false;
}

state.loading = false

const { contactInfo, loading } = { ...toRefs(state) }
</script>

<template>
    <SkeletonBox v-if="loading"></SkeletonBox>
    <div class="app" v-else>
        <!-- 简历 -->
        <main class="container">
            <!-- 左侧边栏 -->
            <div class="leftSide">
                <div class="logo">
                    <img src="../../assets/images/logo.png" />
                    <h1 class="title">liulib的简历</h1>
                </div>

                <div class="baseInfo">
                    <div class="infoTitle">
                        <h2>基本信息</h2>
                    </div>
                    <ul>
                        <li>
                            <span>
                                姓
                                <span class="space"></span>
                                <span class="space"></span>名：
                            </span>liulib
                        </li>
                        <li>
                            <span>毕业院校：</span>湖南科技大学商学院
                        </li>
                        <li>
                            <span>毕业时间：</span>2018.06
                        </li>
                        <li>
                            <span>
                                博
                                <span class="space"></span>
                                <span class="space"></span>客：
                            </span>
                            <a href="http://www.liulib.com" target="__blank">www.liulib.com</a>
                        </li>
                        <li>
                            <span>Git Hub：</span>
                            <a href="https://github.com/liulib" target="__blank">github.com/liulib</a>
                        </li>
                    </ul>
                </div>
                <div class="contact">
                    <div class="infoTitle">
                        <h2>联系方式</h2>
                    </div>
                    <ul @mouseover="handle64">
                        <li>
                            <span>手机号：</span>
                            {{ contactInfo.phone }}
                        </li>
                        <li>
                            <span>
                                邮
                                <span class="space"></span>箱：
                            </span>
                            {{ contactInfo.email }}
                        </li>
                        <li>
                            <span>
                                微
                                <span class="space"></span>信：
                            </span>
                            {{ contactInfo.wechat }}
                        </li>
                        <li>
                            <span>
                                扣
                                <span class="space"></span>扣：
                            </span>
                            {{ contactInfo.qq }}
                        </li>
                    </ul>
                </div>
                <div class="job">
                    <div class="infoTitle">
                        <h2>应聘岗位</h2>
                    </div>
                    <ul>
                        <li>
                            <span>初级前端工程师</span>
                        </li>
                    </ul>
                </div>
                <div class="about">
                    <div class="infoTitle">
                        <h2>自我评价</h2>
                    </div>
                    <ul>
                        <li>
                            <span>一枚刚入门的前端菜鸟，能基于搜索引擎完成任务</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 右侧边栏 -->
            <div class="rigthSide">
                <!-- 简历内容 -->
                <div class="content">
                    <!-- 技能类 -->
                    <div class="skills">
                        <h1>掌握技能</h1>
                        <hr />
                        <h2>前端</h2>
                        <ul class="itemList">
                            <li>
                                <h3>HTML/CSS</h3>
                                <p>
                                    能够编写语义化的 HTML，模块化的
                                    CSS，完成常用的布局
                                </p>
                                <p>了解Less等CSS预处理和模块化工具</p>
                            </li>
                            <li>
                                <h3>JavaScript</h3>
                                <p>
                                    熟悉原生 Javascript，能脱离 jQuery
                                    等类库编码
                                </p>
                                <p>了解常用的ES6新语法，能使用常用ES6语法编码</p>
                            </li>
                            <li>
                                <h3>框架类</h3>
                                <p>熟练使用Vue.js框架，能使用其结合Vant、ElementUI进行模块化页面开发</p>
                            </li>
                        </ul>
                        <h2>后端</h2>
                        <ul class="itemList">
                            <li>
                                <h3>Python</h3>
                                <p>了解Python的基础语法，能使用Django编写简单web应用</p>
                            </li>
                            <li>
                                <h3>Linux</h3>
                                <p>了解linux常用命令，能基于Ubuntu、Nginx部署Django+Vue的前后端分离项目</p>
                            </li>
                        </ul>
                        <h2>其他</h2>
                        <ul class="itemList">
                            <li>
                                <h3>软件类</h3>
                                <p>了解Photoshop的基本使用，能使用其完成抠图等操作</p>
                            </li>
                            <li>
                                <h3>版本管理</h3>
                                <p>了解git常用命令，对git各种工作流简单了解</p>
                            </li>
                        </ul>
                    </div>
                    <!-- 项目类 -->
                    <div class="projects">
                        <h1>个人项目</h1>
                        <hr />
                        <!-- 移动商城 -->
                        <h2>
                            移动商城
                            <a href="https://github.com/liulib/mobile-shop" target="__blank">
                                <span class="iconfont icon-github"></span>
                            </a>
                            <a href="http://shop.liulib.com" target="__blank">
                                <span class="iconfont icon-tiaozhuan"></span>
                            </a>
                        </h2>
                        <ul class="itemList">
                            <li>
                                <h3>项目描述</h3>
                                <p>为了熟悉vue全家桶的使用，基于Vue全家桶+Vant开发了一个移动端商城，实现了整个商城的业务逻辑</p>
                            </li>
                            <li>
                                <h3>项目技术</h3>
                                <p>
                                    前端：vue + vue-router + vuex + axios + vant
                                    + less
                                </p>
                                <p>
                                    后端：
                                    <a
                                        href="https://github.com/hanyucd/vue-mall-mobile/tree/master/server"
                                    >使用github上找到的基于koa开发的项目</a>
                                </p>
                            </li>
                            <li>
                                <h3>项目成就</h3>
                                <p>熟悉了基于Vue全家桶的vue项目结构</p>
                                <p>熟悉了使用vue.js框架并结合Vant进行模块化页面开发</p>
                                <p>
                                    熟悉了移动端 Web
                                    页面适配方案，本项目使用vh/vw方案
                                </p>
                                <p>
                                    熟悉了函数节流 and
                                    函数防抖，并在项目中使用函数节流
                                </p>
                            </li>
                        </ul>
                        <!-- 电商管理后台 -->
                        <h2>
                            电商管理后台
                            <a href="https://github.com/liulib/manage-shop" target="__blank">
                                <span class="iconfont icon-github"></span>
                            </a>
                            <a href="http://manage.liulib.com/" target="__blank">
                                <span class="iconfont icon-tiaozhuan"></span>
                            </a>
                        </h2>
                        <ul class="itemList">
                            <li>
                                <h3>项目描述</h3>
                                <p>基于Vue+Element-ui实现的电商管理后台，实现了整体的业务逻辑</p>
                            </li>
                            <li>
                                <h3>项目技术</h3>
                                <p>
                                    前端：vue + vue-router + axios + less +
                                    element-ui
                                </p>
                                <p>
                                    后端：
                                    <a
                                        href="https://gitee.com/wBekvam/vueShop-api-server"
                                    >B站上找到的黑马程序员的实战项目后台</a>
                                </p>
                            </li>
                            <li>
                                <h3>项目成就</h3>
                                <p>此项目并没有学习到多少新知识，主要熟悉了ElementUI的使用，git的分支操作，同时了解了Vue的打包优化，如使用externals加载cdn、实现路由懒加载</p>
                            </li>
                        </ul>
                        <!-- 个人博客 -->
                        <h2>
                            个人博客
                            <a href="https://github.com/liulib/vue-blog-demo" target="__blank">
                                <span class="iconfont icon-github"></span>
                            </a>
                            <a href="http://www.liulib.com" target="__blank">
                                <span class="iconfont icon-tiaozhuan"></span>
                            </a>
                        </h2>
                        <ul class="itemList">
                            <li>
                                <h3>项目描述</h3>
                                <p>刚开始入门前端后，想做个项目练练手，就写了这个基于Vue+DRF实现的前后端分离的博客项目</p>
                            </li>
                            <li>
                                <h3>项目技术</h3>
                                <p>前端：vue + vue-router + axios</p>
                                <p>后端：django + Django REST framework</p>
                            </li>
                            <li>
                                <h3>项目成就</h3>
                                <p>熟悉了学习的html、css并实际运用到项目中</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>


<style lang="less" scoped>
a {
    text-decoration: none;
    color: #fff;

    &:hover {
        font-weight: bold;
    }
}
.app {
    padding: 10px 0;
    .container {
        width: 80%;
        display: flex;
        margin: 10px auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.2);

        .leftSide {
            width: 330px;
            box-sizing: border-box;
            background-color: #42b983;
            flex: 0 0 auto;
            margin-right: 10px;
            color: #fff;
            .logo {
                text-align: center;
                padding: 32px 0;
                img {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                }
                .title {
                    margin-top: 5px;
                    font-size: 24px;
                    color: #fff;
                    font-weight: bold;
                }
            }

            .infoTitle {
                height: 2.5rem;
                line-height: 2.5rem;
                background-color: #00ffff;
                position: relative;
                margin: 0 0 0 1rem;
                padding: 0 1rem;
                top: 0;
                left: 1rem;
                h2 {
                    color: #fff;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
            }

            .infoTitle::before {
                content: "";
                display: block;
                width: 1.5rem;
                height: 2.5rem;
                background-color: #00ffff;
                position: absolute;
                left: -1.45rem;
                clip-path: polygon(
                    80% 0%,
                    100% 0%,
                    100% 100%,
                    80% 100%,
                    0% 50%
                );
            }
            .infoTitle::after {
                content: "";
                display: block;
                width: 1rem;
                height: 1rem;
                background-color: #00ffff;
                position: absolute;
                bottom: -1rem;
                right: 0;
                clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
            }

            ul {
                padding: 10px 10px 10px 40px;
            }

            li {
                font-size: 1rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 5px 0;
            }

            li:last-child {
                white-space: normal;
            }

            span {
                font-weight: bold;
                line-height: 1.5rem;
            }
        }

        .rigthSide {
            box-sizing: border-box;
            flex: 1 1 auto;

            .content {
                padding: 2rem 2rem 0 2rem;
                a {
                    color: #42b983;
                }
                h1 {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #273849;
                    margin: 1rem 0;
                }
                h2 {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #42b983;
                    margin: 1rem 0;
                }
                .itemList {
                    padding: 0 1rem;
                    h3 {
                        font-size: 1.3rem;
                        color: #000;
                        font-weight: bold;
                    }
                    p {
                        margin: 1rem 0;
                    }
                }
                .projects {
                    span {
                        margin-left: 5px;
                    }
                }
            }
        }

        .space {
            margin-right: 1em;
        }
    }
}

@media screen and (max-width: 640px) {
    .container {
        flex-flow: column;
    }
    .leftSide {
        width: 100%;
        border-radius: 4px;
    }
    .rigthSide {
        width: 100%;
        border-radius: 4px;
    }
}

@media only screen and(max-width: 960px) {
    .container {
        width: 100%;
    }
}
</style>


