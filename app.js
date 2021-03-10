// Tableau fourni
var films = [{
        name: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        name: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        name: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        name: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];

//Variables
var toShow = document.getElementsByClassName("toShow");
var ajouter = document.getElementById("ajouter");
var inputs = document.getElementById("inputs");
var save = document.getElementById("save");

var msgerr = document.getElementById("msgerr");
var success = document.getElementById("success");



var currentYear = new Date().getFullYear();

var table = document.getElementById("table");
var yrs = document.getElementById("yrs");
var names = document.getElementById("names");


afficherTableau();

//Affichage du tableau fourni
function afficherTableau() {
    table.innerHTML = "";

    films.forEach((film, indice) => {
        var addtr = table.insertRow();
        var addtd1 = addtr.insertCell(0);
        var addtd2 = addtr.insertCell(1);
        var addtd3 = addtr.insertCell(2);
        var addtd4 = addtr.insertCell(3);
        addtd1.innerHTML = film.name;
        addtd2.innerHTML = film.years;
        addtd3.innerHTML = film.authors;

        var addDeleteBtn = document.createElement("button");
        addDeleteBtn.innerHTML = "Supprimer";
        addDeleteBtn.value = indice;
        addtd4.appendChild(addDeleteBtn);

        addDeleteBtn.addEventListener('click', function () {
            if (confirm("Etes-vous sûr que vous voulez supprimer?")) {
                films.splice(this.value, 1);
                afficherTableau();
            }
        })
    });
}

//Button ajouter
ajouter.addEventListener("click", function () {
    inputs.style.display = 'inline-block';
    ajouter.style.display = 'none';
})

//Button save avec verification 
save.addEventListener("click", function (e) {
    e.preventDefault();

    let titre = document.getElementById("titre");
    let annee = document.getElementById("annee");
    let auteur = document.getElementById("auteur");

    let erreur = [];

    if (titre.value.length < 2) {
        erreur.push("Le titre doit contenir au moins 2 caractéres");
    }
    if (parseInt(annee.value) < 1900 || parseInt(annee.value) > currentYear || annee.value === '' || parseInt(annee.value) > currentYear) {
        erreur.push("l'Année doit être entre 1900 et l'année en cours");
    }
    if (auteur.value.length < 5) {
        erreur.push("Le nom de l'auteur doit contenir au moins 5 caractéres");
    }

    if (erreur.length > 0) {
        erreur.forEach(err => {
            var ul = document.getElementById("errList");
            var li = document.createElement("li");
            ul.appendChild(li);
            li.innerHTML = err;
        })
        msgerr.style.display = 'block';
        save.disabled = true;
        setTimeout(function () {
            msgerr.style.display = 'none';
            ul.innerHTML = '';
            save.disabled = false;
        }, 3000)
    } else {

        films.push({
            name: capitalize(titre.value),
            years: parseInt(annee.value),
            authors: capitalize(auteur.value)
        });

        afficherTableau();

        success.style.display = 'block';
        setTimeout(function () {
            success.style.display = 'none';
        }, 3000)

        inputs.style.display = 'none';
        ajouter.style.display = 'inline-block';
        inputs.reset();
    }
})

//Première lettre en majuscule 
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

//Ajout de fonctionnalité de librairie sort-table sur les options 
var filter = document.getElementById("filt");
filter.addEventListener('change', function () {
    if (filter.value == "Annee") {
        // sort by value
        films.sort(function (a, b) {
            return b.years - a.years;
        });

    }
    if (filter.value == "titre") {
        console.log("tri par titre");
        // sort by name
        films.sort(function (a, b) {
            
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    }

    afficherTableau();
})