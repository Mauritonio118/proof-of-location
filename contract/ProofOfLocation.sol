// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ProofOfLocation {
    struct LocationEntry {
        string latitude;
        string longitude;
        string accuracy;
        string timestamp;
    }

    LocationEntry[] public entries;

    function logLocation(
        string memory _latitude,
        string memory _longitude,
        string memory _accuracy,
        string memory _timestamp
    ) public {
        entries.push(LocationEntry(_latitude, _longitude, _accuracy, _timestamp));
    }

    function getEntry(uint index) public view returns (
        string memory latitude,
        string memory longitude,
        string memory accuracy,
        string memory timestamp
    ) {
        require(index < entries.length, "Index out of bounds");
        LocationEntry memory entry = entries[index];
        return (entry.latitude, entry.longitude, entry.accuracy, entry.timestamp);
    }

    function getTotalEntries() public view returns (uint) {
        return entries.length;
    }
}
