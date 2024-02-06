const urlBase = 'http://4jnamesandadream.com/LAMPAPI';
const extension = 'php';
const ids = [];

let userId = 0;
let firstName = "";
let lastName = "";

let contFirstName = "";
let contLastName = "";
let contPhone = "";
let contEmail = "";
let contId = -1;

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
        localStorage.setItem('USERID',jsonObject.id); 

		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "home.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}


//TODO FOR REGISTER
//  Register Page/Button
//  Test Functionality
//  Look for Responses???

function doRegister(){
  userId = 0;
	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value;
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
  
  let tmp = {firstName:firstName,lastName:lastName,login:login,password:password}
  let jsonPayload = JSON.stringify( tmp );
  
  let url = urlBase + '/Register.' + extension;
  
  let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
        
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
        //Register response check??????????
		    
            
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "home.html";
			}
      
      if(this.readyState == 4 && this.status == 409)
      {
        //USER EXISTS 	
				document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
				return;
			
      }
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Hello, " + firstName + " " + lastName;

	}
}



function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}



function addContact()
{
	let newFirstName = document.getElementById("firstName").value;
	let newLastName = document.getElementById("lastName").value;
	let newEmail = document.getElementById("email").value;
	let newPhone = document.getElementById("phone").value;
  let addUserID = localStorage.getItem('USERID');
  
	document.getElementById("contactAddResult").innerHTML = "";
  
	let tmp = {firstName:newFirstName, lastName:newLastName, phone:newPhone, email:newEmail, userId:addUserID};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
    window.location.href = "home.html";
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function deleteContact()
{
	let oldContact = localStorage.getItem('ContactID');
  console.log("WORKING: " + oldContact);
	document.getElementById("contactUpdateDeleteResult").innerHTML = "";

	let tmp = {id:oldContact};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/DeleteContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateDeleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonPayload);
    window.location.href = "home.html";
	}
	catch(err)
	{
		document.getElementById("contactUpdateDeleteResult").innerHTML = err.message;
	}
	
}

function onloadSearch(){
  userId = localStorage.getItem("USERID");
  searchContacts();
}

function searchContacts()
{
  console.log("js");
	let srch = document.getElementById("searchText").value;
	document.getElementById("searchText").innerHTML = "";
	
	let colorList = "";
	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("searchText").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
        //BODY OF TABLE 
				const tableBody = document.getElementById('contactTableBody');
        //CLEAR TABLE FOR EACH SEARCH
	      tableBody.innerHTML = ' ';
             
				for( let i=0; i<jsonObject.results.length; i++ )
				{
          ids[i] = jsonObject.results[i].ID;
					contactList += jsonObject.results[i];
					if( i <= jsonObject.results.length - 1 )
					{
           //POPULATE TABLE
						populateTable(tableBody, jsonObject.results[i], i);
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
}
function openPopup(index) {
	//document.getElementById('popupOverlay').style.display = 'flex';
   console.log(index);
   saveContactInfo(index);
   window.location.href = "contact.html";
   populateContactInfo();
}
function closePopup() {
	document.getElementById('popupOverlay').style.display = 'none';
}
function handleYes() {
	alert('You clicked Yes!');
	closePopup();
}

function handleNo() {
	alert('You clicked No!');
	closePopup();
}

function addButtonToCell(cellId) {
     const buttonCell = document.getElementById(cellId);
     const button = document.createElement('button');
     button.textContent = 'Click me';
     button.classList.add('action-button');
     button.addEventListener('click', function () {
        buttonClickHandler(this);
     });
     buttonCell.appendChild(button);
}

function populateTable(tableBody, resultsArray, index)
{
  const row = tableBody.insertRow();
  const cellFirstName = row.insertCell(0);
  const cellLastName = row.insertCell(1);
  const cellEmail = row.insertCell(2);
  const cellPhone = row.insertCell(3);
  //const cellButton = row.insertCell(4);

  
  
  cellFirstName.textContent = resultsArray.FirstName
  cellLastName.textContent = resultsArray.LastName;
  cellEmail.textContent = resultsArray.Email;
  cellPhone.textContent = resultsArray.Phone;
  //cellButton.innerHTML = '<button onclick="openPopup()">hello</button>';
  row.classList.add('clickable-row');
  row.addEventListener('click', function(){
    openPopup(index);
  });

}
 
function saveContactInfo(index){
  const tableBody = document.getElementById('contactTableBody');
  curRow = tableBody.rows[index];
  contFirstName = curRow.cells[0].textContent;
  console.log(curRow.cells[0].textContent);
  localStorage.setItem('FirstName', curRow.cells[0].textContent); 
  
  contLastName = curRow.cells[1].textContent;
  console.log(curRow.cells[1].textContent);
  localStorage.setItem('LastName', curRow.cells[1].textContent); 
  
  contLastName = curRow.cells[2].textContent;
  console.log(curRow.cells[2].textContent);
  localStorage.setItem('Email', curRow.cells[2].textContent); 
  
  contLastName = curRow.cells[3].textContent;
  console.log(curRow.cells[3].textContent);
  localStorage.setItem('PhoneNum', curRow.cells[3].textContent); 
  
  localStorage.setItem('ContactID', ids[index]);
  contId = ids[index];
  console.log(ids[index]);
}

function populateContactInfo() { 
  //var urlParams = new URLSearchParams(window.location.search);
  //var data = urlParams.get('data');
  console.log(localStorage.getItem('FirstName'));
  var fName = document.getElementById('firstName');
  fName.value = localStorage.getItem('FirstName');
  
  var lName = document.getElementById('lastName');
  lName.value = localStorage.getItem('LastName');
  
  var email = document.getElementById('email');
  email.value = localStorage.getItem('Email');
  
  var phne = document.getElementById('phone');
  phne.value = localStorage.getItem('PhoneNum');
  console.log("HERE : " + localStorage.getItem('ContactID'));

}

function updateContact(index)
{
  let updateFirstName = document.getElementById("firstName").value;
	let updateLastName = document.getElementById("lastName").value;
	let updateEmail = document.getElementById("email").value;
	let updatePhone = document.getElementById("phone").value;
  let idNum = localStorage.getItem('ContactID');
	//document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {firstName:updateFirstName, lastName:updateLastName, phone:updatePhone, email:updateEmail, id:idNum};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/UpdateContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("contactAddResult").innerHTML = "Color has been added";
        console.log("Redirecting...");
			}
		};
	 xhr.send(jsonPayload);
   window.location.href = "home.html";
	}
	catch(err)
	{
		//document.getElementById("colorAddResult").innerHTML = err.message;
   console.log(err.message);
	}
	
}

function saveChanges(){
  updateContact();
}


