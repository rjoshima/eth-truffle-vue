pragma solidity ^0.4.18;

import './Ownable.sol';

contract Base is Ownable {

    event NewAnimal(uint256 id, string name, uint8 age, address owner);

    string welcomeText;

    struct Animal {
        string name;
        uint8 age;
    }

    Animal[] animals;

    mapping(uint256 => address) public animalToOwner;
    mapping(address => uint256) public ownerAnimalCount;

    uint256 animalCount = 0;

    // This function ran when contract is deployed to blockchains. Setting a default welcometext
    function Base() public {
        welcomeText = "Welcome Blockchanger, this contract has just been deployed";
        createAnimal("Spot", uint8(1), msg.sender);
        createAnimal("Fiona", uint8(4), msg.sender);
        createAnimal("Motti", uint8(2), msg.sender);
        createAnimal("Lab", uint8(3), msg.sender);
    }

    // Returns the current welcome text
    function getWelcomeText() public view returns (string){
        return welcomeText;
    }

    // Owner of contract can set a new welcome text
    function setWelcomeText(string _text) external onlyOwner {
        welcomeText = _text;
    }

    function getAnimal(uint256 _pos) public constant returns (uint256 id, string name, uint8 age, address owner) {
        Animal storage _animal = animals[_pos];
        return (_pos, _animal.name, _animal.age, animalToOwner[_pos]);
    }

    function getAnimalByOwner(address _owner) public constant returns (uint[]){
        uint[] memory result = new uint[](ownerAnimalCount[_owner]);
        uint counter = 0;

        for (uint i = 0; i < animals.length; i++) {
            if (animalToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function createAnimal(string _name, uint8 _age, address _owner) public {
        uint id = animals.push(Animal(_name, _age)) - 1;
        animalToOwner[id] = _owner;
        ownerAnimalCount[_owner]++;
        animalCount++;
        NewAnimal(id, _name, _age, _owner);
    }
}
