<template>
    <div ref="housebox" id="houseManage">
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>房屋信息</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>房源管理</v-breadcrumb-item>
                    <v-breadcrumb-item>房屋信息</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="clearfix">
            <div class="pull-left broadside">
                <div :class="['box2', theme]" v-contextmenu:contextmenu2>
                    <p>右键点击此区域（选定对象后可做操作）</p>
                    <v-tree :data="asyncProject" :async="getData" showLine @select="selectFu"></v-tree>
                </div>
            </div>
            <div class="pull-right right-content text-left">
                <p v-text="addressInfo" class="margin-bottom-5"></p>
                <v-button type="primary" class="margin-right-5" @click="addHouse" :disabled="addBtnFlag">增加新房屋</v-button>
                <v-button type="primary" class="margin-right-5" @click="batchaddHouse" :disabled="batchAddFlag">批量新增房屋</v-button>
                <v-button type="error" class="margin-right-5" @click="delHouse" :disabled="houseDisFlag">删除选择房屋</v-button>
                <v-button type="primary" class="margin-right-5" @click="setHouseClick" :disabled="houseDisFlag">指定房屋属性</v-button>
                <div class="margin-top-15">
                    <div :class="['box1', theme]" v-contextmenu:contextmenu1>
                        <div class="floor-unit-border">
                            <div class="clearfix">
                                <div class="unitDiv">
                                    <p class="flex-container" v-for="flrItem in floorArr">
                                        <span class="flex-item">{{flrItem.showText}}</span>
                                    </p>
                                </div>
                                <!-- :style="{width:(temParam.maxHouse*50)+'px'}" -->
                                <div class="unitDiv" v-for="temParam in unitArr">
                                    <p class="flex-container"><span class="flex-item">{{temParam.showText}}</span></p>
                                    <p class="flex-container" v-if="temParam.unitId" v-for="item in temParam.children">
                                        <span class="flex-item" v-for="itemChild in item" @click="roomclick(itemChild)" :class="{'active': itemChild.isActive}">{{itemChild.showText}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右键菜单项 -->
                <v-contextmenu ref="contextmenu1" :theme="theme">
                    <v-contextmenu-item @click="handleClick">取消选择</v-contextmenu-item>
                    <v-contextmenu-item @click="handleClick">全部选择</v-contextmenu-item>
                    <v-contextmenu-item @click="handleClick">选定整层</v-contextmenu-item>
                    <v-contextmenu-item @click="handleClick">选定整单元</v-contextmenu-item>
                </v-contextmenu>
                <v-contextmenu ref="contextmenu2" :theme="theme">
                    <v-contextmenu-item @click="contextClick">添加项目</v-contextmenu-item>
                    <v-contextmenu-item @click="contextClick" :disabled="projectFlag">删除项目</v-contextmenu-item>
                    <v-contextmenu-item @click="contextClick" :disabled="projectFlag">添加栋</v-contextmenu-item>
                    <v-contextmenu-item @click="contextClick" :disabled="buildFlag">删除栋</v-contextmenu-item>
                </v-contextmenu>
                <!-- 底部状态标识和房屋信息 -->
                <footer class="house-footer">
                    <div class="state-row margin-bottom-5"><span class="margin-right-10"><i class="idtfy"></i> 无状态</span><span class="margin-right-5"><i class="idtfy"></i> 无状态</span></div>
                    <v-row class="margin-bottom-5">
                        <v-col span="6">
                            <label>门牌号：</label><span class="house-sv-txt" v-text="spcHouse.cellid"></span>
                        </v-col>
                        <v-col span="6">
                            <label>房屋编号：</label><span class="house-sv-txt" v-text="spcHouse.houseCode"></span>
                        </v-col>
                        <v-col span="6">
                            <label>房屋结构：</label><span class="house-sv-txt" v-text="spcHouse.structure"></span>
                        </v-col>
                        <v-col span="6">
                            <label>用途：</label><span class="house-sv-txt" v-text="spcHouse.useRange"></span>
                        </v-col>
                    </v-row>
                    <v-row class="margin-bottom-5">
                        <v-col span="6">
                            <label>建筑面积：</label><span class="house-sv-txt" v-text="spcHouse.constructionArea"></span>
                        </v-col>
                        <v-col span="6">
                            <label>套内面积：</label><span class="house-sv-txt" v-text="spcHouse.comprisingArea"></span>
                        </v-col>
                        <v-col span="6">
                            <label>房间户型：</label><span class="house-sv-txt" v-text="spcHouse.roomType"></span>
                        </v-col>
                        <v-col span="6">
                            <label>户型结构：</label><span class="house-sv-txt" v-text="spcHouse.roomMode"></span>
                        </v-col>
                    </v-row>
                    <v-row class="margin-bottom-5">
                        <v-col span="24">
                            <label>备注：</label><span class="house-sv-txt" v-text="spcHouse.remark"></span>
                        </v-col>
                    </v-row>
                </footer>
            </div>
        </div>
        <AddEditHouse :visible="visible" @ok="houseOk" @cancel="houseCancel"></AddEditHouse>
        <BatchAddHouse :visible="batchVisible" @hide="batchAddHide"></BatchAddHouse>
        <AddEditBuild :is-build="buildVisible" @hide="buildAddHide"></AddEditBuild>
        <AddEditProject :is-project="projectVisible" @hide="projectAddHide"></AddEditProject>
        <SetHouseAttr :is-sethouse="sethouseVisible" @hide="setHouseHide"></SetHouseAttr>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AddEditHouse from './houseManageWidget/addEditHouse.vue'
import BatchAddHouse from './houseManageWidget/batchAddHouse.vue'
import AddEditBuild from './houseManageWidget/addEditBuild.vue'
import AddEditProject from './houseManageWidget/addEditProject.vue'
import SetHouseAttr from './houseManageWidget/setHouseAttr.vue'
export default {
    name: 'houseManage',
    props: {
        theme: 'default',
    },
    components: {
        AddEditHouse,
        BatchAddHouse,
        AddEditBuild,
        AddEditProject,
        SetHouseAttr
    },
    computed: {
        ...mapState({
            asyncProject: state => state.houseManageModule.asyncProject,
            buildArr: state => state.houseManageModule.buildArr,
            floorArr: state => state.houseManageModule.floors,
            unitArr: state => state.houseManageModule.units,
            chooseHouseArr: state => state.houseManageModule.chooseHouse,
            noUnitHouseArr: state => state.houseManageModule.noUnitHouses,
            delBuildAddress: state => state.addBuildModule.delBuildAddress,
            spcHouse: state => state.setHouseModule.spcHouse //点击某个具体的房间得到单个房间的数据
        })
    },
    created() {
        this.$store.commit('houseManageModule/RESET_DATA');
    },
    mounted() {
        this.$store.dispatch('houseManageModule/fetchProjectData');
    },
    data: function() {
        return {
            visible: false,
            batchVisible: false,
            buildVisible: false,
            projectVisible: false,
            sethouseVisible: false,
            roomdata: [],
            batchAddFlag: true,
            addBtnFlag: true,
            addressInfo: "无房屋信息",
            projectFlag: true,
            buildFlag: true,
            houseDisFlag: true,
        };
    },
    watch: {
        chooseHouseArr(newVal) {
            if (newVal) {
                if (newVal.length > 0) {
                    this.houseDisFlag = false;
                } else {
                    this.houseDisFlag = true;
                }
            }
        }
    },
    methods: {
        houseOk() {
            this.visible = false;
        },
        houseCancel() {
            this.visible = false;
        },
        batchAddHide() {
            this.batchVisible = false;
        },
        projectAddHide() {
            this.projectVisible = false;
        },
        setHouseHide() {
            this.sethouseVisible = false;
        },
        buildAddHide() {
            this.buildVisible = false;
        },
        setHouseClick() {
            this.sethouseVisible = true;
        },
        addHouse() { //单个新增房间
            this.visible = true;
        },
        batchaddHouse() { //批量新增房间
            this.batchVisible = true;
        },
        getData(node) {
            if (node.projectId) {
                if (node.buildingId) {
                    return this.$store.dispatch('houseManageModule/fetchUnitData', node.buildingId).then(res => {
                        return res;
                    });
                } else {
                    return this.$store.dispatch('houseManageModule/fetchBuildData', node.projectId).then(res => {
                        return res;
                    });
                }
            } else {
                return;
            }
        },
        delHouse() {
            let self = this;
            this.$modal.confirm({
                title: '您是否确认要删除当前选定的房间吗？',
                content: '删除之后不能恢复！',
                onOk() {
                    self.$store.dispatch('houseManageModule/delHouseData').then(res => {
                        self.$message.success(res.data.data, 1);
                        //self.$store.dispatch('houseManageModule/fetchProjectData');
                    });
                }
            });
        },
        roomclick(param) {
            //console.log('roomclick',param);
            param.isActive = !param.isActive;
            this.$store.commit('houseManageModule/CHOOSE_HOUSE_ID');
            this.$store.dispatch('setHouseModule/getHouseInfo', param.houseId);
        },
        handleClick(vm, event) {
            if (vm.$slots.default[0].text == "取消选择") {
                this.$store.commit('houseManageModule/WETHER_CHOOSE', { flag: false });
                this.$store.commit('houseManageModule/CHOOSE_HOUSE_ID');
            } else if (vm.$slots.default[0].text == "全部选择") {
                this.$store.commit('houseManageModule/WETHER_CHOOSE', { flag: true });
                this.$store.commit('houseManageModule/CHOOSE_HOUSE_ID');
            } else if (vm.$slots.default[0].text == "选定整层") {
                var boxArr = [];
                this.unitArr.forEach((currentValue, index) => {
                    currentValue.children.map(item => {
                        if (item.isActive == true) {
                            boxArr.push(item);
                        }
                    });
                });
                if (boxArr.length < 1) {
                    this.$message['warning']("请选定一个房间！");
                } else {
                    var flag = true;
                    boxArr.map((curItem, index, arr) => {
                        if (arr[0].floor != curItem.floor) {
                            flag = false;
                        }
                    })
                    if (flag) {
                        this.unitArr.forEach((currentValue, index) => {
                            currentValue.children.map(item => {
                                if (boxArr[0].floor == item.floor) {
                                    item.isActive = true;
                                }
                            });
                        });
                    } else {
                        this.$message['error']("您选定了不同层数的房间，无法执行操作！");
                    }
                }
            }
        },
        contextClick(vm, event) {
            if (vm.$slots.default[0].text == "添加栋") {
                this.buildVisible = true;
            } else if (vm.$slots.default[0].text == "删除栋") {
                let self = this;
                this.$modal.confirm({
                    title: '您是否确认要删除' + self.delBuildAddress + '吗？',
                    content: '栋下的单元和房间数据都会被删除！',
                    onOk() {
                        self.$store.dispatch('addBuildModule/buildDel').then(res => {
                            self.$message.success(res.data.data, 1);
                            self.$store.dispatch('houseManageModule/fetchProjectData');
                        });
                    }
                });
            } else if (vm.$slots.default[0].text == "添加项目") {
                this.projectVisible = true;
            } else if (vm.$slots.default[0].text == "删除项目") {
                let self = this;
                this.$modal.confirm({
                    title: '您是否确认要删除该项目吗？',
                    content: '该项目下的数据都会被删除！',
                    onOk() {
                        /* self.$store.dispatch('addBuildModule/buildDel').then(res =>{
                             self.$message.success(res.data.data,1);
                             self.$store.dispatch('houseManageModule/fetchProjectData');
                         });*/
                    }
                });
            }
        },
        selectFu(param) {
            console.log('selected', param);
            console.log(this.buildArr);
            if (param && param.length > 0) {
                if (param[0].projectId && !param[0].buildingId) { //点击项目-->删除项目和添加栋
                    this.projectFlag = false;
                    this.buildFlag = true;
                    this.addBtnFlag = true;
                    this.batchAddFlag = true;
                    var obj = {
                        location: param[0].location,
                        projectCode: param[0].projectCode,
                        projectId: param[0].projectId,
                        projectTitle: param[0].projectTitle,
                        regionCode: param[0].regionCode,
                        regionName: param[0].regionName,
                        roadno: param[0].roadno,
                        roadnoExt: param[0].roadnoExt,
                    };
                    this.$store.commit('addBuildModule/CHANGE_FORM', obj); //存储栋的数据；
                    this.addressInfo = '无房屋信息';
                } else { //栋和单元
                    var objData = {
                        buildingCode: param[0].buildingCode,
                        buildingId: param[0].buildingId,
                    }
                    if (param[0].address && param[0].buildingTitle) {
                        this.addressInfo = '房屋坐落信息：' + param[0].address;
                        objData.buildingTitle = param[0].buildingTitle;
                        objData.buildingUnit = param[0].buildingUnit;
                    } else {
                        this.buildArr.map(item => {
                            if (item.buildingId == param[0].buildingId) {
                                this.addressInfo = '房屋坐落信息：' + item.address;
                                objData.buildingTitle = item.buildingTitle;
                                objData.buildingUnit = item.buildingUnit;
                                objData.regionCode = item.regionCode;
                                objData.regionName = item.regionName;
                            }
                        });
                    }
                    this.$store.commit('batchAddHouseModule/CHANGE_BUILDING_DATA', objData); //为批量新增房屋存数据。
                    this.$store.commit('addHouseModule/CHANGE_SINGHOUSE_DATA', objData); //为新增房间存数据
                    this.$store.dispatch('houseManageModule/fetchGetHouse', {
                        buildingId: param[0].buildingId,
                        unitId: param[0].unitId || null,
                        type: 1 //暂时不知道这个参数是什么
                    });

                    if (param[0].projectId && param[0].buildingId) { //点击栋-->删除栋和添加房间
                        this.projectFlag = true;
                        this.buildFlag = false;
                        this.addBtnFlag = false;
                        this.batchAddFlag = false;
                        var obj = {
                            buildingId: param[0].buildingId,
                            address: param[0].address
                        }
                        this.$store.commit('addBuildModule/SET_BUILDING_ID', obj);
                    } else if (param[0].buildingId && param[0].unitId) { //点击单元-->添加房间
                        this.addBtnFlag = false;
                        this.batchAddFlag = false;
                        this.buildFlag = false;
                        this.projectFlag = false;
                    }
                }
            } else {
                this.addressInfo = '无房屋信息';
                this.batchAddFlag = true;
                this.addBtnFlag = true;
                this.projectFlag = true;
            }
        },

    }
}
</script>
<style>
.broadside {
    width: 220px;
}

#houseManage .right-content {
    width: calc(100% - 250px);
    min-height: 79vh;
    position: relative;
}

