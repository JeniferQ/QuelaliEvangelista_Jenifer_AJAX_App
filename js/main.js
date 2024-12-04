(() => {

    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");

    const infoBoxError = document.querySelector("#hotspot-error-msg");
    const infoBoxLoader = document.querySelector("#loader1");
    const model = document.querySelector("#model");

    const materialError = document.querySelector("#material-error-msg");
    const materialLoader = document.querySelector("#loader2");
    
  
    function loadInfoBoxes() {
        infoBoxLoader.classList.add("hidden");

        fetch("https://swiftpixel.com/earbud/api/infoboxes")
        .then(response => response.json())
        .then(infoBoxes => {
          infoBoxes.forEach((infoBox, index) => {
            let selected = document.querySelector(`#hotspot-${index + 1}`);
    
            const titleElement = document.createElement('h2');
            titleElement.textContent = infoBox.heading;
    
            const textElement = document.createElement('p');
            textElement.textContent = infoBox.description;
    
            const imageElement = document.createElement('img');
            imageElement.src = `images/${infoBox.thumbnail}`;
    
            selected.append(titleElement, textElement, imageElement);
          })
        })

        .catch(error => {
            console.log(error);
    
            infoBoxLoader.classList.remove("hidden");
            model.classList.add("hidden");

            const errorMessage = document.createElement("p");
            errorMessage.textContent = `Something went wrong. Please try again later. ${error}`;
            
            infoBoxError.appendChild(errorMessage);
        })
    }

    loadInfoBoxes();
  
    function loadMaterialInfo() {
        materialLoader.classList.add("hidden");

        fetch("https://swiftpixel.com/earbud/api/materials")
        .then(response => response.json())
        .then(materials => {
          materials.forEach(material => {
            const clone = materialTemplate.content.cloneNode(true);
            const materialHeading = clone.querySelector(".material-heading");
            materialHeading.textContent = material.heading;
    
            const paragraphDescription = clone.querySelector(".material-description");
            paragraphDescription.textContent = material.description;
    
            materialList.append(clone);
          })
        })

        .catch(error => {
            console.log(error);

            materialLoader.classList.remove("hidden");

            const errorMessage = document.createElement("p");
            errorMessage.textContent = `Something went wrong. Please try again later. ${error}`;
      
            materialError.appendChild(errorMessage);
        })
    }

    loadMaterialInfo();
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
  })();
  
  