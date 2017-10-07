/**
 * Created by clearboy on 2017/10/7.
 */
function createXHR() {
    var xhr = null,
        flag = false;
     arr = [
        function () {
            return new XMLHttpRequest();
        },
        function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }
    ];
    for(var i=0;i<arr.length;i++){
        current = arr[i];
        try {
            xhr = current();
            createXHR = current;
            break;
        }catch(e){

        }
        if(!flag){
            throw new Error("Your browser is not support Ajax,please update browser! ");
        }
    }
    return xhr;
}