#houseManage .house-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #f5f5f5;
    border: 1px solid #eee;
}

.floor-unit-border span {
    display: inline-block;
    border: 1px solid #333;
    text-align: center;
    width: 90px;
    padding: 4px;
    margin: 0 4px 4px 0;
    border-radius: 3px;
    cursor: default;
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.floor-unit-border span.active {
    border: 2px solid blue;
    padding: 3px;
}

.floor-unit-border span.errorColor {
    background-color: #FF0000;
}

.floor-unit-border span.availColor {
    background-color: #008080;
}

.floor-unit-border span.finishColor {
    background-color: #FF00FF;
}

.floor-unit-border span.holdColor {
    background-color: #A23400;
}

.unitDiv {
    background-color: #f5f5f5;
    float: left;
    /* min-height: 50px; */
    /* border: 1px solid red; */
    margin-right: 4px;
}

.unitDiv .flex-container {
    width: 100%;
    /* height: 32px; */
    min-height: 32px;
    display: flex;
}

.unitDiv .flex-container .flex-item {
    flex: 1;
}
</style>
<style scoped lang='less'>
.box1 {
    width: 100%;
}

.box2 {
    min-height: 600px;
}

.state-row {
    border-bottom: 1px solid #ddd;
}

.state-row span {
    line-height: 16px;
}

.idtfy {
    border: 1px solid #333;
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: middle;
}

.house-sv-txt {
    margin-left: 3px;
}
</style>