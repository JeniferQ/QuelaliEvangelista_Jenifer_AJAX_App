(() => {

    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
  
    function loadInfoBoxes() {
        
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
    }

    loadInfoBoxes();
  
    function loadMaterialInfo() {

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
  
  