/*
 *图片滚动效果
 *html结构：
 *div#some>div.slideMain
 *使用方法：
 //var oPar=document.getElementById("moveWrap");
 //Playslide(oPar,{
	 //slideTime:4500
 //});
*/
;(function () {
    "use strict";
    function Playslide (x,arglist) {
        if(!(this instanceof Playslide)) return new Playslide(x,arglist);
        //quit if no root element
        if(!x) return;
        var oParent=x, slideWrap, objX, objY, objItem, args, reExp, pageItem, length;
        slideWrap=getElementsByClassName("slideMain",oParent)[0];

        //活动屏幕尺寸
        objX=slideWrap.clientWidth;
        objY=slideWrap.clientHeight;
        args={
            initSlide:null,
            curSlide:0,          //当前活动对象的索引
            slideTime:4000,      //对象交接间隔的时间
            speed:350,           //对象交接所用时间
            continuous:true,     //对象自动交接
            slideType:"init",    //更换效果
            showPage:true        //是否显示页码
        };

        //当前对象特有的className正则表达式
        reExp=new RegExp(/(\s|^)active(\s|$)/gi);
        if(arguments.length>=2){
            var argValid=arguments[1];
            for(var validNum in argValid){
                if(args.hasOwnProperty(validNum)){
                    args[validNum]=argValid[validNum];
                }
            }
            argValid=null;
        }        
       
        //初始化默认滚动
        function init(){             

            //获取滚动图片的数量
            (function(exports){
                var slideNode=slideWrap.childNodes;
                for(var i=0;i<slideNode.length;i++){
                    if(slideNode[i].nodeType===1){
                        exports.push(slideNode[i]);
                    }
                }
            })(objItem=[]);
            /*
             *更换效果
            */
            var activeclass=slideWrap.className;
            if(!(/(\s+)[a-zA-Z]$/g.test(args["slideType"]))){
                slideWrap.className=activeclass.split(" ")[0]+" move_"+args["slideType"]; 
            }

            length=objItem.length;
            if(length<2) args["showPage"]=false; 

            //所有对象索引按钮集合数组
            pageItem=[length];
            if(+args["showPage"]==1 ){                                           
                var ulr=creatElement("ul","slideNav move_nav");           
                for(var i=0;i<objItem.length;i++){
                    var lir=creatElement("li");
                    var li_child=creatElement("a","dot");
                    li_child.setAttribute("href","javascript:;");
                    li_child.innerHTML=i+1;
                    lir.appendChild(li_child);                             
                    ulr.appendChild(lir);
                    pageItem[i]=lir;
                }
                oParent.appendChild(ulr);
                ulr="";
                lir="";
                li_child="";                
            }           
            var n=objItem.length;
            while(n--){
                removeClass(objItem[n],reExp);
                removeClass(pageItem[n],reExp);
            }                    
            objItem[args.curSlide].className+='active';
            pageItem[args.curSlide].className+='active';
            switch (args["slideType"]){
                case "leftRight":
                    (function (){
                        slideWrap.style.width=objItem.length*objX+"px";                        
                        slideWrap.style.transform="translate(-"+args["curSlide"]*objX+"px,0)";
                        slideWrap.style.transition="left "+args["speed"]+"ms ease-in 0";                                                    
                    })();
                    break;
            }
            args["initSlide"]=setInterval(function(){
                next();
            },args["slideTime"]);
            slideWrap.onmousemove=function(){
                clearInterval(args["initSlide"]);
            }
            slideWrap.onmouseout=function(){
                args["initSlide"]=setInterval(function(){
                    next();
                },args["slideTime"]);
            }
            turnPage();
        }

        //向后翻页
        function next(){
            //显示图片是尾部
            if(args["curSlide"]==objItem.length-1){
                removeClass(objItem[args["curSlide"]],reExp);
                args["curSlide"]=-1;                
                objItem[++args["curSlide"]].className+='active';

            }else if(args["curSlide"]<objItem.length-1 && args["curSlide"]>=0){                
                removeClass(objItem[args["curSlide"]],reExp);
                objItem[++args["curSlide"]].className+='active';
                
            } 
            slideVisual(args["curSlide"]);    
            lightPage();
        }

        //向前翻页
        function prev(){
            //显示图片是头部
            if(args["curSlide"]==0){
                removeClass(objItem[args["curSlide"]],reExp);
                args["curSlide"]=objItem.length;                
                objItem[--args["curSlide"]].className+='active';                
            }else if(args["curSlide"]<objItem.length && args["curSlide"]>0){                
                removeClass(objItem[args["curSlide"]],reExp);
                objItem[--args["curSlide"]].className+='active';                
            }
            slideVisual(args["curSlide"]); 
            lightPage();
        }

        //上下(或左右)翻页
        function turnPage(){
            if(+args["showPage"]==0) return;
            for(var i=0;i<pageItem.length;i++){                
                (function(i){
                    this.onclick=function(){
                        if(i!=args["curSlide"]){
                            clearInterval(args["initSlide"]);
                            removeClass(objItem[args["curSlide"]],reExp);
                            removeClass(pageItem[args["curSlide"]],reExp);
                            objItem[i].className+='active';
                            args["curSlide"]=i; 
                            slideVisual(args["curSlide"]);                     
                            lightPage();                            
                        }
                    }
                }).call(pageItem[i],i);                
            }
        }
        //当前页码标亮
        function lightPage(){
            for(var i=0;i<pageItem.length;i++){
                if(reExp.test(pageItem[i].className) && (args["curSlide"]!=i)){
                    pageItem[i].className=pageItem[i].className.replace(reExp,"");
                    break;
                }

            }
            pageItem[args["curSlide"]].className+='active';
        }
        //翻页效果
        function slideVisual(index){
            switch (args["slideType"]){
                case "leftRight":
                    (function (){
                        slideWrap.style.transform="translate(-"+index*objX+"px,0)";
                        slideWrap.style.transition="all "+args["speed"]+"ms ease-in";                                                                    
                    })();
                    break;
            }            
        }
        init();
        return{
            nextPage:next,
            prevPage:prev
        }
    };
    window.Playslide=Playslide;
    if ( window.jQuery || window.Zepto ) {
      (function($) {
        $.fn.Playslide = function(params) {
          return this.each(function() {
            $(this).data('Playslide', new Playslide($(this)[0], params));
          });
        }
      })( window.jQuery || window.Zepto );
    }
})();
/*===========================
Playslide AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.Playslide;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Playslide;
    });
}
/*重写getElementsByClassName(className,root,tagName)
 *使用方法getElementsByClassName()
*/
function getElementsByClassName(className,root,tagName){
    'use strict';
    
    if(root){
        root=typeof root=="string"?document.getElementById(root):root;
    }else{
        root=document.body;
    }
    tagName=tagName||"*";

    //如果浏览器支持getElementsByClassName，就直接的用                                    
    if (document.getElementsByClassName){                    
        return root.getElementsByClassName(className);
    }else{ 
        //获取指定元素
        var tag=root.getElementsByTagName(tagName);    
        //用于存储符合条件的元素
        var tagAll=[]; 

        //遍历获得的元素                                   
        for (var i=0;i<tag.length;i++) {                

            //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
            for(var j=0,n=tag[i].className.split(' ');j<n.length;j++){    
                if(n[j]==className){
                    tagAll.push(tag[i]);
                    break;
                }
            }
        }
        return tagAll;
    }
}

//删去当前状态
function removeClass(e,exp){
  if(e.className){
    var stre=e.className.toString();
    e.className=stre.replace(exp,"");
  }
}
function creatElement(eletype,eleclass){
    var elem=document.createElement(eletype);
    if(arguments.length>1){
        elem.className=eleclass;
    }
    return elem;
}