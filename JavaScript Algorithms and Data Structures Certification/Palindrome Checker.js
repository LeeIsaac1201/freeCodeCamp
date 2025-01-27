// Event Listener Section
document.getElementById('check-btn').addEventListener('click', function () {
    // Input and Result Elements Section
    const inputElement = document.getElementById('text-input');
    const resultElement = document.getElementById('result');

    if (!inputElement || !resultElement) {
        return;
    }

    const inputText = inputElement.value.trim();

    // Input Validation Section
    if (!inputText) {
        alert("Please input a value");
        return;
    }

    // Text Cleaning Section
    const cleanedText = inputText
        .toLowerCase() // Convert to lowercase for uniformity
        .replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric characters

    // Palindrome Check Section
    const isPalindrome = cleanedText === cleanedText.split('').reverse().join('');

    // Result Output Section
    if (isPalindrome) {
        resultElement.textContent = `${inputText} is a palindrome.`;
    } else {
        resultElement.textContent = `${inputText} is not a palindrome.`;
    }
}); 