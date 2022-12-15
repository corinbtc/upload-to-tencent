/*
 * @Author: corinchen
 * @Date: 2022-12-14 17:58:49
 * @LastEditTime: 2022-12-15 10:55:30
 * @LastEditors: corinchen
 * @Description: 
 * @FilePath: \upload-to-tencent\util\stringFormat.js
 * for  good code
 */
 function  getFileName (str) {
    var reg = /[^\/]*[\/]+/g;
   
    //xxx或者是xxx/
    str = str.replace(reg,'');
    return str;
   
}
function genFileUniqueName(name) {
    const filePostfix = getSuffix(name);
    // 为保证唯一, 文件名使用md5 + 时间戳 +  一个随机数
    const filename =
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .replace(".", "");
    return filename.substring(0, 12) + filePostfix;
  };
  
  function getSuffix (fileName)  {
    const suffixIndex = fileName.lastIndexOf('.')
    if (suffixIndex === -1) {
      return ''
    }
    return fileName.substring(suffixIndex)
  }
module.exports = {
    getFileName,
    genFileUniqueName
}