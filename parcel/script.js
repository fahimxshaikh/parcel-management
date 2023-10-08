  var data = [
    {id: 10, name: "PARCEL 1", sequence: 1, group: "Mumbai"},
    {id: 11, name: "PARCEL 2", sequence: 2, group: "Mumbai"},
    {id: 13, name: "PARCEL 3", sequence: 3, group: "Mumbai"},
    {id: 19, name: "PARCEL 4", sequence: 4, group: "Delhi"},
    {id: 18, name: "PARCEL 5", sequence: 5, group: "Delhi"},
    {id: 21, name: "PARCEL 6", sequence: 6, group: "Kolkata"},
    {id: 12, name: "PARCEL 7", sequence: 7, group: "Kolkata"},
    {id: 22, name: "PARCEL 8", sequence: 8, group: "Kolkata"},
    {id: 23, name: "PARCEL 9", sequence: 9, group: "Kolkata"},
    {id: 24, name: "PARCEL 10", sequence: 10, group: "Mumbai"},
    {id: 25, name: "PARCEL 11", sequence: 11, group: "Mumbai"},
    {id: 31, name: "PARCEL 12", sequence: 12, group: "Mumbai"},
    {id: 34, name: "PARCEL 13", sequence: 13, group: "Mumbai"},
    {id: 35, name: "PARCEL 14", sequence: 14, group: "Delhi"},
    {id: 41, name: "PARCEL 15", sequence: 15, group: "Delhi"},
    {id: 42, name: "PARCEL 16", sequence: 16, group: "Delhi"},
    {id: 43, name: "PARCEL 17", sequence: 17, group: "Delhi"},
    {id: 44, name: "PARCEL 18", sequence: 18, group: "Kolkata"},
    {id: 53, name: "PARCEL 19", sequence: 19, group: "Kolkata"},
    {id: 57, name: "PARCEL 20", sequence: 20, group: "Kolkata"}
  ];

  const originalData = [...data];

  const groupColors = {
    Mumbai: "coral",
    Delhi: "yellow",
    Kolkata: "blueviolet"
  };
  

  function renderParcelList() {
    const parcelListContainer = document.getElementById("parcelList");
    parcelListContainer.innerHTML = "";
  
    data.forEach((parcel) => {
      const parcelElement = document.createElement("button");
      parcelElement.className = "parcel";
      parcelElement.textContent = `${parcel.name}`;
      parcelElement.style.backgroundColor = getGroupColor(parcel.group);
      parcelElement.addEventListener("click", () => {
        handleParcelSelection(parcel);
      });
      parcelListContainer.appendChild(parcelElement);
    });
  }
  
  function handleParcelSelection(parcel) {
    const selectedParcelElement = document.getElementById("selectedParcel");
    const selectedParcel = getSelectedParcel();
  
    if (selectedParcel && selectedParcel.id === parcel.id) {
      selectedParcelElement.textContent = "";
    } else {
      selectedParcelElement.textContent = `${parcel.name} - ${parcel.group}`;
    }
  }
  
  function getSelectedParcel() {
    const selectedParcelElement = document.getElementById("selectedParcel");
    if (selectedParcelElement.textContent === "") {
      return null;
    } else {
      const [name, group] = selectedParcelElement.textContent.split(" - ");
      return data.find((parcel) => parcel.name === name && parcel.group === group);
    }
  }

  function addAfter() {
    const selectedParcel = getSelectedParcel();
    const parcelNameInput = document.getElementById("parcelName");
    const parcelGroupSelect = document.getElementById("parcelGroup");
    const name = parcelNameInput.value.trim();
    const group = parcelGroupSelect.value;

    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
    if (name === "") {
      alert("Please enter a parcel name.");
      return;
    }
  
    const index = data.findIndex((parcel) => parcel.id === selectedParcel.id);
    const newParcel = {
      id: Date.now(),
      name,
      sequence: selectedParcel.sequence + 1,
      group,
    };
    data.splice(index + 1, 0, newParcel);
    for (let i = index + 1; i < data.length; i++) {
      data[i].sequence += 1;
    }
    parcelNameInput.value = "";
    renderParcelList();
  }

  
  function addBefore() {
    const selectedParcel = getSelectedParcel();
    const parcelNameInput = document.getElementById("parcelName");
    const parcelGroupSelect = document.getElementById("parcelGroup");
    const name = parcelNameInput.value.trim();
    const group = parcelGroupSelect.value;

    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
    if (name === "") {
      alert("Please enter a parcel name.");
      return;
    }

    const index = data.findIndex((parcel) => parcel.id === selectedParcel.id);
    const newParcel = {
      id: Date.now(),
      name,
      sequence: selectedParcel.sequence,
      group,
    };
    data.splice(index, 0, newParcel);
    for (let i = index + 1; i < data.length; i++) {
      data[i].sequence += 1;
    }
    parcelNameInput.value = "";
    renderParcelList();
  }
  
  function replaceParcel() {
    const selectedParcel = getSelectedParcel();
    const parcelNameInput = document.getElementById("parcelName");
    const parcelGroupSelect = document.getElementById("parcelGroup");
    const name = parcelNameInput.value.trim();
    const group = parcelGroupSelect.value;

    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
    if (name === "") {
      alert("Please enter a parcel name.");
      return;
    }

    const index = data.findIndex((parcel) => parcel.id === selectedParcel.id);
    const newParcel = {
      id: Date.now(),
      name,
      sequence: selectedParcel.sequence,
      group,
    };
    data.splice(index, 1, newParcel);
    parcelNameInput.value = "";
    renderParcelList();
  }
  
  function deleteParcel() {
    const selectedParcel = getSelectedParcel();
    const index = data.findIndex((parcel) => parcel.id === selectedParcel.id);

    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }

    data.splice(index, 1);
    for (let i = index; i < data.length; i++) {
      data[i].sequence -= 1;
    }
    document.getElementById("parcelName").value = "";
    document.getElementById("parcelGroup").value = "Mumbai";
    renderParcelList();
  }
   
  function refresh() {
    data = [...originalData];
    document.getElementById("parcelName").value = "";
    document.getElementById("parcelGroup").value = "Mumbai";
    renderParcelList();
  }
  
  
  function showFinalData() {
    console.log(data);
  }
  
  function getGroupColor(group) {
    return groupColors[group] || "#cccccc";
  }

  
  function showParcelsByCity(city) {
    const parcelListContainer = document.getElementById("parcelList");
    parcelListContainer.innerHTML = "";

    const parcelsByCity = data.filter((parcel) => parcel.group === city);

    parcelsByCity.forEach((parcel) => {
      const parcelElement = document.createElement("button");
      parcelElement.className = "parcel";
      parcelElement.textContent = `${parcel.name} - ${parcel.group} `;
      parcelElement.style.backgroundColor = getGroupColor(parcel.group);

      parcelElement.addEventListener("click", () => {
        handleParcelSelection(parcel);
      });

      parcelListContainer.appendChild(parcelElement);
    });
  }




  renderParcelList();