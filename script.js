document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next');
    const prevButtons = document.querySelectorAll('.prev');
    let currentStep = 0;
  
    steps[currentStep].classList.add('active');
  
    nextButtons.forEach(button => {
      button.addEventListener('click', function() {
        steps[currentStep].classList.remove('active');
        currentStep++;
        if (currentStep < steps.length) {
          steps[currentStep].classList.add('active');
        }
      });
    });
  
    prevButtons.forEach(button => {
      button.addEventListener('click', function() {
        steps[currentStep].classList.remove('active');
        currentStep--;
        if (currentStep >= 0) {
          steps[currentStep].classList.add('active');
        }
      });
    });
  
    document.getElementById('dataForm').addEventListener('submit', function(event) {
      event.preventDefault();
    
      // Collect form data
      const formData = {
        type: document.getElementById('type').value,
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        details: document.getElementById('details').value,
        lat: parseFloat(document.getElementById('lat').value),
        long: parseFloat(document.getElementById('long').value),
        link: document.getElementById('link').value
      };
    
      // Send form data to Google Sheet
      fetch('https://script.google.com/macros/s/AKfyc.../exec', { // Replace with your Google Apps Script URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        showPopup('ขอบคุณที่เพิ่มเติมข้อมูล ข้อมูลของคุณจะถูกอัพเดทภายหลังจากแอดมินตรวจสอบ 🙏🙏');
        console.log('Success:', data);
      })
      .catch((error) => {
        alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        console.error('Error:', error);
      });
    });
  
    function showPopup(message) {
      // Create popup overlay
      const popupOverlay = document.createElement('div');
      popupOverlay.style.position = 'fixed';
      popupOverlay.style.top = '0';
      popupOverlay.style.left = '0';
      popupOverlay.style.width = '100%';
      popupOverlay.style.height = '100%';
      popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      popupOverlay.style.display = 'flex';
      popupOverlay.style.alignItems = 'center';
      popupOverlay.style.justifyContent = 'center';
      popupOverlay.style.zIndex = '1000';
  
      // Create popup container
      const popupContainer = document.createElement('div');
      popupContainer.style.backgroundColor = '#fff';
      popupContainer.style.padding = '20px';
      popupContainer.style.borderRadius = '10px';
      popupContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
      popupContainer.style.textAlign = 'center';
  
      // Create popup message
      const popupMessage = document.createElement('p');
      popupMessage.textContent = message;
      popupMessage.style.marginBottom = '20px';
  
      // Create close button
      const closeButton = document.createElement('button');
      closeButton.textContent = 'ปิด';
      closeButton.style.padding = '10px 20px';
      closeButton.style.backgroundColor = '#84ab81';
      closeButton.style.color = '#fff';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '5px';
      closeButton.style.cursor = 'pointer';
  
      closeButton.addEventListener('click', () => {
        document.body.removeChild(popupOverlay);
      });
  
      // Append elements
      popupContainer.appendChild(popupMessage);
      popupContainer.appendChild(closeButton);
      popupOverlay.appendChild(popupContainer);
      document.body.appendChild(popupOverlay);
    }
  });
  