export const redirectToGoogleMaps = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                window.open(
                    `https://www.google.com/maps?q=${latitude},${longitude}`,
                    '_blank',
                )
            },
            (error) => {
                console.error('Error fetching location:', error)
                alert('ไม่สามารถเข้าถึงตำแหน่งของคุณได้')
            },
        )
    } else {
        alert('เบราว์เซอร์ของคุณไม่รองรับ Geolocation')
    }
}
