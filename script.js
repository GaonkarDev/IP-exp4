// JavaScript code for form validation and handling
document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Form validation
    if (!validateForm()) {
        return;
    }

    // Process Order
    processOrder();
});

// Function to validate form inputs
function validateForm() {
    const phone = document.getElementById("phone").value;
    const tagline = document.getElementById("tagline").value;

    // Validate phone number length (9 digits)
    if (phone.length !== 9 || isNaN(phone)) {
        alert("Phone number must be exactly 9 digits.");
        return false;
    }

    // Restrict tagline length to 50 characters
    if (tagline.length > 50) {
        alert("Tagline must be less than 50 characters.");
        return false;
    }

    return true;
}

// Function to process the order and generate the receipt
function processOrder() {
    const receipt = document.getElementById("receipt");

    // Create a Person object
    class Person {
        constructor(name, phone, address) {
            this.name = name;
            this.phone = phone;
            this.address = address;
        }

        getDetails() {
            return `Name: ${this.name}, Phone: ${this.phone}, Address: ${this.address}`;
        }
    }

    // Create Student class that inherits from Person
    class Student extends Person {
        constructor(name, phone, address, rollNo) {
            super(name, phone, address);
            if (rollNo <= 0) throw new Error("Roll number must be greater than zero.");
            this.rollNo = rollNo;
        }

        // Overriding method
        getDetails() {
            return `${super.getDetails()}, Roll No: ${this.rollNo}`;
        }
    }

    // Demonstrate exception handling
    try {
        const student = new Student(
            document.getElementById("name").value,
            document.getElementById("phone").value,
            document.getElementById("address").value,
            1 // Sample roll number for demonstration
        );
        console.log(student.getDetails());
    } catch (error) {
        alert(error.message);
        return;
    }

    // Generate receipt details
    const orderDate = new Date().toLocaleString();
    receipt.innerHTML = `
        <div class="receipt-header">Order Receipt</div>
        <p>Order received successfully on ${orderDate}.</p>
        <div class="receipt-details">
            <p><strong>Tagline:</strong> ${document.getElementById("tagline").value}</p>
            <p><strong>Color:</strong> ${document.getElementById("color").value}</p>
            <p><strong>Size:</strong> ${document.getElementById("size").value}</p>
            <p><strong>Quantity:</strong> ${document.getElementById("quantity").value}</p>
            <p><strong>Delivery Date:</strong> ${document.getElementById("delivery-date").value}</p>
        </div>
    `;

    receipt.style.display = "block";
}
