 const nameInput = document.getElementById("nameInput");
    const professionInput = document.getElementById("professionInput");
    const ageInput = document.getElementById("ageInput");
    const addUserBtn = document.getElementById("addUserBtn");
    const messageEl = document.getElementById("message");
    const employeeList = document.getElementById("employeeList");
    const employeeCount = document.getElementById("employeeCount");
    const noEmployeesMsg = document.getElementById("noEmployeesMsg");

    let employees = [];

    function showMessage(text, type) {
      messageEl.textContent = text;
      messageEl.className = "message " + (type === "error" ? "error" : "success");
      // Hide message after 3 seconds
      setTimeout(() => {
        messageEl.textContent = "";
        messageEl.className = "message";
      }, 3000);
    }

    function renderEmployees() {
      employeeList.innerHTML = "";
      if (employees.length === 0) {
        employeeList.appendChild(noEmployeesMsg);
      } else {
        employees.forEach((emp) => {
          const div = document.createElement("div");
          div.className = "employee-card";
          div.innerHTML = `
            <span>${emp.name}</span>
            <span>${emp.profession}</span>
            <span>${emp.age}</span>
            <button class="delete-btn" data-id="${emp.id}">Delete</button>
          `;
          employeeList.appendChild(div);
        });
      }
      employeeCount.textContent = employees.length;
    }

    function generateId() {
      return Date.now() + Math.random().toString(16).slice(2);
    }

    addUserBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const profession = professionInput.value.trim();
      const age = ageInput.value.trim();

      if (!name || !profession || !age) {
        showMessage("Error: All fields are required!", "error");
        return;
      }

      const newEmployee = {
        id: generateId(),
        name,
        profession,
        age: Number(age),
      };

      employees.push(newEmployee);
      renderEmployees();

      showMessage("Success: Employee added!", "success");

      // Clear inputs
      nameInput.value = "";
      professionInput.value = "";
      ageInput.value = "";
    });

    employeeList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.getAttribute("data-id");
        employees = employees.filter((emp) => emp.id !== id);
        renderEmployees();
      }
    });

    // Initial render
    renderEmployees();