/* eslint-disable max-classes-per-file */
class Library {
  static library = [];

  static add(book) {
    this.library.push(book);
  }

  static remove() {
    const bookShelf = document.querySelector("#book-shelf");
    bookShelf.addEventListener("click", event => {
      if (event.target.classList.contains("deleteButton")) {
        const arrayIndex = Number(event.target.parentElement.id);
        this.library.splice(arrayIndex, 1);
        event.target.parentElement.remove();
        Library.adjustBooksId(arrayIndex);
      }
    });
  }

  static adjustBooksId(deletedBookId) {
    const divs = document.querySelectorAll(".book");
    if (divs.length > 0) {
      divs.forEach(div => {
        if (div.id > deletedBookId) {
          const currentId = parseInt(div.id.match(/\d+/)[0]);
          div.id = div.id.replace(currentId, currentId - 1);
        }
      })
    }
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class BookFactory {
  static createBook(title, author, pages) {
    const readStatus = BookFactory.checkReadStatus();
    const aBook = new Book(title, author, pages, readStatus);
    Library.library.push(aBook);
    return aBook;
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
    this.form = document.querySelector("form");
  }

  manageForm() {
    this.submitButton = document.querySelector("button[type='submit']");
    this.bookTitle = document.getElementById("title");
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
    this.bookTitle.value = "";
    this.bookAuthor.value = "";
    this.bookPages.value = "";
    this.radioButtonNo.checked = false;
    this.radioButtonYes.checked = false;
  }

  openForm() {
    const showForm = document.getElementById("show-form-btn");
    showForm.addEventListener("click", () => {
      if (this.form.style.display === "none") this.form.style.display = "grid";
      else this.form.style.display = "none";
    });
  }

  addBook() {
    this.submitButton.addEventListener("click", e => {
      e.preventDefault();
      if (this.form.checkValidity()) {
        const someBook = BookFactory.createBook(
          this.bookTitle.value,
          this.bookAuthor.value,
          this.bookPages.value
        );
        this.clearForm();
        this.manageBookInfo(someBook);
      }
    });
  }

  closeForm() {
    const close = document.getElementById("closeForm");
    close.addEventListener("click", () => {
      this.clearForm();
    });
  }

  manageBookInfo() {
    this.libraryLength = Library.library.length;
    this.bookShelf = document.getElementById("book-shelf");
    this.bookInfo = document.createElement("div");
    this.bookInfo.classList.add("book");
    this.bookInfo.setAttribute("id", this.libraryLength - 1);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "X";
    this.bookInfotitle = document.createElement("p");
    this.bookInfoAuthor = document.createElement("p");
    this.bookInfoPages = document.createElement("p");
    this.bookInfoRead = document.createElement("p");
    this.toggleButton = this.createToggleButton();

    this.bookInfo.appendChild(deleteButton);
    this.bookInfo.appendChild(this.bookInfotitle);
    this.bookInfo.appendChild(this.bookInfoAuthor);
    this.bookInfo.appendChild(this.bookInfoPages);
    this.bookInfo.appendChild(this.toggleButton);

    this.createToggleButton();
    this.putBookOnDisplay();
    this.modifyToggleButton();
    this.activateToggleButton();
  }

  createToggleButton() {
    const div = document.createElement("div");
    div.classList.add("button-container");
    const paragraph = document.createElement("p");
    paragraph.textContent = "Have you read the book?";
    const label = document.createElement("label");
    const toggleButton = document.createElement("input");
    toggleButton.setAttribute("type", "checkbox");
    toggleButton.classList.add(`toggle${Library.library.length - 1}`, `toggleButton`);
    const span = document.createElement("span");

    label.classList.add("switch");
    label.appendChild(toggleButton);
    label.appendChild(span);

    div.appendChild(paragraph);
    div.appendChild(label);
    span.classList.add("slider", "round");
    return div;
  }

  putBookOnDisplay() {
    for (let i = this.libraryLength - 1; i < this.libraryLength; i += 1) {
      this.bookInfotitle.textContent = `${Library.library[i].title}`;
      this.bookInfoAuthor.textContent = `By: ${Library.library[i].author}`;
      this.bookInfoPages.textContent = `Pages: ${Library.library[i].pages}`;
    }
    this.bookShelf.appendChild(this.bookInfo);
  }

  modifyToggleButton() {
    this.bookShelf.addEventListener("click", event => {
      if (event.target.classList.contains("toggleButton")) {
        const bookIndex = Number(
          event.target.parentElement.parentElement.parentElement.id
        );
        if (event.target.checked === true) {
          Library.library[bookIndex].read = "yes";
          event.target.parentElement.parentElement.parentElement.classList.add(
            "alreadyRead"
          );
        } else {
          Library.library[bookIndex].read = "no";
          event.target.parentElement.parentElement.parentElement.classList.remove(
            "alreadyRead"
          );
        }
      }
    });
  }

  activateToggleButton() {
    if (Library.library[this.libraryLength - 1].read === "yes") {
      const checkbox = document.querySelector(
        `.toggle${this.libraryLength - 1}`
      );

      this.bookInfo.classList.add("alreadyRead");
      checkbox.checked = true;
    }
  }
}

const catalog = new BookCatalog();
catalog.manageForm();
Library.remove();
