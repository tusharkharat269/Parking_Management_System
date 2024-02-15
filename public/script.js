function displayParkingData() {
    const table = document.getElementById('parkingTable');
    table.innerHTML = '<tr><th>ID</th><th>Slot Number</th><th>Vehicle Number</th><th>Entry Time</th></tr>';
  
    fetch('/getSlots')
      .then(response => response.json())
      .then(data => {
        data.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${row.id}</td><td>${row.slot_number}</td><td>${row.vehicle_number}</td><td>${row.entry_time}</td>`;
          table.appendChild(tr);
        });
      });
  }
  
  function addSlot() {
    const slotNumber = document.getElementById('slotNumber').value;
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const entryTime = document.getElementById('entryTime').value;
  
    fetch(`/addSlot?slotNumber=${slotNumber}&vehicleNumber=${vehicleNumber}&entryTime=${entryTime}`)
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        displayParkingData();
      });
  }
  
  function updateSlot() {
    const id = prompt('Enter Slot ID to update:');
    const vehicleNumber = prompt('Enter Vehicle Number:');
  
    fetch(`/updateSlot?id=${id}&vehicleNumber=${vehicleNumber}`)
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        displayParkingData();
      });
  }
  
  function deleteSlot() {
    const id = prompt('Enter Slot ID to delete:');
  
    fetch(`/deleteSlot?id=${id}`)
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        displayParkingData();
      });
  }
  
  document.addEventListener('DOMContentLoaded', displayParkingData);
  