import{d as u}from"./chunks/posts.data.BkxvkL-s.js";import{d as p,o as a,c as n,m as t,p as h,g as m,t as c,F as l,G as i,_ as g,k as f,b as x}from"./chunks/framework.CPfoFgza.js";const v={class:"post-card"},y={class:"post-header"},b={class:"post-title"},C=["href","textContent"],P=["innerHTML"],S={class:"post-info"},k=["textContent"],B={class:"flex"},D=["textContent","href"],w=p({__name:"DetailedPostCard",props:{url:{type:String},title:{type:String},abstract:{type:String},date:{type:String},tags:{type:Array}},setup(e){return(d,o)=>(a(),n("div",v,[t("div",y,[t("div",b,[t("a",{class:"post-title-text",href:h(m)(e.url),textContent:c(e.title)},null,8,C)])]),t("p",{class:"abstract",innerHTML:e.abstract},null,8,P),t("div",S,[t("div",{textContent:c(e.date)},null,8,k),t("div",B,[(a(!0),n(l,null,i(e.tags,(r,s)=>(a(),n("a",{textContent:c(r),class:"tag cursor-pointer hover:text-[var(--vp-c-brand)]",href:`/pages/tags?tag=${r}`},null,8,D))),256))])])]))}}),L=g(w,[["__scopeId","data-v-a993f3c9"]]),$={class:"max-w-screen-lg w-full px-6 py-8 my-0 mx-auto"},N=JSON.parse('{"title":"首页","description":"","frontmatter":{"layout":"page","title":"首页"},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1712671952000}'),F={name:"index.md"},O=Object.assign(F,{setup(e){const d=f(()=>u.recentPosts.map(o=>({...o,date:o.date.string})));return(o,r)=>(a(),n("div",null,[t("div",$,[(a(!0),n(l,null,i(d.value,(s,_)=>(a(),x(L,{key:_,url:s.url,title:s.title,abstract:s.abstract,date:s.date,tags:s.tags},null,8,["url","title","abstract","date","tags"]))),128))])]))}});export{N as __pageData,O as default};
