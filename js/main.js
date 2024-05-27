document.getElementById('aboutButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('contactsButton').addEventListener('click', function() {
    window.location.href = 'contacts.html';
});


document.getElementById('copyButton').addEventListener('click', function() {
    var textToCopy = this.getAttribute('data-text');
    var tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Текст скопирован в буфер обмена!');
});