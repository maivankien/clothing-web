

document.querySelector('.form-register').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach(function (value, key) {
        data[key] = value;
    });
    console.log(data)

    fetch('https://maivankien-clothing.onrender.com/api/user/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.error(error);
        });
});
