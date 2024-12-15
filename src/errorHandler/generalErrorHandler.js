export function GeneralErrorHandler(error) {
    let customMessage;

    switch (true) {
        case error.message.includes("429"):
            customMessage = "The API Used Too Much. Change The Key";
            break;
        case error.message.includes("500"):
            customMessage = "Internal server error: Please try again later.";
            break;
        case error.message.includes("404"):
            break;
        case error.message.includes("403"):
            customMessage = "Unvalid Token, Check Your Key";
            break;
        default:
            customMessage = "An unexpected error occurred. Please try again.";
            break;
    }  

    // Log the original error for debugging purposes
    console.error("Original error:", error);

    // Create or update the <h1> element in the document
    let errorHeading = document.getElementById('error-heading');
    if (!errorHeading) {
        errorHeading = document.createElement('h1');
        errorHeading.id = 'error-heading';
        document.body.appendChild(errorHeading);
    }
    // Set the custom message as the text of the <h1> element  
    errorHeading.textContent = customMessage;
}