function showPic(){
    // <div id="popWin" class="firstPage"></div>
    var div = document.createElement("div");
    div.setAttribute("class","firstPage");
    div.setAttribute("id","pic")
    // div.setAttribute("visibility","visible")
    // var shadowdiv = document.createElement("div")
    // shadowdiv.setAttribute("class","shadowDiv");
    // shadowdiv.appendChild(div);
    document.body.appendChild(div);
    div.onclick = function(p){
        document.body.removeChild(div);
    }
}
