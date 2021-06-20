pragma solidity >=0.4.23 <0.6.0;

// Smart contract example to test array for payable and non payable functions for SMART CONTRACT GUI
// Jutinas Kairys
// 20.June.2021

contract Array_Demo {
    string[] public myArray = [
        "a",
        "b",
        "c"
    ];
    
    function newEntry (string memory _addToarray) public  {
       myArray.push(_addToarray);
    }
    
    function arrayLength() public view returns (uint) {
        return myArray.length;
    }
      
}