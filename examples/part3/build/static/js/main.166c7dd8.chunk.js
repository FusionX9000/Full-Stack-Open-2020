(this.webpackJsonpexamples=this.webpackJsonpexamples||[]).push([[0],{38:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var r=n(0),c=n(2),o=n(15),i=n.n(o),a=n(6),u=n(3),s=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"mark as unimportant":"mark as important";return Object(r.jsxs)("li",{className:"note",children:[e.content,Object(r.jsx)("button",{onClick:n,children:c})]})},j=function(t){var e=t.message;return null===e?null:Object(r.jsx)("div",{className:"error",children:e})},l=function(){return Object(r.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(r.jsx)("br",{}),Object(r.jsx)("em",{children:"Note app, Department of Computer Science, University Of Helsinki"})]})},f=n(4),d=n.n(f),b="/api/notes",m=function(){var t={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return d.a.get(b).then((function(e){return e.data.concat(t)}))},p=function(t){return d.a.post(b,t).then((function(t){return t.data}))},h=function(t,e){return d.a.put("".concat(b,"/").concat(t),e).then((function(t){return t.data}))},O=(n(38),function(){var t=Object(c.useState)([]),e=Object(u.a)(t,2),n=e[0],o=e[1],i=Object(c.useState)("a new note"),f=Object(u.a)(i,2),d=f[0],b=f[1],O=Object(c.useState)(!0),v=Object(u.a)(O,2),x=v[0],g=v[1],S=Object(c.useState)("some error happened....."),k=Object(u.a)(S,2),w=k[0],y=k[1];Object(c.useEffect)((function(){m().then((function(t){o(t)}))}),[]);var C=x?n:n.filter((function(t){return t.important}));return Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Notes"}),Object(r.jsx)(j,{message:w}),Object(r.jsx)("div",{children:Object(r.jsxs)("button",{onClick:function(){return g(!x)},children:["show ",x?"important":"all"]})}),Object(r.jsx)("ul",{children:C.map((function(t){return Object(r.jsx)(s,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),r=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});h(t,r).then((function(e){return o(n.map((function(n){return n.id===t?e:n})))})).catch((function(e){y("the note ".concat(t," was already deleted from the server")),setTimeout((function(){return y(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(r.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={id:n.length+1,content:d,date:(new Date).toISOString(),important:Math.random()<.5};console.log(e),p(e).then((function(t){o(n.concat(t)),b("")}))},children:[Object(r.jsx)("input",{value:d,onChange:function(t){b(t.target.value)}}),Object(r.jsx)("button",{type:"submit",children:"save"})]}),Object(r.jsx)(l,{})]})});i.a.render(Object(r.jsx)(O,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.166c7dd8.chunk.js.map