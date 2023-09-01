// skriv din JavaScript her...

var musicList = [
    {
        sangtitel: "Baby Powder",
        kunstner: "Jenevieve",
        årstal: 2021,
        album: "Division",
        songwriters: ["Jenevieve", "Anri, sample from Last Summer Whisper"]
    },
    {
        sangtitel: "Cool Cat",
        kunstner: "Queen, Freddy Mercury",
        årstal: 1982,
        album: "Hot Space",
        songwriters: ["Freddie Mercury", "John Deacon"]
    },
    {
        sangtitel: "Det er mig der står her ude og banker på",
        kunstner: "Thomas Helmig",
        årstal: 1988,
        album: "Vejen Væk",
        songwriters: ["Thomas Helmig"]
    },
    {
        sangtitel: "Shape of You",
        kunstner: "Ed Sheeran",
        årstal: 2017,
        album: "Divide",
        songwriters: ["Ed Sheeran"]
    },
    {
        sangtitel: "Delito",
        kunstner: "Nathy Peluso",
        årstal: 2020,
        album: "Calambre",
        songwriters: ["Nathy Peluso", "Rafael Arcaute", "RVNES", "Pearl Lion", "Gino The Ghost", "Federico Vindver", "Al Hug",]
    },
    {
        sangtitel: "Despecha",
        kunstner: "Rosalia",
        årstal: 2022,
        album: "Motomami",
        songwriters: ["Rosalia"]
    },
] //slut på musik array







const FORM = document.querySelector(".searchForm");
//henter min search form fra header til JS

FORM.addEventListener("submit", submitHandler);
//trækker på min searchForm som jeg har hentet ovenfor 
// og laver et event jeg kalder submitHandler







function submitHandler(event) {
    event.preventDefault();
    //preventer default aktion

    const searchValue = event.target.search.value.toLowerCase();
    //henter værdien ved search
    const RESULTS = musicList.filter(function (element) {
        return (
            searchSong(searchValue, element.sangtitel) 
            ||
            searchArtist(searchValue, element.kunstner)
            ||
            compare(element.årstal.toString(), searchValue)
            ||
            searchAlbum(searchValue, element.album)
            ||
            findInArray(element.songwriters, searchValue)

        );
    }); //slut search RESULTS

    console.log(RESULTS)
    //viser søgeresultat i consollen
    const UL = document.getElementsByClassName("musicResults")[0]
    //henter ul fra index.html via classname på DOM document

    RESULTS.forEach(function (result) {
        //skaber nu innerhtml i denne function lavet på search RESULTS
        //med forEach så vi skaber et nyt element for hver array object
        const LI = document.createElement("li")
        //opretter her et li element med dom


        // DOM REGION TIL SUBMITHANDLER ----------------------- 
        LI.innerHTML =
        //ligger html ind i min li
        `
        <h1>Kunstner</h1>
        <h2 class="sang_titel">Sang: ${result.sangtitel}</h2>
        <p class="sang_kunstner">Kunstner: ${result.kunstner}</p>
        <span class="sang_årstal">Årstal: ${result.årstal}</span>
        <p class="sang_album">Album: ${result.album}</p>
        <h3>Songwriters:</h3>
        <ul class="songwriters"></ul>
        `

        const SONGWRITERS = LI.querySelector(".songwriters")
        //her trækker jeg på min class fra LI.innerHTML songwriters i ny ul

        result.songwriters.forEach(songwriters => SONGWRITERS.innerHTML += `<li>${songwriters}</li>`)
        //her laver jeg en ny li for hver af mine songwriters i mit musicList, songwriter arrays fra search result på RESULTS

        UL.append(LI)

    })



    
    

} //slut på submitHandler






// functioner udenfor submitHandler til at søge i functionen RESULTS ------------------

function searchSong(keyword, sangtitel) {
    return sangtitel.toLowerCase().includes(keyword);
} //slut på søg sangtitel til search RESULTS

function searchArtist(keyword, kunstner) {
    return kunstner.toLowerCase().includes(keyword);
}//slut på søg artist til search RESULTS

function searchAlbum(keyword, album) {
    return album.toLowerCase().includes(keyword);
}//slut på søg album til search RESULTS



const compare = (a, b) => a == b;
//slut på søg årstal til search RESULTS



function findInArray(haystack, needle) {
    return haystack.find(function (item) {
        return item.toLowerCase().includes(needle);
    });
}//slut på genanvendelig søge function for arrays i mit musicList array's properties