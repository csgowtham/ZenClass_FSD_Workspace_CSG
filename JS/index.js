const API_URL = "https://6646fa8551e227f23ab07ed0.mockapi.io/users";

function constructTable(data) {
    let tbody = document.getElementById("table-body");
    tbody.innerHTML = "";
    data.forEach(e => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.mobile}</td>
            <td>
                <label class="switch">
                    <input type="checkbox" ${e.status ? "checked" : ""} onChange="toggleUser(${e.id}, ${e.status})">
                    <span class="slider round"></span>
                </label>
            </td>
            <td>
                <button class="btn btn-primary" onClick="navigate(${e.id})">Edit</button>
                <button class="btn btn-danger" onClick="deleteData(${e.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function navigate(id) {
    window.location.href=`./HTML/view.html?id=${id}`;
}

async function toggleUser(id, status) {
    try {
        console.log(`Old status of ${id} is ${status}`);
        let res = await fetch(`${API_URL}/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({ status: !status })
        });

        if (res.status === 200)
            getData();
        else
            alert(`${res.status} - ${res.statusText}`);
    } catch (error) {
        console.log(error);
    }
}

async function deleteData(id) {
    let res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    console.log(res);
    if (res.status === 200)
        getData();
    else
        alert(res.statusText);
}

async function getData() {
    try {
        let res = await fetch(API_URL, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        });
        let data = await res.json();
        if (res.status === 200) {
            constructTable(data);
        } else {
            alert(res.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

getData();
