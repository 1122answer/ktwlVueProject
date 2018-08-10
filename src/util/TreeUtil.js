import { DataUtil } from "./DataUtil.js";
/**
 * 数据处理工具
 * 创建者：hxd
 */
class TreeUtil {
    /**
     * 构建树
     * @param {Array}data 数据项必含{id:"",pid:"",name:""}属性的数据列表
     * @param {Array} treeArr 存储将要构建的树集合
     * @param {Boolean} expanded 是否展开树，不传为展开
     */
    static build(data, treeArr, expandParam) {
        var oldArr = data || [],//存储原数据
            rootArr = [], //存储根节点数据
            leafArr = [], //存储非根数据，用于后期遍历树
            treeArr = treeArr || [],//存储将要构建的树
            expanded = expandParam;//是否展开
        if(expanded === undefined || expanded === null){
            expanded = true;
        }
        //将根数据和非根数据进行归类，并构建树的根节点
        oldArr.map((item, index, arr) => {
            item.title = item.name;//TODO
            item.children = [];
            if (item.pid == '0') {
                item.pid = 0;
                item.expanded = expanded;
                rootArr.push(item);//归类根节点数据
                treeArr.push(item);//构建树的根
            } else {
                leafArr.push(item);//归类非根节点数据
            }
        });
        //遍历所有根节点，构建树
        treeArr.map((vItem, index) => {
            eachLeaf(vItem);
            //移除空子节点集合
            if (vItem.children.length == 0) {
                delete vItem.children;
            }else {
                vItem.isparent = true;
            }
        });
        /**
         * 构建子节点树
         * @param {*} tree 子节点树
         */
        function eachLeaf(tree) {
            leafArr.map((leafItem, index) => {
                if (leafItem.pid == tree.id) {
                    var ctree = DataUtil.deepCopy(leafItem);
                    ctree.children = [];
                    eachLeaf(ctree);
                    //移除空子节点集合
                    if (ctree.children.length == 0) {
                        delete ctree.children;
                    } else {
                        ctree.isparent = true;
                    }
                    tree.children.push(ctree);
                }
            });
        }
        return treeArr;
    }
}
export { TreeUtil };