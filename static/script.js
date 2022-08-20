function getResidentsLink(apilink){
    document.getElementById('modalcontent').innerHTML = "";
    getHeaders();
    let replace = apilink.replace(/\'|\[|\]|\,/g, "");
    let links = replace.split(" ");
    for(let link of links){
        let xhr = new XMLHttpRequest();
        xhr.open('GET',link,true)
        xhr.onload = function(){
        if (xhr.status == 200){
            let residents = JSON.parse(this.response)

            let name = residents.name;
            let height = residents.height;
            let mass = residents.mass;
            let hairColor = residents.hair_color;
            let skinColor = residents.skin_color;
            let eyeColor = residents.eye_color;
            let birthYear = residents.birth_year;
            let gender = residents.gender;

           const resident = showResident(name,height,mass,hairColor,skinColor,eyeColor,birthYear,gender);
            document.getElementById('modalcontent').appendChild(resident);
        }
    }
    xhr.send()
    }



}
function getHeaders(){
    document.getElementById('modalcontent').innerHTML = `
              <div class="row">

                <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Name</b>
                </div>
                <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Height</b>
                </div>
                  <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Mass</b>
                </div>
                <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Hair color</b>
                </div>
                    <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Skin color</b>
                </div>
                    <div class="col p-3 mb-2 bg-light text-dark border text-center">
                      <b>Eye color</b>
                </div>
                    <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Birth year</b>
                </div>
                <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Gender</b>
                </div>
            </div>
        </div>`
}


 function showResident(name,height,mass,hairColor,skinColor,eyeColor,birthYear,gender){
            const row = document.createElement('div');
            row.classList.add('row');

            let col = document.createElement('div');
            col.classList.add('col','bg-light','text-dark','border');

            const residentName = document.createElement('span');
            residentName.style.display = 'inline-block';
            residentName.style.textAlign = 'center';
            residentName.textContent = name;
            col.appendChild(residentName);

            row.appendChild(col);

            col = document.createElement('div');
            col.classList.add('col','bg-light','text-dark','border');

            const residentHeight = document.createElement('span');
            residentHeight.style.display = 'inline-block';
            residentHeight.style.textAlign = 'center';
            residentHeight.textContent = height;
            col.appendChild(residentHeight);

            row.appendChild(col);

            col = document.createElement('div');
            col.classList.add('col','bg-light','text-dark','border');


            const residentMass = document.createElement('span');
            residentMass.style.display = 'inline-block';
            residentMass.style.textAlign = 'center';
            residentMass.textContent = mass;
            col.appendChild(residentMass);

            row.appendChild(col);

            col = document.createElement('div');
            col.classList.add('col','bg-light','text-dark','border');


            const residentHairColor = document.createElement('span');
            residentHairColor.style.display = 'inline-block';
            residentHairColor.style.textAlign = 'center';
            residentHairColor.textContent = hairColor;
            col.appendChild(residentHairColor);

            row.appendChild(col);

            col = document.createElement('div');
            col.classList.add('col','bg-light','text-dark','border');


            const residentSkinColor = document.createElement('span');
            residentSkinColor.style.display = 'inline-block';
            residentSkinColor.style.textAlign = 'center';
            residentSkinColor.textContent = skinColor;
            col.appendChild(residentSkinColor);

            row.appendChild(col);

            col = document.createElement('div');
            col.classList.add('col','bg-light','text-dark','border');


            const residentEyeColor = document.createElement('span');
            residentEyeColor.style.display = 'inline-block';
            residentEyeColor.style.textAlign = 'center';
            residentEyeColor.textContent = eyeColor;
            col.appendChild(residentEyeColor);

            row.appendChild(col);

            col = document.createElement('div');
            col.classList.add('col','bg-light','text-dark','border');


            const residentBirthYear = document.createElement('span');
            residentBirthYear.style.display = 'inline-block';
            residentBirthYear.style.textAlign = 'center';
            residentBirthYear.textContent = birthYear;
            col.appendChild(residentBirthYear);

            row.appendChild(col);

            col = document.createElement('div');
            col.classList.add('col','bg-light','text-dark','border');


            const residentGender = document.createElement('span');
            residentGender.style.display = 'inline-block';
            residentGender.style.textAlign = 'center';
            residentGender.textContent = gender;
            col.appendChild(residentGender);

            row.appendChild(col);


            return row;
};

