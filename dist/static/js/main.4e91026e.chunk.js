(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{53:function(e,t,a){e.exports=a(92)},58:function(e,t,a){},59:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(18),s=a.n(c),i=(a(58),a(59),a(8)),o=a(13),l=a(7),u=a(21),m=a.n(u);a(33),a(64);m.a.initializeApp({apiKey:"AIzaSyCDYVSWCA_qwexbRcnn8hI9kCAUepx1ZCo",authDomain:"whatsfordinner3-1da9c.firebaseapp.com",databaseURL:"https://whatsfordinner3-1da9c.firebaseio.com",projectId:"whatsfordinner3-1da9c",storageBucket:"whatsfordinner3-1da9c.appspot.com",messagingSenderId:"244213751470",appId:"1:244213751470:web:ff156c97caf5d38a94173f"}),m.a.firestore();var d=m.a.auth(),p=m.a.firestore(),f=(m.a,r.a.createContext()),v=function(e){var t=e.children,a=Object(n.useState)(null),c=Object(l.a)(a,2),s=c[0],i=c[1];return Object(n.useEffect)(function(){d.onAuthStateChanged(i)},[]),r.a.createElement(f.Provider,{value:{currentUser:s}},t)},g=a(5),b=a.n(g),h=a(12),E=['In order to activate Trevor on our app, you begin by saying "hey Trevor"','You can add any food item you like to your list. Say "add Cheese"','You can also delete any food item off of your list. Say "delete Cheese"','If you want to clear your current shopping list, say "clear my list"','If you want to get some recipes using your current shopping list, say "get recipes"','If you want to go to your favorite recipes, say "get favorite recipes"','Say "close instructions" to close this window'],x=['To add a new recipe to your favorites, say "bookmark recipe number (corresponding recipe number)"'],y=['To see recipe instructions, say "Start cooking recipe (corresponding recipe number)"'],w=['Say "Yes I am" to get started','Say "Go to next step" to hear the next step','Say "Go to previous step" to hear the previous step','Say "Repeat step" to hear the step over again'],k=['Say "sign out" to sign out :('],O=(b.a,function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],c=t[1];Object(n.useEffect)(function(){return b.a.addCommands(s),function(){b.a.removeCommands("sign out")}},[]);var s={"sign out":function(){return d.signOut()},"show instructions":function(){c(!0)},"close instructions":function(){c(!1)}};return r.a.createElement("div",null,r.a.createElement("h1",null,"Profile"),r.a.createElement("button",{className:"waves-effect waves-light btn-small red",onClick:function(){return d.signOut()}},"Sign out"),r.a.createElement(h.a,{open:a,onClose:function(){return c(!1)}},r.a.createElement("h4",null,"Trevor's Commands"),r.a.createElement("ul",null,k.map(function(e,t){return r.a.createElement("li",{key:t},e)}))),r.a.createElement("div",{className:"fixed-action-btn"},r.a.createElement("a",{className:"btn-floating btn-medium amber",onClick:function(){return c(!0)}},r.a.createElement("i",{className:"large material-icons"},"help_outline"))))}),N=a(2),j=a.n(N),C=a(6),I=Object(o.g)(function(e){var t=e.history,a=Object(n.useCallback)(function(){var e=Object(C.a)(j.a.mark(function e(a){var n,r,c;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n=a.target.elements,r=n.email,c=n.password,e.prev=2,e.next=5,d.signInWithEmailAndPassword(r.value,c.value);case 5:t.push("/list"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),alert(e.t0);case 11:case"end":return e.stop()}},e,null,[[2,8]])}));return function(t){return e.apply(this,arguments)}}(),[t]);return Object(n.useContext)(f).currentUser?r.a.createElement(o.a,{to:"/list"}):r.a.createElement("div",{className:"container card-padding"},r.a.createElement("div",{className:"card-panel"},r.a.createElement("h1",null,"Login"),r.a.createElement("form",{onSubmit:a},r.a.createElement("label",null,"Email",r.a.createElement("input",{name:"email",type:"email",placeholder:"Email"})),r.a.createElement("label",null,"Password",r.a.createElement("input",{name:"password",type:"password",placeholder:"Password"})),r.a.createElement("button",{type:"submit",className:"waves-effect waves-light btn-small indigo"},"Log in")),r.a.createElement("h6",null,"New User? ",r.a.createElement(i.b,{to:"/signup"},"Sign Up"))))}),S=Object(o.g)(function(e){var t=e.history,a=Object(n.useCallback)(function(){var e=Object(C.a)(j.a.mark(function e(a){var n,r,c;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n=a.target.elements,r=n.email,c=n.password,e.prev=2,e.next=5,d.createUserWithEmailAndPassword(r.value,c.value);case 5:t.push("/list"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),alert(e.t0);case 11:case"end":return e.stop()}},e,null,[[2,8]])}));return function(t){return e.apply(this,arguments)}}(),[t]);return Object(n.useContext)(f).currentUser?r.a.createElement(o.a,{to:"/"}):r.a.createElement("div",{className:"container card-padding"},r.a.createElement("div",{className:"card-panel"},r.a.createElement("h1",null,"Sign up"),r.a.createElement("form",{onSubmit:a},r.a.createElement("label",null,"Email",r.a.createElement("input",{name:"email",type:"email",placeholder:"Email"})),r.a.createElement("label",null,"Password",r.a.createElement("input",{name:"password",type:"password",placeholder:"Password"})),r.a.createElement("button",{type:"submit",className:"waves-effect waves-light btn-small indigo"},"Sign Up"),r.a.createElement("h6",null,"Already have an account? ",r.a.createElement(i.b,{to:"/login"},"Login")))))}),R=a(24),U=a.n(R),A=a(19),P=(a(23),a(11)),Y=function(){P.a.error("Removed from list",{position:"bottom-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0})},T=function(){P.a.success("Added to favorite recipes",{position:"bottom-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0})},L=window.speechSynthesis,B=new SpeechSynthesisUtterance("Default Text"),_=function(e){var t=e.recipe,a=e.idx,c=t.id,s=t.title,i=t.image,o=t.missedIngredients,u=t.usedIngredients,m=t.unusedIngredients,d=Object(A.a)({},"bookmark recipe number "+(a+1),function(){S()});Object(n.useEffect)(function(){return b.a.addCommands(d),function(){b.a.removeCommands(["bookmark recipe number "+(a+1)])}},[]);var v=Object(n.useContext)(f).currentUser,g=Object(n.useState)(!1),E=Object(l.a)(g,2),x=E[0],y=E[1],w=Object(n.useState)({steps:[]}),k=Object(l.a)(w,2),O=k[0],N=k[1],I="/analyzedInstructions?apiKey=ea67a4bdaf834f4b86818a43a58433eb",S=function(){var e=Object(C.a)(j.a.mark(function e(){var t,n,r,l;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,p.collection("favoriteRecipes").where("userId","==",v.uid).get().then(function(e){e.forEach(function(e){var a=e.data();a.id=e.id,t.push(a.spoonacularId)})});case 3:if(!t.includes(c)){e.next=8;break}B.text="You already bookmarked this recipe",L.speak(B),e.next=26;break;case 8:return n={title:s,userId:v.uid,image:i,spoonacularId:c,ingredients:o.concat(u)},e.prev=9,e.next=12,U.a.get("https://api.spoonacular.com/recipes/"+c+I);case 12:return r=e.sent,l=r.data,n.steps=l[0].steps.map(function(e){return e.step}),T(),e.next=18,p.collection("favoriteRecipes").add(n);case 18:B.text="bookmarked recipe ".concat(a+1),L.speak(B),e.next=26;break;case 22:e.prev=22,e.t0=e.catch(9),B.text="Unfortunetly this recipe does not have instructions",L.speak(B);case 26:case"end":return e.stop()}},e,null,[[9,22]])}));return function(){return e.apply(this,arguments)}}(),R=function(){var e=Object(C.a)(j.a.mark(function e(){var t,a,n;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,y(!0),t={title:s,userId:v.uid,image:i,spoonacularId:c},e.next=5,U.a.get("https://api.spoonacular.com/recipes/"+c+I);case 5:a=e.sent,n=a.data,t.steps=n[0].steps.map(function(e){return e.step}),N(t),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log("No Recipe",e.t0);case 14:case"end":return e.stop()}},e,null,[[0,11]])}));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(C.a)(j.a.mark(function e(t){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.ingredients=o.concat(u),e.next=4,p.collection("favoriteRecipes").add(t);case 4:T(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error adding to favorite recipes");case 10:case"end":return e.stop()}},e,null,[[0,7]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("div",{className:"col s12 m6 l4"},r.a.createElement("div",{className:"card large"},r.a.createElement("div",{className:"card-image"},r.a.createElement("img",{src:i,alt:s}),r.a.createElement("span",{className:"card-title"},r.a.createElement("a",{className:"btn-floating halfway-fab waves-effect waves-light blue left"},a+1)),r.a.createElement("a",{className:"btn-floating halfway-fab waves-effect waves-light red"},r.a.createElement("i",{className:"material-icons",onClick:S},"favorite"))),r.a.createElement("div",{className:"card-content left-align"},r.a.createElement("h6",{className:"center-align"},s),r.a.createElement("ul",null,r.a.createElement("li",{className:"card-text"},r.a.createElement("i",{className:"tiny material-icons card-text"},"check_box"),"Used Ingredients: ",u.join(", ")),r.a.createElement("li",{className:"card-text"},r.a.createElement("i",{className:"tiny material-icons card-text"},"remove_shopping_cart"),"Missed Ingredients: ",o.join(", ")),r.a.createElement("li",{className:"card-text"},r.a.createElement("i",{className:"tiny material-icons card-text"},"shopping_cart"),"Unused Ingredients: ",m.join(", ")))),r.a.createElement("div",{className:"card-action"},r.a.createElement("button",{"data-target":"#".concat(c),className:"btn modal-trigger indigo",onClick:function(){return R()}},"Instructions"),r.a.createElement(h.a,{open:x,onClose:function(){return y(!1)}},r.a.createElement("h4",null,O.title),r.a.createElement("ul",null,O.steps.length?O.steps.map(function(e,t){return r.a.createElement("li",{key:e,className:"left-align"},r.a.createElement("strong",null,"Step ".concat(t+1,":"))," ","".concat(e))}):r.a.createElement("p",null,"Instructions unavailable at this time")),r.a.createElement("a",{className:"btn-floating halfway-fab waves-effect waves-light red"},r.a.createElement("i",{className:"material-icons",onClick:function(){return P(O)}},"favorite")))))))},F=function(){var e=Object(n.useContext)(f).currentUser,t=Object(n.useState)([]),a=Object(l.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)([]),o=Object(l.a)(i,2),u=o[0],m=o[1],d=Object(n.useState)(!1),v=Object(l.a)(d,2),g=v[0],E=v[1],y={"show instructions":function(){E(!0)},"close instructions":function(){E(!1)}};Object(n.useEffect)(function(){return b.a.addCommands(y),w().then(function(e){e.length>0?(B.text="getting your recipes",L.speak(B)):(B.text="add some ingredients first",L.speak(B))}),function(){b.a.removeCommands(Object.keys(y))}},[]),Object(n.useEffect)(function(){k(c)},[c]);var w=function(){var t=Object(C.a)(j.a.mark(function t(){var a;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=[],t.next=4,p.collection("ingredients").where("userId","==",e.uid).get().then(function(e){e.forEach(function(e){var t=e.data();t.id=e.id,a.push(t)})});case 4:return s(a),t.abrupt("return",a);case 8:t.prev=8,t.t0=t.catch(0),console.error("No Ingredients",t.t0);case 11:case"end":return t.stop()}},t,null,[[0,8]])}));return function(){return t.apply(this,arguments)}}(),k=function(){var t=Object(C.a)(j.a.mark(function t(a){var n,r,c;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(a.length>0&&e)){t.next=7;break}return t.next=3,U.a.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients="+a.map(function(e){return e.name}).join(",+")+"&number=6&apiKey=ea67a4bdaf834f4b86818a43a58433eb");case 3:n=t.sent,r=n.data,c=r.map(function(e){return delete e.imageType,delete e.usedIngredientCount,delete e.missedIngredientCount,e.missedIngredients=e.missedIngredients.map(function(e){return e.name}),e.usedIngredients=e.usedIngredients.map(function(e){return e.name}),e.unusedIngredients=e.unusedIngredients.map(function(e){return e.name}),e}),m(c);case 7:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:"col l12"},r.a.createElement("div",null,r.a.createElement("h1",null,"Recipes"),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card-panel"},r.a.createElement("div",{className:"row"},u.map(function(e,t){return r.a.createElement(_,{key:e.id,recipe:e,idx:t})})))),r.a.createElement(h.a,{open:g,onClose:function(){return E(!1)}},r.a.createElement("h4",null,"Trevor's Commands"),r.a.createElement("ul",null,x.map(function(e,t){return r.a.createElement("li",{key:t},e)}))),r.a.createElement("div",{className:"fixed-action-btn"},r.a.createElement("a",{className:"btn-floating btn-medium amber",onClick:function(){return E(!0)}},r.a.createElement("i",{className:"large material-icons"},"help_outline")))))},D=a(49),H=a(47),W=function(e){var t=e.ingredients,a=e.deleteIngredient;return t.length?r.a.createElement("ul",{className:"collection"},t.map(function(e){return r.a.createElement("li",{className:"collection-item",key:e.id},r.a.createElement("div",null,e.name,r.a.createElement("button",{className:"btn-floating btn-small waves-effect waves-light red secondary-content",type:"button",name:"action",onClick:function(){return a(e)}},r.a.createElement("i",{className:"material-icons right"},"delete"))))})):r.a.createElement("p",null,"No Ingredients Yet")},z=function(){var e=Object(n.useContext)(f).currentUser,t=Object(n.useState)([]),a=Object(l.a)(t,2),c=a[0],s=a[1],i=Object(n.useState)(""),o=Object(l.a)(i,2),u=o[0],m=o[1],d=Object(n.useState)(!1),v=Object(l.a)(d,2),g=v[0],x=v[1];Object(n.useEffect)(function(){return k(),P.a.info('For assistance, you can say "Show Instructions" on every page',{position:"bottom-left",autoClose:6e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),b.a.addCommands(w),function(){b.a.removeCommands(Object.keys(y)),b.a.removeCommands(Object.keys(w))}},[]);var y={"add *tag":function(e){S(e)},"delete *tag":function(e){R(e)},"clear my list":function(){return U()}},w={"hey Trevor":function(){b.a.addCommands(y),B.text="at your service",L.speak(B)},"trevor stop":function(){return b.a.removeCommands(Object.keys(y))},"show instructions":function(){x(!0)},"close instructions":function(){x(!1)}},k=function(){var t=Object(C.a)(j.a.mark(function t(){var a;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=[],t.next=4,p.collection("ingredients").where("userId","==",e.uid).get().then(function(e){e.forEach(function(e){var t=e.data();t.id=e.id,a.push(t)})});case 4:return s(a),t.abrupt("return",a);case 8:t.prev=8,t.t0=t.catch(0),console.error("No Ingredients",t.t0);case 11:case"end":return t.stop()}},t,null,[[0,8]])}));return function(){return t.apply(this,arguments)}}(),O=function(){var e=Object(C.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k();case 3:if(!e.sent.map(function(e){return e.name.toLowerCase()}).includes(t.name.toLowerCase())){e.next=11;break}return B.text="You have already added this item!",L.speak(B),e.abrupt("return",!1);case 11:return a=Object(H.a)({},t),e.next=14,p.collection("ingredients").add(t).then(function(e){return a.id=e.id});case 14:return B.text="got ".concat(a.name),L.speak(B),P.a.success("Added to list",{position:"bottom-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),e.abrupt("return",a);case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(0),console.error("No Ingredients",e.t0);case 23:case"end":return e.stop()}},e,null,[[0,20]])}));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(C.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.collection("ingredients").doc(t.id).delete();case 3:a=c.filter(function(e){return e.id!==t.id}),Y(),s(a),B.text="removed ".concat(t.name),L.speak(B),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Error deleting ingredient",e.t0);case 13:case"end":return e.stop()}},e,null,[[0,10]])}));return function(t){return e.apply(this,arguments)}}(),I=function(){var t=Object(C.a)(j.a.mark(function t(a){var n;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.next=3,O({name:u,userId:e.uid});case 3:(n=t.sent)&&(s([].concat(Object(D.a)(c),[n])),m(""));case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),S=function(){var t=Object(C.a)(j.a.mark(function t(a){return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O({name:a,userId:e.uid});case 2:t.sent&&(k(),m(""));case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),R=function(){var t=Object(C.a)(j.a.mark(function t(a){var n;return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p.collection("ingredients").where("userId","==",e.uid).where("name","==",a).get().then(function(e){return e.docs[0].id});case 3:if(!(n=t.sent)){t.next=9;break}return t.next=7,p.collection("ingredients").doc(n).delete();case 7:return t.next=9,k();case 9:B.text="removed ".concat(a),Y(),L.speak(B),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(0),B.text="couldnt find ".concat(a),L.speak(B);case 18:case"end":return t.stop()}},t,null,[[0,14]])}));return function(e){return t.apply(this,arguments)}}(),U=function(){var t=Object(C.a)(j.a.mark(function t(){return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k();case 2:if(!(t.sent.length<1)){t.next=8;break}B.text="your list is empty",L.speak(B),t.next=14;break;case 8:return t.next=10,p.collection("ingredients").where("userId","==",e.uid).get().then(function(e){e.forEach(function(e){p.collection("ingredients").doc(e.id).delete()})});case 10:B.text="removing your list",L.speak(B),s([]),P.a.error("Cleared your list",{position:"bottom-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0});case 14:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:"card-padding"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card-panel"},r.a.createElement("h1",{className:"center-align"},"Your Shopping List"),r.a.createElement(W,{ingredients:c,deleteIngredient:N}),r.a.createElement("form",{onSubmit:I},r.a.createElement("div",{className:"main-header"},r.a.createElement("div",{className:"showcase container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 m10 offset-m1 center"},r.a.createElement("label",{htmlFor:"ingredient"},"Add Ingredient"),r.a.createElement("input",{value:u,name:"name",onChange:function(e){m(e.target.value)},required:!0})),r.a.createElement("button",{className:"btn waves-effect waves-light indigo center",type:"submit",name:"action"},"Add Ingredient",r.a.createElement("i",{className:"tiny material-icons right"},"add_shopping_cart")))))),r.a.createElement("button",{className:"btn waves-effect waves-light red center",type:"submit",name:"action",onClick:function(){return U()}},"Clear List",r.a.createElement("i",{className:"tiny material-icons right"},"delete_sweep")),r.a.createElement(h.a,{open:g,onClose:function(){return x(!1)}},r.a.createElement("h4",null,"Trevor's Commands"),r.a.createElement("ul",null,E.map(function(e,t){return r.a.createElement("li",{key:t},e)}))))),r.a.createElement("div",{className:"fixed-action-btn"},r.a.createElement("a",{className:"btn-floating btn-medium amber",onClick:function(){return x(!0)}},r.a.createElement("i",{className:"large material-icons"},"help_outline"))))},q=a(50),G=function(e){var t=e.component,a=Object(q.a)(e,["component"]),c=Object(n.useContext)(f).currentUser;return r.a.createElement(o.b,Object.assign({},a,{render:function(e){return c?r.a.createElement(t,e):null}}))},K=a(48),J=a.n(K),M=Object(o.g)(function(e){var t=e.history,a=Object(n.useContext)(f).currentUser,c=Object(n.useState)(!1),s=Object(l.a)(c,2),o=s[0],u=s[1];Object(n.useEffect)(function(){var e=document.querySelector("#slide-out");return J.a.Sidenav.init(e),b.a.start(),b.a.addCommands(m),function(){b.a.removeCommands(Object.keys(m)),b.a.removeCommands("Yes sign out")}},[]);var m={"go to my list":function(){t.push("/list")},"go to my favorite recipes":function(){t.push("/favoriterecipes")},"go to my profile":function(){t.push("/profile")},"get recipes":function(){t.push("/recipes")},"sign out":function(){b.a.addCommands(p),B.text="ARE YOU SURE ABOUT THAT?",L.speak(B)}},p={"Yes sign out":function(){B.text="Okay, Bye",L.speak(B),d.signOut()}};return r.a.createElement("div",null,r.a.createElement("nav",{className:"nav-wrapper indigo navbar-padding"},r.a.createElement(h.a,{open:o,onClose:function(){return u(!1)}}),r.a.createElement("div",{className:"container"},r.a.createElement("a",{href:"#","data-target":"slide-out",className:"sidenav-trigger"},r.a.createElement("i",{className:"material-icons"},"menu")),a?r.a.createElement("ul",{className:"hide-on-med-and-down"},r.a.createElement("li",null,r.a.createElement(i.b,{to:"/list"},"List")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/recipes"},"Recipes")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/favoriterecipes"},"Favorite Recipes")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/profile"},"Profile"))):r.a.createElement("div",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(i.b,{to:"/login"},"Login")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/signup"},"Sign Up")))),r.a.createElement("ul",null,r.a.createElement("li",{className:"right"},r.a.createElement(i.b,{to:"/"},"What's 4 Dinner?")),r.a.createElement("li",{className:"right"},r.a.createElement("img",{style:{height:"40px",width:"40px",margin:"10px"},src:"/shopping-bag.svg",alt:"What's For Dinner Logo"}))))),r.a.createElement("ul",{id:"slide-out",className:"sidenav"},r.a.createElement("li",null,r.a.createElement(i.b,{to:"/list"},"List")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/recipes"},"Recipes")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/profile"},"Profile")),r.a.createElement("li",null,r.a.createElement(i.b,{to:"/favoriterecipes"},"Favorite Recipes"))))}),V=function(e){var t,a=e.history,c=e.recipe,s=e.removeFromFavorites,o=e.idx,l=c.id,u=c.title,m=c.image,d=(t={},Object(A.a)(t,"start cooking recipe "+(o+1),function(){a.push("/favoriterecipes/instructions/".concat(l))}),Object(A.a)(t,"delete recipe "+(o+1),function(){s(l)}),t);return Object(n.useEffect)(function(){return b.a.addCommands(d),function(){b.a.removeCommands(Object.keys(d))}},[]),r.a.createElement("div",null,r.a.createElement("div",{className:"col s12 m6 l4"},r.a.createElement("div",{className:"card medium"},r.a.createElement("div",{className:"card-image"},r.a.createElement("img",{src:m,alt:u}),r.a.createElement("a",{className:"btn-floating halfway-fab waves-effect waves-light blue left"},o+1),r.a.createElement("a",{className:"btn-floating halfway-fab waves-effect waves-light red"},r.a.createElement("i",{className:"material-icons",onClick:function(){return s(l)}},"remove"))),r.a.createElement("div",{className:"card-content card-text"},r.a.createElement("div",{className:"container"},r.a.createElement("h6",null,u))),r.a.createElement("div",{className:"card-action"},r.a.createElement(i.b,{to:"favoriterecipes/instructions/".concat(l)},"Let's Start Cooking")))))},Z=function(e){var t=e.history,a=Object(n.useContext)(f).currentUser,c=Object(n.useState)([]),s=Object(l.a)(c,2),i=s[0],o=s[1],u=Object(n.useState)(!1),m=Object(l.a)(u,2),d=m[0],v=m[1];Object(n.useEffect)(function(){return b.a.addCommands(g),E(),function(){b.a.removeCommands(Object.keys(g))}},[]);var g={"show instructions":function(){v(!0)},"close instructions":function(){v(!1)}},E=function(){var e=Object(C.a)(j.a.mark(function e(){var t;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=[],e.next=4,p.collection("favoriteRecipes").where("userId","==",a.uid).get().then(function(e){e.forEach(function(e){var a=e.data();a.id=e.id,t.push(a)})});case 4:o(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("No Recipes",e.t0);case 10:case"end":return e.stop()}},e,null,[[0,7]])}));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(C.a)(j.a.mark(function e(t){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.collection("favoriteRecipes").doc(t).delete();case 3:return e.next=5,E();case 5:P.a.error("Removed from favorite recipes",{position:"bottom-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error("Error deleting recipe",e.t0);case 11:case"end":return e.stop()}},e,null,[[0,8]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"col s12 l12"},r.a.createElement("div",null,r.a.createElement("h1",{className:"center-align"},"Your Favorite Recipes"),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"card-panel"},r.a.createElement("div",{className:"row"},i.length?i.map(function(e,a){return r.a.createElement(V,{key:e.id,idx:a,recipe:e,history:t,removeFromFavorites:x})}):r.a.createElement("p",null,"No Favorite Recipes yet"))))),r.a.createElement(h.a,{open:d,onClose:function(){return v(!1)}},r.a.createElement("h4",null,"Trevor's Commands"),r.a.createElement("ul",null,y.map(function(e,t){return r.a.createElement("li",{key:t},e)}))),r.a.createElement("div",{className:"fixed-action-btn"},r.a.createElement("a",{className:"btn-floating btn-medium amber",onClick:function(){return v(!0)}},r.a.createElement("i",{className:"large material-icons"},"help_outline"))))},$=function(e){var t=Object(n.useContext)(f).currentUser,a=Object(n.useState)(0),c=Object(l.a)(a,2),s=c[0],i=c[1],o=Object(n.useState)({steps:[],ingredients:[]}),u=Object(l.a)(o,2),m=u[0],d=u[1],v=Object(n.useState)(!1),g=Object(l.a)(v,2),E=g[0],x=g[1],y=e.match.params.id;Object(n.useEffect)(function(){return N(t.uid),b.a.addCommands(k()),B.text="Let's Start Cooking, Are you Ready?",L.speak(B),P.a.info('say "Yes I am" to begin!',{position:"top-right",autoClose:1e4,hideProgressBar:!1,closeOnClick:!0,draggable:!0}),function(){b.a.removeCommands(Object.keys(k()))}},[]);var k=function(){var e=0;return{"Yes I am":function(){O(e)},"Go to next step":function(){var t=Object(C.a)(j.a.mark(function t(){return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O(e+1);case 2:t.sent?e++:(B.text="You are already on the last step",L.speak(B));case 4:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),"repeat current step":function(){O(e)},"go to previous step":function(){var t=Object(C.a)(j.a.mark(function t(){return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O(e-1);case 2:t.sent?e--:(B.text="You are already on the first step",L.speak(B));case 4:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),"show instructions":function(){x(!0)},"close instructions":function(){x(!1)}}},O=function(){var e=Object(C.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.collection("favoriteRecipes").doc(y).get().then(function(e){return e.data()});case 2:if(a=e.sent,!(t<a.steps.length&&t>=0)){e.next=10;break}return i(t),B.text="Step ".concat(t+1,". ").concat(a.steps[t]),L.speak(B),e.abrupt("return",!0);case 10:return e.abrupt("return",!1);case 11:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(C.a)(j.a.mark(function e(t){var a;return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.collection("favoriteRecipes").doc(y).get().then(function(e){return e.data()});case 3:(a=e.sent)&&d(a),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("No Recipe",e.t0);case 10:case"end":return e.stop()}},e,null,[[0,7]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"card-padding"},r.a.createElement("div",{className:"container container-padding"},r.a.createElement("div",{className:"col 12 m7"},r.a.createElement("div",{className:"card horizontal"},r.a.createElement("img",{src:m.image,alt:m.title}),r.a.createElement("div",null,r.a.createElement("h4",{className:"left-align instructions-text"},m.title),r.a.createElement("p",{className:"valign-wrapper left-align instructions-text"},"Current Step: ",m.steps[s]))))),r.a.createElement("div",{className:"container container-padding"},r.a.createElement("div",{className:"col 12 m7"},r.a.createElement("div",{className:"card horizontal instructions-text"},r.a.createElement("h6",{className:"left-align"},"Ingredients: ",m.ingredients.join(", "))))),r.a.createElement("div",{className:"container container-padding"},r.a.createElement("div",{className:"col 12 m7"},r.a.createElement("div",{className:"card horizontal"},r.a.createElement("ul",null,m.steps.length?m.steps.map(function(e,t){return r.a.createElement("li",{key:e,className:"left-align instructions-text"},r.a.createElement("strong",null,"Step ".concat(t+1,":"))," ","".concat(e))}):r.a.createElement("p",null,"Instructions unavailable at this time"))))),r.a.createElement(h.a,{open:E,onClose:function(){return x(!1)}},r.a.createElement("h4",null,"Trevor's Commands"),r.a.createElement("ul",null,w.map(function(e,t){return r.a.createElement("li",{key:t},e)}))),r.a.createElement("div",{className:"fixed-action-btn"},r.a.createElement("a",{className:"btn-floating btn-medium amber",onClick:function(){return x(!0)}},r.a.createElement("i",{className:"large material-icons"},"help_outline"))))};P.a.configure();var Q=function(){return r.a.createElement(v,null,r.a.createElement(i.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(M,null),r.a.createElement(o.d,null,r.a.createElement(G,{exact:!0,path:"/",component:O}),r.a.createElement(G,{exact:!0,path:"/list",component:z}),r.a.createElement(G,{exact:!0,path:"/recipes",component:F}),r.a.createElement(G,{exact:!0,path:"/favoriterecipes",component:Z}),r.a.createElement(G,{exact:!0,path:"/favoriterecipes/instructions/:id",component:$}),r.a.createElement(o.b,{exact:!0,path:"/login",component:I}),r.a.createElement(o.b,{exact:!0,path:"/signup",component:S}),r.a.createElement(o.b,{render:function(){return r.a.createElement(o.a,{to:"/"})}})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(v,null,r.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[53,1,2]]]);
//# sourceMappingURL=main.4e91026e.chunk.js.map