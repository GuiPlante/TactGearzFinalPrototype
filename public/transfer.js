document.addEventListener("DOMContentLoaded", function() {
    // Function to handle adding product to table
    function addProductToTable() {
        // Get selected product and quantity values
        var product = document.getElementById("product").value;
        var quantity = document.getElementById("quantity").value;

        // Check if quantity is not empty and is an integer
        if (quantity.trim() === "" || !Number.isInteger(Number(quantity))) {
            alert("Please enter an integer quantity.");
            return; // Exit the function early if quantity is empty or not an integer
        }

        // Check if product already exists in the table
        var tableRows = document.getElementById("transferTableBody").getElementsByTagName("tr");
        for (var i = 0; i < tableRows.length; i++) {
            var cells = tableRows[i].getElementsByTagName("td");
            if (cells[0].textContent === product) {
                // Product already exists, update quantity
                var existingQuantity = parseInt(cells[1].textContent);
                var newQuantity = existingQuantity + parseInt(quantity);
                cells[1].textContent = newQuantity;
                alert ('Quantity updated!')
                return; // Exit the function since product already exists
            }
        }

        // Product does not exist, create new row
        var newRow = document.createElement("tr");
        alert ('New Product Added!')

        // Create table data cells for product and quantity
        var productCell = document.createElement("td");
        productCell.textContent = product;
        var quantityCell = document.createElement("td");
        quantityCell.textContent = quantity;

        // Append cells to the new row
        newRow.appendChild(productCell);
        newRow.appendChild(quantityCell);

        // Append the new row to the table body
        document.getElementById("transferTableBody").appendChild(newRow);
    }

    // Add event listener to the "Add Product" button
    document.getElementById("addTransferButton").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        addProductToTable(); // Call function to add product to table

        transferTable.style.display = 'block';
    });

    // Add event listener to the "Transfer" button
    const transferButton = document.getElementById('transferButton');
        
    transferButton.addEventListener('click', (e) => {
        e.preventDefault();
        const shippingDepartment = document.getElementById('shippingDepartment').value;
        
        // Check if shipping department is entered
        if (shippingDepartment.trim() === "") {
            alert("Please enter a shipping department.");
            return; // Exit the function early if shipping department is not entered
        }

        // Shipping department entered, proceed with transfer
        const transferPanel = document.createElement('div');
        transferPanel.classList.add('confirmation-panel');
        transferPanel.innerHTML = `<h3>Transfer sent to ${shippingDepartment}!</h3>`;
        document.body.appendChild(transferPanel);
        
        // Hide the notification after a delay
        setTimeout(() => {
            document.body.removeChild(transferPanel);
            // Clear input fields and hide transfer table
            document.getElementById("product").value = "";
            document.getElementById("quantity").value = "";
            transferTable.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    });

    // Add event listener to the quantity input to allow only integers
    document.getElementById("quantity").addEventListener("input", function(event) {
        var inputValue = event.target.value;
        if (!/^\d*$/.test(inputValue)) {
            // If input value is not an integer, alert the user
            alert("Please enter an integer value.");
            // Remove non-integer characters from the input value
            event.target.value = inputValue.replace(/[^\d]/g, "");
        }
    });

    // Add event listener to the "Contact Shipping Department" button
    const contactShippingDepartmentButton = document.getElementById('contactButton');
    contactShippingDepartmentButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Create a panel with email address, body text box, and send button
        const panel = document.createElement('div');
        panel.classList.add('contact-panel');
        panel.innerHTML = `
            <h3>Contact Shipping Department</h3>
            <button class="close-button">X</button>
            <label for="email">To:</label>
            <textarea id="email" rows="1" cols="50"></textarea><br><br>
            <label for="message">Message:</label><br>
            <textarea id="message" rows="4" cols="50"></textarea><br><br>
            <button id="send">Send</button>
        `;
        document.body.appendChild(panel);

        // Add event listener to the close button
        const closeButton = panel.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(panel);
        });

        // Add event listener to the send button
        const sendButton = panel.querySelector('#send');
        sendButton.addEventListener('click', () => {
            // Remove the current panel
            document.body.removeChild(panel);
            // Open a new panel indicating that the email has been sent
            const confirmationPanel = document.createElement('div');
            confirmationPanel.classList.add('confirmation-panel');
            confirmationPanel.innerHTML = `
                <h3>Email Sent!</h3>
            `;
            document.body.appendChild(confirmationPanel);
            // Close the confirmation panel after 5 seconds
            setTimeout(() => {
                document.body.removeChild(confirmationPanel);
            }, 5000);
        });
    });
});
