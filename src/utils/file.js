/**
 * @file 利用FileReader\DataURI本地转文件为base64编码
 * @author caoke
 */

/*------------------------------------------------
var File = require('tool/file');

// 必须用户事件触发，否则无效
$(document).on('tap', function(e) {
    File.get(function(file) {
        debugger;
    });
});
 -------------------------------------------------*/

//系统弹层
import MessageBox from 'mint-ui/lib/message-box';
import 'mint-ui/lib/message-box/style.css';
var $=require("jquery")
var $inputFile = null;
var isSupport = typeof FileReader !== 'undefined';
var $body = $('body');


// 通过 exports 对外提供接口
exports.get = function(callback) {
  if (isSupport) {
      $inputFile = $('<input type="file" value="" id="input-file" style="display:none;" />');
      $body.append($inputFile);

      $inputFile.on('change', function(e) {
        var file = this.files[0];

        var reader = new FileReader();

        try {
          reader.readAsDataURL(file);
        } catch(error) {
          MessageBox.alert({
            message: '该文件损坏，请上传其它文件'
          });
        }

        reader.onload = function(e){
          if (typeof callback === 'function') {

            if(/\.(jpg|jpeg|png)$/i.test(file.name)&&file.size < 3145728) { //文件不能超过3M
              callback({
                file: file,
                data: this.result
              });

            }else{
              MessageBox({
                title: '错误提示',
                message: '仅支持.jpg.jpeg.png的图片格式，图片大小不超过3M'
              });
            }


          }
        };

        reader.onerror = function(e){
          MessageBox({
            title: '错误提示',
            message: '文件读取失败，请上传其他文件'
          });
        };
      });


    $inputFile.trigger('click');
  } else {
    MessageBox({
      title: '错误提示',
      message: '抱歉，你的浏览器不支持上传，请使用现代浏览器操作！'
    });
  }
};
