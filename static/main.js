document.getElementById("rick").addEventListener("click", function() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
});

var sus = document.getElementById("count").innerHTML;
var priority = 0;

function grab(once) {
    const order = ++priority;
    fetch("/livesus/" + susser)
        .then(res => res.json())
        .then(data => {
            if (order == priority) {
                console.log(data);
                let string = data.count;
                if (string != sus) {
                    document.getElementById("count").innerHTML = string;
                    sus = string;
                }
    
                if (data.accused == true) {
                    document.querySelectorAll(".accused")
                        .forEach(el => {
                            el.style.opacity = 1;
                        });
                         
                } else {
                    document.querySelectorAll(".accused")
                        .forEach(el => {
                            el.style.opacity = 0;
                        });
                }
            }

            if (!once)
                setTimeout(grab, 2000);
        });
}


const sussers = {
    "warzk": "https://cdn.discordapp.com/avatars/261997608334000128/567cd890c1790d3d496827dac056bc14.png?size=256",
    "b0kch01": "https://cdn.discordapp.com/avatars/293903980935774208/a_29ad311672e99270891a101ac7f16dab.gif?size=256",
    "kardic": "https://cdn.discordapp.com/avatars/122138940047228931/68a5d582a079b7bec6564b7c624781e4.png?size=256",
    "tonofclay": "https://cdn.discordapp.com/avatars/202135484531474434/d177ae0f3f3451ada6d9c63aaf470713.png?size=256",
    "foreskinfarmer": "https://cdn.discordapp.com/avatars/244889941912453122/8eb62a55374d07a543e170e1bebfdb69.png?size=256",
    "turtle": "https://cdn.discordapp.com/avatars/396906947942809610/709792cf66df5945e309af695f11d6b7.png?size=256",
    "seyonijam": "https://cdn.discordapp.com/avatars/153590794538713089/554f734ff0db72de96a7b27266083bb5.png?size=256",
    "child_predator": "https://cdn.discordapp.com/avatars/273950169878495232/f31a7a42cd6e22e98b8f11299029c451.png?size=256"
};

var susser = "warzk";

Object.keys(sussers).forEach((person) => {
    document.getElementById(person)
        .addEventListener("click", function () {
            susser = person;
            grab(once = true);
            reset();
            document.getElementById(susser).className = "selected";
            document.getElementById("sustext").innerHTML = susser + " sus";
            document.getElementById("profile").setAttribute("src", sussers[susser] || sussers.warzk);
        });
});

function reset() {
    Object.keys(sussers).forEach((person) => {
        const button = document.getElementById(person);
        button.className = "";
    });
}

grab();

setTimeout(function () {
    document.body.classList.toggle("loading");
}, 2000);