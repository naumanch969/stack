var darkBtn = document.getElementsByClassName("dark-btn")[0]


darkBtn.onclick = function () {
    darkBtn.classList.toggle("dark-btn-on")
    document.body.classList.toggle("dark-theme")
    if(localStorage.getItem("theme") == "light"){
        localStorage.setItem("theme","dark")
    }
    else{
        localStorage.setItem("theme","light")
    }
    }

if(localStorage.getItem("theme") == "light"){
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme")
}
else if(localStorage.getItem("theme") == "dark"){
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme")
}
else{
    localStorage.setItem("theme","light")
}













const h2 = document.querySelectorAll("h2")
const searchBtn = document.getElementsByClassName("searchBtn")[0]
const searchBox = document.getElementsByClassName("searchInput")[0]
const langBlock = document.getElementsByClassName("langBlock")
searchBox.addEventListener("input",function(){
    const searchText = (searchBox.value).toLowerCase()
    Array.from(langBlock).forEach( function(element,index){
        const elementText = element.getElementsByTagName("h2")[0].innerText.toLowerCase()
        console.log(elementText)
        console.log(element)
        console.log(elementText.includes(searchText))
        if(elementText.includes(searchText)){
            element.style.display = "block"
        }
        else if(searchText === ""){
            langBlock.style.display = "block"
        }
        else{
            element.style.display = "none"
        }
    })
})
    