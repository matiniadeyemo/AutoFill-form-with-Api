const apiKey = 'nxGkP6psMPCdGodAfvO1M7kQISAAetTX'; 

const addressInput = document.getElementById('addressInput');
const suggestionsContainer = document.getElementById('autocompleteSuggestions');
const countryInput = document.getElementById('country');
const stateInput = document.getElementById('state');
const localGovernmentSelect = document.getElementById('localGovernment');


addressInput.addEventListener('input', () => {
    const query = addressInput.value.trim();
    if (query.length > 2) { 
        fetch(`https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${apiKey}&limit=10`)
        .then(response => response.json())
        .then(data => {
            displaySuggestions(data.results);
        })
        .catch(error => console.error('Error fetching suggestions:', error));
    } else {
        suggestionsContainer.innerHTML = '';
    }
});

const displaySuggestions = (results) => {
    suggestionsContainer.innerHTML = '';
    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.textContent = result.address.freeformAddress;
        item.addEventListener('click', () => selectAddress(result));
        suggestionsContainer.appendChild(item);
    });
};

const selectAddress = (result) => {
    addressInput.value = result.address.freeformAddress;
    suggestionsContainer.innerHTML = '';

    countryInput.value = result.address.country || 'N/A';
    stateInput.value = result.address.countrySubdivision || 'N/A';

    fetchLocalGovernments(result.address.countrySubdivision);
};

const fetchLocalGovernments = (state) => {
   
    const lgas = getLGAsByState(state); 
    localGovernmentSelect.innerHTML = '<option value="">Select Local Government</option>';
    lgas.forEach(lga => {
        const option = document.createElement('option');
        option.value = lga;
        option.textContent = lga;
        localGovernmentSelect.appendChild(option);
    });
};

const getLGAsByState = (state) => {
    const lgaData = {
        "Lagos": ["Ikeja", "Surulere", "Eti-Osa", "Agbado/Oke-Odo", "Agboyi-Ketu", "Ayobo-Ipaja", "Bariga", "Eredo"],
        "Abia": ["Aba North", "Aba South","Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "muahia South", "Umu Nneochi"],
        "Adamawa": ["Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Grie", "Hong", "Jada", "Larmurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
        "AkwaIbom": ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene",  "Ini",  "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong Oruko", "Uyo" ],
        "Anambra": [ "Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North",  "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South",  "Oyi"  ],        
        "Cross River": [ "Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala" ],  
        "Delta": [ "Aniocha North",  "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie",  "Warri North", "Warri South", "Warri South West" ],
        "Ekiti": [ "Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West",  "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun-Ifelodun", "Ise-Orun", "Moba", "Oye" ],
        "FCT": [ "Abaji", "Bwari", "Gwagwalada",  "Kuje", "Kwali", "Municipal Area Council"  ],
        "California": ["Los Angeles County", "San Francisco County", "Orange County"]
    };
    return lgaData[state] || [];
};