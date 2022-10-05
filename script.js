/**
 * Created by Julien on 17/12/2015.
 */
window.onload = function() {

    var req = new XMLHttpRequest();
    var pokemonBlockImg = document.getElementById('screenLeft');
    var pokemonBlockInfo = document.getElementById('screenRight');
    var errorBlock = document.getElementById('errorBlock');
    var patoche = 'http://vignette1.wikia.nocookie.net/desencyclopedie/images/c/ca/Seb.jpg/revision/latest?cb=20130404151002';
    var error = true;

    document.forms['form'].onsubmit = function () {
        req.open("GET", "./pokemons.json", true);
        var pokemon = document.getElementById("pokemon").value;
        req.onload = function () {
            var pokemonJson = JSON.parse(req.responseText);
            if(!isNaN(pokemon)) {
                error = numberPokemon(pokemonJson,pokemon,pokemonBlockImg,pokemonBlockInfo);
            }
            else {
                error = lettrePokemon(pokemonJson, pokemon, pokemonBlockImg, pokemonBlockInfo);
            }
            if (error === false){
                pokemonBlockImg.innerHTML ='<img src=\'' + patoche + '\'>';
                pokemonBlockInfo.innerHTML = '';
            }
        };
        req.send();
        return false;
    };

};

function lettrePokemon(pokemonJson,pokemon,pokemonBlockImg,pokemonBlockInfo){
    pokemon = firstInUpper(pokemon);
    for (var i=1; i<=151; i++) {
        if (typeof pokemonJson[i] != 'undefined') {
            if (pokemonJson[i].name == pokemon) {
                pokemonBlockInfo.innerHTML = 'firstname : ' + pokemonJson[i].name + '<br>';
                pokemonBlockInfo.innerHTML += 'type : '      + pokemonJson[i].type + '<br>';
                afficheImg(pokemonJson[i].name, pokemonBlockImg);
                return true;
            }
        }
    }
    errorBlock.innerHTML = pokemon + ' not found';
    return false;
}

function numberPokemon(pokemonJson ,pokemon, pokemonBlockImg,pokemonBlockInfo){
    if(pokemon > 151 || pokemon < 1){
        errorBlock.innerHTML = 'Pokémon number ' + pokemon + ' not found';
        return false;
    }
    pokemonBlockInfo.innerHTML  = 'firstname : ' + pokemonJson[pokemon].name + '<br>';
    pokemonBlockInfo.innerHTML += 'type : '      + pokemonJson[pokemon].type + '<br>';
    afficheImg(pokemonJson[pokemon].name, pokemonBlockImg);
}

function afficheImg(namePokemon, pokemonBlockImg){
    namePokemon = namePokemon.toLowerCase();
    pokemonBlockImg.innerHTML = '<img src=\'http://img.pokemondb.net/artwork/' + namePokemon + '.jpg\'>';
}

function firstInUpper(namePokemon){
    return namePokemon.substr(0,1).toUpperCase()+namePokemon.substr(1,namePokemon.length).toLowerCase();
}