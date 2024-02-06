<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$id = $inData["id"];

	$conn = new mysqli("localhost", "TheBigJ", "4JNamesAndADream", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=?");
		$stmt->bind_param("sssss", $firstName, $lastName, $phone, $email, $id);
		$stmt->execute();
		
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName,Phone,Email FROM Contacts WHERE ID=?");
		$stmt->bind_param("s", $id);
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