const cards = document.querySelectorAll('.card');
const currentPage = location.pathname;
const menuitemsadm = document.querySelectorAll('header .container-header a');
const menuitemssite = document.querySelectorAll('.menu a');

for(let item of menuitemsadm){
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active');
    }
}

for(let item of menuitemssite){
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active');
    }
}

for (let card of cards) {
    card.addEventListener('click', function () {
        const recipeId = card.getAttribute('id');
        window.location.href = `/recipe?id=${recipeId}`;
    });
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

function addStep() {
    const steps = document.querySelector("#steps");
    const fieldContainer = document.querySelectorAll(".step");

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    steps.appendChild(newField);
}

if(document.querySelector(".add-ingredient")){
    document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient);
}

if(document.querySelector(".add-step")){
    document
    .querySelector(".add-step")
    .addEventListener("click", addStep);
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target;
        PhotosUpload.input = event.target;

        if(PhotosUpload.hasLimit(event)) return;

        Array.from(fileList).forEach(file => {

             PhotosUpload.files.push(file);

            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const div = PhotosUpload.getContainer(image);
                PhotosUpload.preview.appendChild(div);
            }

            reader.readAsDataURL(file);
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles();
    },
    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUpload;
        const { files: fileList } = input;
        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos!`);

            event.preventDefault();
            return true;
        }

        const photosDiv = [];
        preview.childNodes.forEach( item => {
            if(item.classList && item.classList.value == "photo"){
                photosDiv.push(item);
            }
        })

        const totalPhotos = fileList.length + photosDiv.length;

        if(totalPhotos > uploadLimit){
            alert("Você atingiu o limite máximo de upload de fotos");

            event.preventDefault();
            return true;
        }

        return false;
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    },
    getContainer(image) {
        const div = document.createElement('div');
        const button = PhotosUpload.getRemoveButton();

        div.classList.add('photo');

        div.onclick = PhotosUpload.removePhoto;

        div.appendChild(image);
        div.appendChild(button);

        return div;
    },
    getRemoveButton(){
        const button = document.createElement('i');

        button.classList.add('material-icons');
        button.innerHTML = 'close';

        return button;
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode;
        const photosArray = Array.from(PhotosUpload.preview.children);
        const index = photosArray.indexOf(photoDiv);

        PhotosUpload.files.splice(index, 1);

        PhotosUpload.input.files = PhotosUpload.getAllFiles();

        photoDiv.remove();
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode;

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"');

            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`;
            }
        }

        photoDiv.remove();
    }
}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e) {
        const { target } = e;
        ImageGallery.previews.forEach( preview => preview.classList.remove('active'));
        target.classList.add('active');

        ImageGallery.highlight.src = target.src;
        Lightbox.image.src = target.src;
    }
}
