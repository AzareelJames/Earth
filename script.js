const ls = localStorage;
const search = document.getElementById("search");

if(ls.getItem("mode") === null){
    ls.setItem("mode", "rgb(37, 37, 37)");
} else if(ls.getItem("search engine") === null){
    ls.setItem("search engine", "https://www.google.com/search?q=%s");
} else if(ls.getItem("history") === null){
    ls.setItem("history", []);
}


function switchMode(){
    if(ls.getItem("mode") === "rgb(37, 37, 37)"){
        ls.setItem("mode", "white");
    } else{
        ls.setItem("mode", "rgb(37, 37, 37)");
    }
}

document.body.style.backgroundColor = ls.getItem("mode");

setInterval(() => {
    document.body.style.backgroundColor = ls.getItem("mode");
}, 250);

function isValidURL(url){
    try{
        new URL(url);

        return true;
    } catch{
        return false;
    }
}


search.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && search.value.trim()){
        if(isValidURL(search.value)){
            window.open(search.value, "_self");
            return;
        }

        if(!navigator.onLine){
            window.alert("Your not connected to the internet:\nplease check your connection.");
            return;
        }

        const newHistory = Array(ls.getItem("history"));
        newHistory.push(ls.getItem("search engine").replace("%s", search.value));
        ls.setItem("history", newHistory);

        window.open(ls.getItem("search engine").replace("%s", search.value), "_self");
    }
});