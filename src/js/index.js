function hideBtnShowTable() {
    document.querySelector(".wrap").classList.add("hidden");
    document.querySelector(".container").classList.remove("hidden");
  }
  
  window.onload = function () {
    loadInitialData();
  };
  
  function loadInitialData() {
    // Make an initial API request to load data when the page loads
    axios
      .get("http://localhost:3000/transactions")
      .then((response) => {
        setToTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching initial data: ", error);
      });
  }
  
  function searchAndRequestAPI() {
    // Get the search query from the input box
    const query = document.getElementById("searchBox").value;
  
    // Make an API request using Axios with the search query
    axios
      .get(`http://localhost:3000/transactions?refId_like=${query}`)
      .then((response) => {
        setToTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }
  
  function sortAndRequestAPI(url) {
    document.getElementById("searchBox").value = "";
    // Make an API request to sort the data based on the selected column
    axios
      .get(url)
      .then((response) => {
        setToTable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }
  
  function setToTable(data) {
    const tableBody = document.getElementById("transactionTableBody");
    tableBody.innerHTML = ""; // Clear previous table data
  
    data.forEach((item) => {
      const row = document.createElement("tr");
  
      // Create and append table cells for each column
      const cell1 = document.createElement("td");
      cell1.textContent = item.id;
      row.appendChild(cell1);
  
      const cell2 = document.createElement("td");
      if (item.type == "افزایش اعتبار") cell2.style.color = "green";
      else cell2.style.color = "red";
      cell2.textContent = item.type;
      row.appendChild(cell2);
  
      const cell3 = document.createElement("td");
      cell3.textContent = item.price;
      row.appendChild(cell3);
  
      const cell4 = document.createElement("td");
      cell4.textContent = item.refId;
      row.appendChild(cell4);
  
      const cell5 = document.createElement("td");
      let apiDate = new Date(item.date).toLocaleDateString("fa-IR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }); //;
  
      const currentHour = new Date(item.date).getHours().toLocaleString("fa-IR");
      const currentMinutes = new Date(item.date)
        .getMinutes()
        .toLocaleString("fa-IR");
  
      const timeString = currentHour + ":" + currentMinutes;
  
      let date = "تاریخ: " + apiDate + " ساعت: " + timeString;
      cell5.textContent = date;
      row.appendChild(cell5);
  
      tableBody.appendChild(row); // Append row to table body
    });
  }
  
  function addSortIcons(type) {
    const tableHeader = document.getElementById(type);
    let iconTag = tableHeader.children[0];
    if (!iconTag.classList.contains("fa-sort-up")) {
      sortAndRequestAPI(
        `http://localhost:3000/transactions?_sort=${type}&_order=asc`
      );
      iconTag.classList.remove("fa-sort-down");
      iconTag.classList.add("fa-sort-up");
    } else {
      sortAndRequestAPI(
        `http://localhost:3000/transactions?_sort=${type}&_order=desc`
      );
      iconTag.classList.remove("fa-sort-up");
      iconTag.classList.add("fa-sort-down");
    }
  }
  