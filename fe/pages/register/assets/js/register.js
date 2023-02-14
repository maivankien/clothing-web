const message = document.querySelector('.message-error')

document.querySelector('.form-register').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    })
    try {
        let result = await fetch('https://maivankien-clothing.onrender.com/api/user/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await result.json()
        if (response.EC = -1 && typeof response.message != 'object') {
            message.textContent = response.message
        }
        if (response.message == 'Account successfully created') {
            window.location.href = '../login/login.html'
        }
    } catch (error) {
        console.error(error)
    }
})
