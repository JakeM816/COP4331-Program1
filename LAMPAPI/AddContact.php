<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBigJ", "4JNamesAndADream", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserId, FirstName, LastName, Phone, Email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("sssss", $userId, $firstName, $lastName, $phone, $email);
		$stmt->execute();
		
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName,Phone,Email FROM Contacts WHERE ID=(SELECT MAX(ID) FROM Contacts)");
		$stmt->execute();
		$result = $stmt->get_result();
		
		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['ID'], $row['FirstName'], $row['LastName'], $row['Phone'], $row['Email'] );
		}
		else
		{
			
			returnWithError("No Records Found");
		}
		
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $id, $firstName, $lastName, $phone, $email )
	{
		$retValue = '{"id":"' . $id . '","firstName":"' . $firstName . '","lastName":"' . $lastName . '", "phone":"' . $phone . '", "email":"' . $email . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>