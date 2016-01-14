/*
 *循环链表
*/
function Node(element) {
    this.element=element;
    this.next=null;
}
function LList() {
    this.head=new Node("head");
    this.head.next=this.head;
    this.find=find;
    this.insert=insert;
    this.display=display;
    this.findPrevious=findPrevious;
    this.remove=remove;
}
function find(item) {
    var currNode=this.head;
    while(currNode!=item && currNode.next!=null && currNode.next.element!="head"){
        currNode=currNode.next;
    }
    if(currNode.element=="head"){
        throw new Error ("您查找的值不在链表内！");
        return;
    }
    return currNode;
}
function insert(newElement,item){
   var newNode=new Node(newElement);
   var currNode=this.find(item);
   newNode.next=currNode.next;
   currNode.next=newNode;
}
function remove(item) {
    var prevNode=this.findPrevious(item);
    if(!(currNode.next==null)){
        prevNode.next=prevNode.next.next;
    }
}
function findPrevious(item){
    var currNode=this.head;
    while(!(currNode.next==null) && (currNode.next.element!=item)){
        currNode=currNode.next;
    }
    if(currNode.element!=item){
        throw new Error ("查找的值不在链表内！");
        return;
    }
    return currNode;
}
function display(){
    var currNode=this.head;
    while(!(currNode.next==null) && !(currNode.next.element=="head")){
        console.log(currNode.next.element);
        currNode=currNode.next;
    }
}