document.addEventListener("DOMContentLoaded", function () {
    loadComplaints();
});

function loadComplaints() {

    const container = document.getElementById("complaintContainer");
    container.innerHTML = "";

    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let total = complaints.length;
    let pending = 0;
    let inProgress = 0;
    let resolved = 0;

    complaints.forEach((data, index) => {

        if (data.status === "Pending") pending++;
        else if (data.status === "In Progress") inProgress++;
        else if (data.status === "Resolved") resolved++;

        const card = document.createElement("div");
        card.classList.add("complaint-card");

        card.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Department:</strong> ${data.department}</p>
            <p><strong>Issue:</strong> ${data.issue}</p>
            <p><strong>Description:</strong> ${data.description}</p>

            <label><strong>Status:</strong></label>
            <select onchange="updateStatus(${index}, this.value)">
                <option value="Pending" ${data.status==="Pending"?"selected":""}>Pending</option>
                <option value="In Progress" ${data.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Resolved" ${data.status==="Resolved"?"selected":""}>Resolved</option>
            </select>
        `;

        container.appendChild(card);
    });

    document.getElementById("totalCount").innerText = total;
    document.getElementById("pendingCount").innerText = pending;
    document.getElementById("progressCount").innerText = inProgress;
    document.getElementById("resolvedCount").innerText = resolved;
}

function updateStatus(index, newStatus) {

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints[index].status = newStatus;
    localStorage.setItem("complaints", JSON.stringify(complaints));

    loadComplaints();
}

function logout() {
    window.location.href = "index.html";
}