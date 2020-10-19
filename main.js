// Get All ID
/*
title
author
isbn
book-list
book-form
*/







//Book Class : Represent All Books

class Book
{
    constructor(title,author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class : Handle UI Task
class UI 
{
    static displayBooks()
    {
        const books = Store.getBook();;
        books.forEach((book)=>UI.addBookToList(book))
    }

    static addBookToList(book)
    {
        const bookList = document.querySelector("#book-list");
        const row = document.createElement("tr");


        row.innerHTML = `
        
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>	
        <td><button href="#" class = "btn btn-danger btn-sm delete">X</button></td>
        
        
        `;

        bookList.appendChild(row);
    }

    // Delete Funtion

    static dleteBook(el)
    {
      if(el.classList.contains("delete"))
      {
         el.parentElement.parentElement.remove();   
      }
    }

    //show alert 
    
    static showAlert(message, className)
    {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const form = document.querySelector("#book-form");
        const container = document.querySelector(".container");
        container.insertBefore(div,form); 
        
        // vanish alert 
         setTimeout(()=>document.querySelector(".alert").remove(),2000)
    }
    
       
}


// Store Class : Hnadle Local Stoarage

class Store 
{
    static getBook() 
    {
        let books;
        if(localStorage.getItem('books')=== null )
        {
            books  = [];
        }

        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    };
     static addBook(book)
    {
       const books = Store.getBook();
       books.push(book);
       localStorage.setItem('books',JSON.stringify(books));
    };
    static removeBook(isbn)
    {
        const books = Store.getBook();

        books.forEach((book,index)=>{
            if(book.isbn === isbn)
            {
                books.splice(index,1);
            }
        })

    
        //Set Local Storage After Remove BOOKS

        localStorage.setItem('books',JSON.stringify(books))

    }
}


// Store Class : Hnadle Local Stoarage END 


document.addEventListener("DOMContentLoaded",UI.displayBooks)
// Event : Add A Book
document.querySelector("#book-form").addEventListener('submit',(e)=>{

    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    //instansiate book
    if(title === ""|| author === "" || isbn === "")
    {
       UI.showAlert("All Field Required","danger");
    }

    else
    {
        const book = new Book(title,author,isbn);
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert("Data Insert Successfully","info");
    }
    
    document.querySelector("#book-form").reset();
});
// Event : Remove a Book

document.querySelector("#book-list").addEventListener("click",(e)=>{
    //remove book from UI
    UI.dleteBook(e.target);
    //remove book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("Data Delete Successfully","success");
});


// Remove Book Funtionality ;
