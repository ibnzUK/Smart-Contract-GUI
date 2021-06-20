pragma solidity >=0.4.23 <0.6.0;

// Smart contract example to test different inputs and functions for SMART CONTRACT GUI
// Jutinas Kairys
// 20.June.2021

contract Many_Inputs {

    string public message;
    uint256 public myNumber = 1;
    address public owner;

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function changeData() public {
        myNumber = myNumber +3;
    }

    function testInputs(string memory _stringInput, uint256  _numberInput, address _addressInput) public  {
        myNumber = _numberInput;
        message = _stringInput;
        owner = _addressInput;
    }

    function manyInputs(string memory s1, string memory s2, string memory s3, string memory s4, string memory s5) public  {
        message = string(abi.encodePacked("s1: ", s1, ",", " s2: ", s2, ",", " s3: ", s3,  ",", " s4: ", s4,  ",", " s5: ", s5));
    }
}