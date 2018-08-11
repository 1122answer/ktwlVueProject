/*配置的接口请求地址*/
export const router = {
    uploader: {
        upload: 'uploadFile',
        download: 'file/imgDownload?subFilePath='
    },
    common: {
        enumerate: 'sys/common/getenumlist',
        scenumerate: 'sc/common/getenumlist',
        menuPermissions: 'sys/permission/getcurrentuserpermission',  //获取菜单权限接口
        currentUser: 'sys/user/getcurrentuser',   //获取当前登录用户信息
    },
    permission: {
        list: 'sys/permission/getpagelist', //权限列表
        add: 'sys/permission/add', //权限目录添加
        addper: 'sys/permission/batchadd', //权限列表权限模块添加
        del: 'sys/permission/delete', //权限列表删除
        getlist: 'sys/permission/get', //权限列表获取一条数据
        getdeti: 'sys/permission/getdetails', //权限列表获取一条权限详情
        status: 'sys/permission/status', //权限列表状态改变
        edit: 'sys/permission/update', //目录编辑
        editbatch: 'sys/permission/batchupdate', //权限编辑
        getpermissiontree: 'sys/permission/getpermissiontree' //根据系统ID查询权限树
    },
    org: {
        list: 'sys/organization/getpagelist',
        add: 'sys/organization/add',
        batchdel: 'sys/organization/batchdelete',
        del: 'sys/organization/delete',
        getOrg: 'sys/organization/get',
        edit: 'sys/organization/update',
        selectOrgtype: 'sys/organizationtype/getorgtypelist',
        departList: 'sys/department/getorgdepartlist',
        getorgdeptusertree: 'sys/organization/getorgdeptusertree'    //机构部门用户树
    },
    department: {
        add: 'sys/department/add',
        batchdel: 'sys/department/batchdelete',
        batchstatus: 'sys/department/batchstatus',
        del: 'sys/department/delete',
        getDepart: 'sys/department/get',
        list: 'sys/department/getpagelist',
        status: 'sys/department/status',
        edit: 'sys/department/update',
        orglist: 'sys/organization/getorglist',
        parentDept: 'sys/department/getdepartlist',
        bindUser: 'sys/orgUser/bind', //绑定用户 
        getAllUser: 'sys/user/getorgusers'
    },
    role: {
        add: 'sys/role/add', //角色添加
        batchdelete: 'sys/role/batchdelete', //根据主键字符串数组批量软删除信息
        batchstatus: 'sys/role/batchstatus', //批量设置启用状态
        delete: 'sys/role/delete', //根据主键软删除信息
        getinfo: 'sys/role/get', //根据主键获取一条信息
        list: 'sys/role/getpagelist', //角色查询
        status: 'sys/role/status', //设置启用状态
        editrole: 'sys/role/update', //编辑信息
    },
    roleRelative: {
        bindRoleSave: 'sys/rolerelation/setRoleRelation', //绑定角色   post
        getAllRoles: 'sys/role/getalllist', //获取全部的角色信息   get
        getCheckedList: 'sys/role/getcheckalllist' //获取全部带选中状态角色列表
    },
    rolepermission: {
        getinfo: 'sys/rolepermission/get', //根据主键获取信息
        getRolePermission: 'sys/rolepermission/getRolePermission', //获取角色权限关系
        save: 'sys/rolepermission/saveRolePermission', //保存角色权限关系
    },
    orgtype: {
        list: "sys/organizationtype/getpagelist", //机构类型分页列表
        add: "sys/organizationtype/add", //机构类型列表添加
        deleted: "sys/organizationtype/delete", //删除机构类型列表
        deletes: "sys/organizationtype/delete", //批量删除机构类型列表
        enabled: "sys/organizationtype/status", //启用或者停用
        getInfo: "sys/organizationtype/get", //获取一条数据
        edit: "sys/organizationtype/update", //编辑机构类型
        getorgregistertype: "sys/organizationtype/getorgregistertype", //获取机构注册类型
    },
    user: {
        list: 'sys/user/getpagelist',
        add: 'sys/user/add',
        batchdel: 'sys/user/batchdelete',
        del: 'sys/user/delete',
        untie: 'sys/orgUser/unbind',
        getUser: 'sys/user/get',
        edit: 'sys/user/update',
        treeOrg: 'sys/department/getorgdepartlist',
        getAccount: 'sys/account/generateaccount'
    },
    //行政区域接口
    region: {
        list: 'sys/region/getpagelist',
        add: 'sys/region/add',
        batchdel: 'sys/region/batchdelete',
        batchstatus: 'sys/region/batchstatus',
        del: 'sys/region/delete',
        getRegion: 'sys/region/get',
        status: 'sys/region/status',
        edit: 'sys/region/update',
        selectTree: "sys/region/getregionselecttree",
        regiontree: "sys/region/getregiontree",
        leveltree: 'sys/region/getregionleveltree',
    },
    // 日志查询
    log: {
        businesslist: "sys/generallog/getpagelist", //业务日志列表
        getbusiness: "sys/generallog/get", //业务日志获取一条数据
        getinterface: 'sys/interfacelog/get', //接口日志根据主键获取信息
        interfacelist: 'sys/interfacelog/getpagelist', //接口日志列表
        getsystemlog: 'sys/systemlog/get', //系统日志获取一条数据
        systemloglist: 'sys/systemlog/getpagelist', //系统日志列表
    },
    //系统配置
    systemmag: {
        systemlist: "sys/system/getpagelist", //系统管理列表
        add: "sys/system/add", //系统管理列表添加
        getlist: "sys/system/get", //系统管理列表编辑
        getselect: "sys/system/getlist", //系统管理列表编辑
        edit: "sys/system/update", //系统管理列表获取一条数据
        getselectlist: "sys/system/getselectlist",
        del: "sys/system/delete", //删除列表
    },
    login: {
        login: 'login', //登陆  username   password     admin   123456
    },
    //取号配置
    takeNumber: {
        getTnRuleList: "sys/tnrule/getpagelist", //获取取号规则列表
        tnRuleAdd: "sys/tnrule/add", //新增取号规则
        tnRuleBatchStatus: "sys/tnrule/batchstatus", //批量修改取号规则状态(启用或停用)
        getTnRule: "sys/tnrule/get", //获取单条取号规则
        tnRuleStatus: "sys/tnrule/status", //修改取号规则状态(启用或停用)
        takeMultiNumber: "sys/tnrule/takeMultiNumber", //取号（多个）
        takeNumber: "sys/tnrule/takeNumber", //取号（单个）
        tnKeyDelete: "sys/tnrule/tnkeydelete", //删除一个区号规则详情
        tnRuleDelete: "sys/tnrule/tnruledelete", //删除一个取号规则
        tnRuleUpdate: "sys/tnrule/update", //更新取号规则
        getruleSelect: "sys/common/getenumlist", //获取取号规则
    },
    //短信日志
    smsLog: {
        getList: "sys/smslog/getpagelist", //获取短信记录列表
        get: "sys/smslog/get", //获取单短信记录
    },
    //验证码短信日志
    vcodeSmslog: {
        getList: "sys/verifycodelog/getpagelist", //获取验证码短信日志
        getInfo: "sys/verifycodelog/get", //获取单条验证码短信记录
    },
    //短信模板
    smsTemplate: {
        getList: "sys/smstemplate/getpagelist", //获取短信模板列表
        add: "sys/smstemplate/add", //添加短信模板
        batchDelete: "sys/smstemplate/batchdelete", //批量删除
        batchStatus: "sys/smstemplate/batchstatus", //批量修改起停用状态
        delete: "sys/smstemplate/delete", //单个删除
        getInfo: "sys/smstemplate/get", //获取单个短信模板
        status: "sys/smstemplate/status", //单个修改起停用状态
        update: "sys/smstemplate/update", //更新短信模板
        getSelectList: "sys/system/getselectlist"
    },
    paramsConfig: {
        add: "sys/config/add", //  添加参数配置
        batchDel: "sys/config/batchdelete", //批量删除参数配置
        batchStatus: "sys/config/batchstatus", //批量设置启停用状态
        copySingParam: "sys/config/copy/getsingleconfig", //复制单条参数
        copyGroup: "sys/config/copy/groupconfig", //复制分组指定组参数到另外一个区域
        copyRegion: "sys/config/copy/regionconfig", //复制区域所有组参数到另外一个区域
        del: "sys/config/delete", //删除参数配置
        getParam: "sys/config/get", //  获取参数配置
        getList: "sys/config/getlist", //  根据查询条件获取参数配置list
        getPageList: "sys/config/getpagelist", //获取参数配置分页list
        getTreeData: "sys/config/gettree", //获取参数配置树形结构
        status: "sys/config/status", //设置启停用状态
        update: "sys/config/update", //更新参数配置
        groupselect:"sys/config/get/groupselect",//获取分组列表数据
        getGroup:"sys/config/get/group",//根据系统id和区域id获取分组列表
    },
    //字典管理
    dictionarymag: {
        add: "sys/dictionary/add", //  添加参数配置
        addlist:"sys/dictionary/addlist",
        batchDel: "sys/dictionary/batchdelete", //批量删除参数配置
        batchStatus: "sys/dictionary/batchstatus", //批量设置启停用状态
        getSingData: "sys/dictionary/copy/getsingleconfig", //根据分组参数key区域code得到一条参数记录
        getGroupData: "sys/dictionary/copy/groupconfig", //复制区域指定组参数到另外一个区域
        getRegionData: "sys/dictionary/copy/regiondictionary", //复制区域所有组参数到另外一个区域
        del: "sys/dictionary/delete", //删除参数配置
        getParam: "sys/dictionary/get", //  获取参数配置
        getList: "sys/dictionary/getlist", //  根据查询条件获取参数配置list
        getPageList: "sys/dictionary/getpagelist", //获取参数配置分页list
        getTreeData: "sys/dictionary/gettree", //获取参数配置树形结构
        status: "sys/dictionary/status", //设置启停用状态
        edit: "sys/dictionary/update", //更新参数配置
        group:"sys/dictionary/get/group"
    },
    messagemag: {
        msglist: "sys/message/getpagelist", //消息管理列表
        add: "sys/message/add", //消息管理列表添加
        getlist: "sys/message/get", //消息管理列表获取一条数据
        edit: "sys/message/update", //消息管理列表编辑
        revoke: "sys/message/modifyisrevoke", //消息撤销
        msgpushlist: "sys/messagepush/getpagelist", //消息推送列表
        isview: "sys/message/modifyisview", //消息修改查看状态
    },
    enclosure: {
        add: "sys/credential/add", //添加要件配置
        batchDel: "sys/credential/batchdelete", //删除要件配置
        batchStatus: "sys/credential/batchstatus", //   批量设置启停用状态
        del: "sys/credential/delete", //删除要件配置
        fileSel: "sys/credential/filetypeselect", //要件文件类型的下拉框,传入0可看支持的下拉
        fileInfo: "sys/credential/get", //获取要件配置
        getlist: "sys/credential/getlist", // 根据查询条件获取要件配置list
        getpagelist: "sys/credential/getpagelist", //获取要件配置分页list
        gettree: "sys/credential/gettree", //  获取要件配置树形结构（分组对应字典表dictionaryCode='sys_credentials'）
        status: "sys/credential/status", //设置启停用状态
        edit: "sys/credential/upate", //更新要件数配置
        group:"sys/credential/get/groupselect",  //获取分组下拉菜单
        item:"sys/credential/get/group", //获取分组下的所有配置
        enccopyregion:"sys/credential/copy/regioncredentials",   //复制区域
        groupconfig:"sys/credential/copy/groupconfig",   //复制分组
    },
    mpproject: {
        add: "sys/mpproject/add",   //添加项目
        del: "sys/mpproject/delete",  //删除一个项目
        getProject: "sys/mpproject/get",   //获取一个项目
        getAll: "sys/mpproject/getAll",    //获取所有项目
        edit: "sys/mpproject/update",    //修改项目
    },
    mpbuild: {
        add: "sys/mpbuilding/add",   //添加幢
        del: "sys/mpbuilding/delete",   //删除幢
        getBuild: "sys/mpbuilding/get",   //获取幢（单条）
        getPageList: "sys/mpbuilding/getbuildinglist",  //根据项目获取幢列表（不传参数返回所有）
        edit: "sys/mpbuilding/update",   //修改幢
    },
    mpunit: {
        getFloorData: "sys/mpunit/getfloorbybuilding",  //根据楼栋获取楼层 
        getPageList: "sys/mpunit/getunitbybuilding",  //根据幢获取单元(不传参数返回所有)
        setunitfloor: "sys/mpunit/setunitfloor",     //单元设置（单位/楼层属性）
    },
    mphouse:{
        createhouse: "sys/mphouse/batch/createhouse",   //批量创建房屋
        gethouse: "sys/mphouse/gethouse",   //获取房屋数据
        addsiglehouse: "sys/mphouse/single/createhouse",   //单个创建房屋
        del: "sys/mphouse/deletehouse",      //删除房屋
        setHouseProp: "sys/mphouse/setattr",     //设置房屋属性
        getHouseInfo: "sys/mphouse/gethouseinfo",  //获取单个房屋基础属性
    },
    //脚本接口
    script:{
        add:'sc/script/add',// 添加脚本
        batchdelete:'sc/script/batchdelete',// 批量删除脚本
        delete:'sc/script/delete',// 删除脚本
        getinfo:'sc/script/get',// 根据id获取脚本
        getpagelist:'sc/script/getpagelist',//获取脚本
        update:'sc/script/update',//更新脚本
    },
    //脚本分类接口
    scriptType:{
        add:'sc/scripttype/add',// 添加脚本分类
        batchdelete:'sc/scripttype/batchdelete',// 批量删除脚本分类
        batchstatus:'sc/scripttype/batchstatus',// 根据ids设置脚本分类启用状态
        delete:'sc/scripttype/delete',// 删除脚本分类
        getinfo:'sc/scripttype/get',// 根据id获取脚本分类
        getlist:'sc/scripttype/getpagelist',// 获取脚本分类列表
        getselectlist:'sc/scripttype/getselectlist',//获取脚本分类下拉列表
        status:'sc/scripttype/status',// 根据id设置脚本分类启用状态
        update:'sc/scripttype/update',// 更新脚本分类
    },
    //脚本变量接口
    scriptVariable:{
        add:'sc/scriptvariable/add',// 添加脚本变量
        batchdelete:'sc/scriptvariable/batchdelete',//批量删除脚本变量
        delete:"sc/scriptvariable/delete",// 删除脚本变量
        getInfo:"sc/scriptvariable/get",// 根据id获取脚本变量
        getlist:'sc/scriptvariable/getlist',// 获取脚本分类变量列表
        getpagelist:"sc/scriptvariable/getpagelist",// 获取脚本分类变量分页列表
        update:"sc/scriptvariable/update",// 更新脚本变量
    },
    //业务管理接口
    business:{
        add:'/sys/business/add',//添加业务
        batchdelete:'/sys/business/batchdelete',//批量删除业务
        delete:'/sys/business/delete',//删除业务
        getbusiness:'/sys/business/get',//根据id获取业务配置
        getpagelist:'/sys/business/getpagelist',//业务分页查询
        update:'/sys/business/update',//更新业
        
    }

}