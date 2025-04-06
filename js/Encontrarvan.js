// script.js
document.addEventListener('DOMContentLoaded', function() {
    const drivers = document.querySelectorAll('.driver');
    const filterDriver = document.getElementById('filter-driver');
    const filterPrice = document.getElementById('filter-price');
    const filterSchool = document.getElementById('filter-school');
    const filterPeriod = document.getElementById('filter-period');
    const filterCity = document.getElementById('filter-city');

    function filterDrivers() {
        const selectedDriver = filterDriver.value;
        const selectedPrice = filterPrice.value;
        const selectedSchool = filterSchool.value;
        const selectedPeriod = filterPeriod.value;
        const selectedCity = filterCity.value;

        drivers.forEach(driver => {
            const driverName = driver.getAttribute('data-driver').split(',');
            const driverPrice = driver.getAttribute('data-price').split(',');
            const driverSchool = driver.getAttribute('data-school').split(','); // Transforma em array
            const driverPeriod = driver.getAttribute('data-period').split(',');
            const driverCity = driver.getAttribute('data-idaevolta').split(',');

            const matchesDriver = selectedDriver === '' || driverName.includes(selectedDriver);
            const matchesPrice = selectedPrice === '' || driverPrice.includes(selectedPrice);
            const matchesSchool = selectedSchool === '' || driverSchool.includes(selectedSchool);
            const matchesPeriod = selectedPeriod === '' || driverPeriod.includes(selectedPeriod);
            const matchesCity = selectedCity === '' || driverCity.includes(selectedCity);

            if (matchesDriver && matchesPrice && matchesSchool && matchesPeriod && matchesCity) {
                driver.style.display = 'block';
            } else {
                driver.style.display = 'none';
            }
        });
    }

    filterDriver.addEventListener('change', filterDrivers);
    filterPrice.addEventListener('change', filterDrivers);
    filterSchool.addEventListener('change', filterDrivers);
    filterPeriod.addEventListener('change', filterDrivers);
    filterCity.addEventListener('change', filterDrivers);
});
