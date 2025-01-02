async function resetUserPassword(uuid, newPassword) {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('User is not authenticated');
        return;
    }

    const response = await fetch(`/accounts/v2/users/${uuid}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ newpassword: newPassword })
    });

    if (response.ok) {
        const result = await response.json();
        console.log(result.message); 
    } else {
        const error = await response.json();
        console.error(error.message); 
    }
}
