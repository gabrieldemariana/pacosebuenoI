document.addEventListener('DOMContentLoaded', function() {
    console.log('Cookie script loaded'); // Para debugging
    const cookieDialog = document.getElementById('cookieDialog');
    
    if (!cookieDialog) {
        console.error('Cookie dialog not found');
        return;
    }

    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');

    // Forzar que se muestre el diálogo (para pruebas)
    localStorage.removeItem('cookiePreference');

    // Mostrar el diálogo si no hay preferencia guardada
    if (!localStorage.getItem('cookiePreference')) {
        console.log('Showing cookie dialog'); // Para debugging
        cookieDialog.showModal();
    }

    acceptBtn.addEventListener('click', () => {
        console.log('Cookies accepted'); // Para debugging
        localStorage.setItem('cookiePreference', 'accepted');
        cookieDialog.close();
    });

    rejectBtn.addEventListener('click', () => {
        console.log('Cookies rejected'); // Para debugging
        localStorage.setItem('cookiePreference', 'rejected');
        cookieDialog.close();
    });
}); 