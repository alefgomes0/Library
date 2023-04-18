/* eslint-disable max-classes-per-file */
class Book {
  constructor(library, name, author, pages, read) {
    this.library = library;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class BookFactory {
  static createBook(library, name, author, pages) {
    const readStatus = BookFactory.checkReadStatus();
    return new Book(library, name, author, pages, readStatus);
  }
  
  static checkReadStatus() {
    const radioButtons = document.getElementsByName("read");
    for (let i = 0; i < radioButtons.length; i += 1) {
      if (radioButtons[i].checked) return radioButtons[i].value;
    }  
  }
}


class BookCatalog {
  constructor() {
    this.form = document.querySelector('form');
    this.library = [];
  }

  manageForm() {
    this.bookShelf = document.getElementById("book-shelf");
    this.submitButton = document.querySelector("button[type='submit']");
    this.bookName = document.getElementById("name");
    this.bookAuthor = document.getElementById("author");
    this.bookPages = document.getElementById("pages");
    this.radioButtonYes = document.getElementById("readYes");
    this.radioButtonNo = document.getElementById("readNo");

    this.openForm();
    this.addBook();
    this.closeForm();
    this.clearForm();
  }

  clearForm() {
    this.form.style.display = "none";
    this.bookName.value = '';
    this.bookAuthor.value = '';
    this.bookPages.value = '';
    this.radioButtonNo.checked = false;
    this.radioButtonYes.checked = false;
  }

  openForm() {
    const showForm = document.getElementById("show-form-btn");
    showForm.addEventListener('click', () => {
      if (this.form.style.display === "none") this.form.style.display = "grid";
      else this.form.style.display = "none";
    });
  }

  addBook() {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.form.checkValidity()) {
        const aBook = BookFactory.createBook(this.library, this.bookName.value, 
          this.bookAuthor.value, this.bookPages.value);
        this.library.push(aBook);
        this.clearForm();
      }
    })
  }
  

  closeForm() {
    const close = document.getElementById("closeForm");
    close.addEventListener("click", () => {
      this.clearForm();
  });
  }
} 


const catalog = new BookCatalog();
catalog.manageForm();
