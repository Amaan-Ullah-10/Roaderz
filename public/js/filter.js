document.addEventListener("DOMContentLoaded", () => {
    const vehicleItems = document.querySelectorAll(".vehicle-item");
    const vehicleCards = document.querySelectorAll(".vehicle-card"); // Ensure each vehicle listing has a class "vehicle-card"

    vehicleItems.forEach(item => {
        item.addEventListener("click", () => {
            const selectedCategory = item.getAttribute("data-category");

            // Remove 'active' class from all items and add it to the clicked one
            vehicleItems.forEach(v => v.classList.remove("active"));
            item.classList.add("active");

            // Show/Hide vehicles based on category
            vehicleCards.forEach(card => {
                const vehicleType = card.getAttribute("data-category");
                if (vehicleType === selectedCategory) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

