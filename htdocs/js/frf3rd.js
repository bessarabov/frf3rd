function createFriendFeedComments(ff_entry_id, ff_div_id) {

    var scripturl = 'http://friendfeed-api.com/v2/entry/' + ff_entry_id;
    var pars = "callback=processJSON&pretty=1";

    loadJSON(scripturl + "?" + pars);

}

// Функция загружаент json код в script блока head текущей страницы
function loadJSON(url) {
  var headID = document.getElementsByTagName("head")[0];         
  var newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.src = url;
  headID.appendChild(newScript);
}

// Самая главная функция - в нее передается json структура, и это функция
// отрисовывает весь html
function processJSON(s){

    var e = document.getElementById(ff_div_id);
    e.className = 'friendfeed-comments';
    
    var tmpHTML;
    
    var monthNames=new Array();
    monthNames[1]="января";
    monthNames[2]="февраля";
    monthNames[3]="марта";
    monthNames[4]="апреля";
    monthNames[5]="мая";
    monthNames[6]="июня";
    monthNames[7]="июля";
    monthNames[8]="августа";
    monthNames[9]="сентября";
    monthNames[10]="октября";
    monthNames[11]="ноября";
    monthNames[12]="декабря";

    tmpHTML="";
    var ebody = document.createElement("div");
    ebody.setAttribute("class","ebody");
    ebody.innerHTML = "<div class='title'><div class='text'>" + s.body + "</div></div>"; 
    
    // Общая информация
    tmpHTML="";
    var info = document.createElement("div");
    info.setAttribute("class","info");
    tmpHTML = "<a class='date' href='" + s.url + "'>" + s.date.substring(8,10) + " " + monthNames[parseInt(s.date.substring(5,7))] + "</a>";
    info.innerHTML  = tmpHTML;
    
    // Лайки
    if (s.likes) {
        tmpHTML="";
        var likes = document.createElement("div");
        likes.setAttribute("class","likes");
        tmpHTML = "<span class='lbody'>";
        for(i=0; i<s.likes.length; i++) {
            tmpHTML += "<a href='http://friendfeed.com/" + s.likes[i].from.id + "' sid='' class='l_profile'>" + s.likes[i].from.name + "</a>";
            if (i<s.likes.length-2) {
                tmpHTML +=", ";
            } else if (i<s.likes.length-1) {
                tmpHTML +=" и ";
            }
     
        }
        if (s.likes.length == 1) {
            tmpHTML += " оценил/-а этот материал </span>";
        } else if (s.likes.length > 1) {
            tmpHTML += " оценили этот материал </span>";
        }

        likes.innerHTML  = tmpHTML;
    }
    // Комменты
    if (s.comments) {
        tmpHTML="";
        var comments = document.createElement("div");
        comments.setAttribute("class","comments");
        for(i=0; i<s.comments.length; i++) {
            tmpHTML += " <div class='comment friend' cid=''>"; 
            tmpHTML += "   <div class='quote'></div>"; 
            tmpHTML += "   <div class='content'>"; 
            tmpHTML += s.comments[i].body;
            tmpHTML += "    -"; 
            tmpHTML += "    <a href='http://friendfeed.com/" + s.comments[i].from.id + "' sid='41cb623ee4f811dc8ae7003048343a40' class='l_profile'>" + s.comments[i].from.name + "</a>"; 
            tmpHTML += "   </div>"; 
            tmpHTML += "  </div>";
        }
        
        comments.innerHTML = tmpHTML;
    }
    
    e.appendChild(ebody);
    e.appendChild(info);
    e.appendChild(likes);
    e.appendChild(comments);

}
