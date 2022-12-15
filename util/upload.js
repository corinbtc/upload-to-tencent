/*
 * @Author: corinchen
 * @Date: 2022-02-21 15:46:26
 * @LastEditTime: 2022-12-15 11:27:13
 * @LastEditors: corinchen
 * @Description:
 * @FilePath: \upload-to-tencent\util\upload.js
 * for  good code
 */
const COS = require('cos-nodejs-sdk-v5')
const fs =require('fs')
const tool = require('./stringFormat')
// 初始化单例
let singleConfig = null

 function getSingleConfig  (config)  {
  if (singleConfig === null) {
    const { SecretId, SecretKey, Region, Bucket } = config
    const cos = new COS({
      SecretId,
      SecretKey
    })
    singleConfig = {
      cos,
      Region,
      Bucket
    }
  }
  return singleConfig
}
// 上传图片
function uploadImg  (file, config) {

  try {
    const { cos, Region, Bucket } = getSingleConfig(config)
    const uploadFile = fs.createReadStream(file)
    return new Promise(function (resolve, reject){
      cos.putObject({
        Bucket: Bucket,
        Region: Region,
        Key: `${config.Module}/${tool.genFileUniqueName(file)}`, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        /* 当Body为stream类型时，ContentLength必传，否则onProgress不能返回正确的进度信息 */
        Body: uploadFile, // 上传文件对象
      }, function (err, data) {
        if (err) {
          reject(err)
        }
        resolve(data.Location)
      })
    })
  } catch (error) {
    console.log(error)
  }
}



module.exports = {
    uploadImg
}