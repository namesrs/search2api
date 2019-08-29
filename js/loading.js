//Loading functions



//Göm laddningsindikator när laddning är färdig
function hideLoadIndicator() {
    console.log('Kollar ifall resultat har börjat laddas');

    if ($('#domainList').find('li').length) {

        showResultsanimation();


    }


}

function StartedLoadingTimer() {
    checkIfStartedLoading = setInterval(hideLoadIndicator, 1100);

}