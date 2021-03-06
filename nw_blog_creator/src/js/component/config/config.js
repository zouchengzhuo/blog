/**
 * Created by czzou on 2016/1/21.
 */
var fs=require("fs"),
    config=require("../../loadConfig");
var tagconfig=  config.tags;
var cateconfig= config.cates;
var tags=fs.readFileSync(tagconfig,"utf8");
var cates=fs.readFileSync(cateconfig,"utf8");
tags=JSON.parse(tags);
cates=JSON.parse(cates);
require("./config.css");

import React from "react";
module .exports=React.createClass({
    getInitialState: function() {
        return {
            tags: tags,
            cates: cates,
            tagValue:"",
            cateValue:""
        };
    },
    tagValueChange:function(event){
        this.setState({tagValue:event.target.value});
    },
    cateValueChange:function(event){
        this.setState({cateValue:event.target.value});
    },
    addTag:function(){
        var tag=this.state.tagValue;
        var tags=this.state.tags;
        if(!tag){
            alert("标签名称不能为空");
            return false;
        }
        if(tags.indexOf(tag)>-1){
            alert("已有标签");
        }
        this.setState({tagValue:""});
        tags.push(tag);
        fs.writeFileSync(tagconfig,JSON.stringify(tags));
        this.setState({tags:tags});
        return false;
    },
    removeTag:function(event){
        var tags=this.state.tags;
        var tag=event.target.title;
        tags.splice(tags.indexOf(tag),1);
        fs.writeFileSync(tagconfig,JSON.stringify(tags));
        this.setState({tags:tags});
    },
    addCate:function(){
        var cates=this.state.cates;
        var cate=this.state.cateValue;
        if(!cate){
            alert("分类名称不能为空");
            return false;
        }
        if(cates.indexOf(cate)>-1){
            alert("已有分类");
        }
        this.setState({cateValue:""});
        cates.push(cate);
        fs.writeFileSync(cateconfig,JSON.stringify(cates));
        this.setState({cates:cates});
        return false;
    },
    removeCate:function(event){
        var cates=this.state.cates;
        var cate=event.target.title;
        cates.splice(cates.indexOf(cate),1);
        fs.writeFileSync(cateconfig,JSON.stringify(cates));
        this.setState({cates:cates});
    },
    render:function(){
        var tags=this.state.tags;
        var cates=this.state.cates;
        var tag=this.state.tagValue;
        var cate=this.state.cateValue;
        var removeTag=this.removeTag;
        var removeCate=this.removeCate;
        return (
            <div>
                <table className="table table-bordered">
                    <tr><td>标签</td><td>{
                        tags.map(function (tag) {
                            return <span className="label label-success">{tag}&nbsp;
                                <span className="glyphicon glyphicon-remove" title={tag} onClick={removeTag}> </span></span>
                        })
                    }</td></tr>
                    <tr><td></td><td><input type="text" className="form-control input-sm shortinput" value={tag} onChange={this.tagValueChange}></input>
                        &nbsp;&nbsp;<button type="button" className="btn btn-success btn-xs" onClick={this.addTag}>添加</button></td></tr>
                    <tr><td>分类</td><td>{
                        cates.map(function (cate) {
                            return <span className="label label-success">{cate}&nbsp;
                                <span className="glyphicon glyphicon-remove" title={cate} onClick={removeCate} > </span></span>
                        })
                    }</td></tr>
                    <tr><td></td><td> <input type="text" className="form-control input-sm shortinput" value={cate} onChange={this.cateValueChange}></input>
                        &nbsp;&nbsp;<button type="button" className="btn btn-success btn-xs" onClick={this.addCate}>添加</button></td></tr>
                </table>
            </div>
        );
    }
});