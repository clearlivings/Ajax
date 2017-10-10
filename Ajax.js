/**
 * Created by clearboy on 2017/10/7.
 */
~function(){
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
    function ajax(options) {
        var _default = {
            url: "",
            type: "get",
            async: true,
            dataType: 'json',
            requestHead: null, //请求主体
            data: null, // 放在请求主体中的内容（post）
            success: null
        };
        var xhr = createXHR();
        for (var key in options) {
            if (_default.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        if (_default.type === "get") {
            _default.url.indexOf("?") >= 0 ? _default.url += "&" : _default.url += "?";
            _default.url += "_=" + Math.random();
        }
        xhr.open(_default.type, _default.url, _default.async);
        xhr.onreadystatechange = function () {
            if (/^2\d{2}$/.test(xhr.status)) {
                if (xhr.readyState == 2) {
                    if (_default.requestHead === "function") {
                        _default.requestHead.call(xhr);
                    }
                }
                if (xhr.readyState == 4) {
                    var val = xhr.responseText;
                    if (_default.dataType === "json") {
                        val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
                    }
                    _default.success && _default.success.call(xhr, val);
                }
            }
        };
        xhr.send(_default.data);
    }
    window.ajax = ajax;
}();
	
