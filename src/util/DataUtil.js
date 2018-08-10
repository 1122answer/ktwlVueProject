/**
 * 数据处理工具
 * 创建者：hxd
 */
class DataUtil {
    /**
     * 数据深拷贝
     * @param {object} data json数据对象
     */
    static deepCopy(data) {
        if(data){
            var strVal = null;
            var obj = null;
            strVal = JSON.stringify(data);
            obj = JSON.parse(strVal)
            return obj;
        }else{
            return '';
        }
        
    }
}
export {DataUtil};