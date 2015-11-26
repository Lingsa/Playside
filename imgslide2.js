/*
 *图片滚动效果
 *html结构：
 *div#some>div.slideMain+div.slideNav
 *使用方法：
 //var oPar=document.getElementById("moveWrap");
 //var trySlide=new imgSlide(oPar,{
	 //slideTime:4500
 //});
*/

function PlaySlide(x,arglist){
	'use strict';
	if (x===null || x===undefined) throw TypeError();
	var oPrarent=x;
	obj=getElementsByClassName("slideMain",oPrarent)[0];
      
	//活动屏幕尺寸
	objX=obj.clientWidth;
	objY=obj.clientHeight;
	args={
		initSlide:null,
		curSlide:0,       //当前活动对象的索引
		slideTime:4000, //对象交换的时间
		slideType:"0" ,      //更换效果
		showPage:true   //是否显示页码
	};
	if (arguments.length>=2) {
		var argValid=arguments[1];
		for (var validNum in argValid) {
			if (args.hasOwnProperty(validNum)) {
				args[validNum]=argValid[validNum];
			}
		}
		argValid=null;
	}

	//当前对象特有的className正则表达式
	reExp=new RegExp(/\bactive\b/gi);

	//获取滚动图片的数量
	(function(){
		var slideNode=obj.childNodes;
		for (var i=0; i<slideNode.length; i++) {
			if (slideNode[i].nodeType==1) {
				objItem.push(slideNode[i]);
			}
		}
	})(objItem=[]);
    
	//所有对象索引按钮集合数组
	pageItem=[objItem.length];
	if (+args["showPage"]==1) {
		
		(function(){
			var pageItems=[];
			if (getElementsByClassName('slideNav',oPrarent)[0]==undefined) {
				pageItems=undefined;
			} else {
				var subObj=getElementsByClassName('slideNav',oPrarent)[0].childNodes;
				for (var i=0; i<subObj.length; i++){
					if (subObj[i].nodeType==1) {
						pageItems.push(subObj[i]);
					}
				}
			}			
			pageItem=pageItems;
		})();
	}


	/*更换效果
	switch args["slideType"]{
		case "lTr":
			objItem.
	}
	*/

	//初始化默认滚动
	function init() {		
		var n=objItem.length;
		while (n--) {
			removeClass(objItem[n],reExp);
			if (pageItem!=undefined) removeClass(pageItem[n],reExp);
		}		
		turnPage();
		objItem[args.curSlide].className+='active';
		if (pageItem!=undefined) pageItem[args.curSlide].className+='active';
		args["initSlide"]=setInterval(function(){
			next();
		},args["slideTime"]);
		obj.onmousemove=function(){
			clearInterval(args["initSlide"]);
		}
		obj.onmouseout=function(){
			init();
		}
	}

	//向下翻页
	function next(){
		//显示图片是尾部
		if (args["curSlide"]==objItem.length-1) {
			removeClass(objItem[args["curSlide"]],reExp);
			args["curSlide"]=-1;
			
			objItem[++args["curSlide"]].className+='active';
		} else if (args["curSlide"]<objItem.length-1 && args["curSlide"]>=0) {
			
			removeClass(objItem[args["curSlide"]],reExp);
			objItem[++args["curSlide"]].className+='active';
           		
		}	
		lightPage();
	}

	//向上翻页
	function prev(){
		//显示图片是头部
		if (args["curSlide"]==0) {
			removeClass(objItem[args["curSlide"]],reExp);
			args["curSlide"]=objItem.length;				
			objItem[--args["curSlide"]].className+='active';				
		}else if (args["curSlide"]<objItem.length && args["curSlide"]>0) {				
			removeClass(objItem[args["curSlide"]],reExp);
			objItem[--args["curSlide"]].className+='active';				
		}
		lightPage();
	}

	//点击页数翻页
	function turnPage(){
		if(+args["showPage"]==0) return;
		if (pageItem!=undefined) {
			for (var i=0; i<pageItem.length; i++) {
				(function(i){
					this.onclick=function(){
						if(i!=args["curSlide"]){
							removeClass(objItem[args["curSlide"]],reExp);
							if(pageItem!=undefined) removeClass(pageItem[args["curSlide"]],reExp);
							objItem[i].className+='active';

							args["curSlide"]=i;
							lightPage();
							clearInterval(args["initSlide"]);
						}
					}
				}).call(pageItem[i],i);
			}	
		}	
	}
	//当前页码标亮
	function lightPage(){
		if (pageItem!=undefined) {
			for (var i=0; i<pageItem.length; i++) {
				if (/\bactive\b/.test(pageItem[i].className) && (args["curSlide"]!=i)) {
					pageItem[i].className=pageItem[i].className.replace(/\bactive\b/,"");
					break;
				}
			}
			pageItem[args["curSlide"]].className+='active';
		}	          		
	}
	init();
	return {
		init:init,
		nextPage:next,
		prevPage:prev
	}
};

